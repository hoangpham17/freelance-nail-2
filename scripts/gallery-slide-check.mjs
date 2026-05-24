/**
 * Verifies home gallery carousel changes visible images when navigating slides.
 * Run: npm run dev (other terminal) then npm run gallery:check
 */
import { chromium } from "playwright";

const BASE = process.env.LAYOUT_BASE_URL || "http://localhost:5173";

async function getActiveSlideImageSrc(page) {
  return page.evaluate(() => {
    const active = document.querySelector(
      ".gallery-home-swiper .swiper-slide-active",
    );
    if (!active) return null;
    const img = active.querySelector("img");
    return img?.getAttribute("src") ?? null;
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];

  try {
    const res = await page.goto(`${BASE}/`, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    if (!res?.ok()) {
      errors.push(`HTTP ${res?.status()}`);
      throw new Error(errors.join("; "));
    }

    await page.waitForSelector("[data-gallery-section]", { timeout: 15000 });
    await page.locator("[data-gallery-section]").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    const dotCount = await page.locator("[data-gallery-dot]").count();
    if (dotCount < 2) {
      console.log(
        `SKIP: only ${dotCount} gallery slide(s) in CMS data — need 7+ images to test slide change.`,
      );
      await browser.close();
      process.exit(0);
    }

    const firstSrc = await getActiveSlideImageSrc(page);
    if (!firstSrc) {
      errors.push("No image found in active gallery slide");
    }

    await page.locator('[aria-label="Gallery next"]').click();
    await page.waitForTimeout(600);

    const secondSrc = await getActiveSlideImageSrc(page);
    if (!secondSrc) {
      errors.push("No image after slide next");
    } else if (secondSrc === firstSrc) {
      errors.push(
        `Slide did not change images (same src: ${firstSrc.slice(0, 80)}...)`,
      );
    }

    await page.locator('[data-gallery-dot="0"]').click();
    await page.waitForTimeout(600);
    const backSrc = await getActiveSlideImageSrc(page);
    if (backSrc !== firstSrc) {
      errors.push("Dot navigation did not return to first slide images");
    }

    if (errors.length) {
      console.error("FAIL:", errors.join("\n"));
      await page.screenshot({ path: "gallery-slide-check-fail.png" });
      process.exit(1);
    }

    console.log("PASS: gallery slide changes images on next and dot navigation.");
  } catch (e) {
    console.error("FAIL:", e.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
