/**
 * Home page — responsive layout checks (desktop / tablet / mobile).
 * npm run build && npm run preview -- --port 4179
 * PREVIEW_URL=http://localhost:4179 node scripts/home-layout-check.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.PREVIEW_URL ?? "http://localhost:4179";
const OUT_DIR = path.join(process.cwd(), "scripts/.home-layout-screenshots");

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

const failures = [];

function fail(label, message) {
  failures.push(`${label}: ${message}`);
}

async function assertNoHorizontalOverflow(page, label) {
  const { overflow, scrollWidth, clientWidth } = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      overflow: doc.scrollWidth > doc.clientWidth + 2,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
    };
  });
  if (overflow) {
    fail(label, `horizontal overflow (${scrollWidth} > ${clientWidth})`);
  }
}

async function auditHome(page, vp) {
  const label = vp.name;
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(800);

  await assertNoHorizontalOverflow(page, label);

  const hero = page.locator(".home-page").locator("section").first();
  if ((await hero.count()) === 0) {
    fail(label, "missing hero section");
  }

  const sections = await page.locator("[data-gallery-section]").count();
  if (sections === 0) {
    fail(label, "missing gallery section");
  }

  const bookBtn = page
    .locator('a.madison-btn-primary[href*="booking"]')
    .first();
  const phoneBtn = page.getByText("(608) 720 1011").first();
  if ((await bookBtn.count()) === 0) {
    fail(label, "missing Book Online fixed button");
  }
  if ((await phoneBtn.count()) === 0) {
    fail(label, "missing phone fixed button");
  }

  const heroCta = page.locator(".home-btn-primary").first();
  if ((await heroCta.count()) > 0) {
    const heroColor = await heroCta.evaluate((el) => getComputedStyle(el).color);
    if (!isBlackish(heroColor)) {
      fail(label, `hero CTA text not black (${heroColor})`);
    }
  }

  if ((await bookBtn.count()) > 0) {
    const bookColor = await bookBtn.evaluate((el) => getComputedStyle(el).color);
    if (!isBlackish(bookColor)) {
      fail(label, `Book Online text not black (${bookColor})`);
    }
  }

  const galleryAudit = await page.evaluate((viewportWidth) => {
    const section = document.querySelector("[data-gallery-section]");
    const swiper = section?.querySelector('[data-testid="gallery-home-swiper"]');
    if (!section || !swiper) {
      return { ok: false, reason: "gallery swiper missing" };
    }

    const isStrip = swiper.classList.contains("gallery-home-swiper--strip");
    const isMosaic = !isStrip;
    const slides = swiper.querySelectorAll(".swiper-slide");
    if (slides.length === 0) {
      return { ok: false, reason: "no swiper slides" };
    }

    const tilesInFirstSlide =
      slides[0].querySelectorAll('[role="button"]').length;
    const imgsInFirstSlide = slides[0].querySelectorAll("img").length;
    const gridCellsInFirstSlide = slides[0].querySelectorAll("button").length;

    const instance = swiper.swiper;
    const slidesPerView = instance?.params?.slidesPerView;

    const expectedStrip = viewportWidth < 1280;
    const expectedMosaic = viewportWidth >= 1280;

    if (expectedStrip && !isStrip) {
      return { ok: false, reason: "expected strip carousel below 1280px" };
    }
    if (expectedMosaic && !isMosaic) {
      return { ok: false, reason: "expected mosaic carousel at 1280px+" };
    }

    if (isStrip) {
      if (tilesInFirstSlide !== 1) {
        return {
          ok: false,
          reason: `strip slide should have 1 tile, found ${tilesInFirstSlide}`,
        };
      }
      const spv = typeof slidesPerView === "number" ? slidesPerView : null;
      if (viewportWidth < 768) {
        if (spv == null || Math.abs(spv - 1.5) > 0.01) {
          return { ok: false, reason: `mobile slidesPerView expected 1.5, got ${spv}` };
        }
      } else if (viewportWidth < 1280) {
        if (spv == null || Math.abs(spv - 3.5) > 0.01) {
          return { ok: false, reason: `tablet slidesPerView expected 3.5, got ${spv}` };
        }
      }
    } else if (imgsInFirstSlide < 1) {
      return { ok: false, reason: "mosaic slide has no images" };
    }

    return {
      ok: true,
      isStrip,
      slides: slides.length,
      tilesInFirstSlide,
      imgsInFirstSlide,
      gridCellsInFirstSlide,
      slidesPerView,
    };
  }, vp.width);

  const fixedAtBottom = await page.evaluate(() => {
    const book = [...document.querySelectorAll("a")].find((a) =>
      /book online/i.test(a.textContent ?? ""),
    );
    const box = book?.getBoundingClientRect();
    return Boolean(
      box && box.width > 10 && box.height > 10 && box.top < window.innerHeight,
    );
  });
  if (!fixedAtBottom) {
    fail(label, "Book Online fixed CTA not visible in viewport");
  }

  if (!galleryAudit.ok) {
    fail(label, galleryAudit.reason);
  }

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  await page.screenshot({
    path: path.join(OUT_DIR, `${label}.png`),
    fullPage: true,
  });

  return { galleryAudit, consoleErrors };
}

function isBlackish(rgb) {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return rgb === "black" || rgb === "#000000" || rgb === "rgb(0, 0, 0)";
  const [, r, g, b] = m.map(Number);
  return r <= 30 && g <= 30 && b <= 30;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const vp of VIEWPORTS) {
    console.log(`Checking ${vp.name} (${vp.width}x${vp.height})...`);
    try {
      const result = await auditHome(page, vp);
      if (result?.galleryAudit?.ok) {
        console.log(`  gallery OK`, result.galleryAudit);
      }
    } catch (err) {
      fail(vp.name, err.message);
    }
  }

  await browser.close();

  if (failures.length > 0) {
    console.error("\nHome layout check failed:\n", failures.join("\n"));
    process.exit(1);
  }

  console.log("\nHome layout check passed for all viewports.");
  console.log(`Screenshots: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
