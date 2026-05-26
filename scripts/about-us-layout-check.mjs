/**
 * About Us — responsive layout smoke test.
 * Run: npm run about-us:check (dev/preview server required)
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const BASE = process.env.LAYOUT_BASE_URL || "http://localhost:5173";
const OUT = "layout-screenshots";
const PATH = "/about-us";

const viewports = [
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const errors = [];

async function assertNoHorizontalOverflow(page, name) {
  const { overflow, scrollWidth, clientWidth } = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      overflow: doc.scrollWidth > doc.clientWidth + 1,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
    };
  });
  if (overflow) {
    errors.push(
      `${name}: horizontal overflow (scrollWidth ${scrollWidth} > clientWidth ${clientWidth})`,
    );
  }
}

async function assertBoxInViewport(page, locator, label, vpWidth) {
  const count = await locator.count();
  if (count === 0) {
    errors.push(`${label}: missing element`);
    return;
  }
  const box = await locator.first().boundingBox();
  if (!box) {
    errors.push(`${label}: no bounding box`);
    return;
  }
  if (box.x < -2) {
    errors.push(`${label}: clipped left (x=${Math.round(box.x)})`);
  }
  if (box.x + box.width > vpWidth + 2) {
    errors.push(
      `${label}: overflows right (x+w=${Math.round(box.x + box.width)}, vp=${vpWidth})`,
    );
  }
  if (box.width < 8 || box.height < 8) {
    errors.push(
      `${label}: collapsed (${Math.round(box.width)}×${Math.round(box.height)})`,
    );
  }
}

async function checkViewport(browser, vp) {
  const label = `${PATH}/${vp.name}`;
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
  });
  const page = await context.newPage();

  try {
    const res = await page.goto(`${BASE}${PATH}`, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    if (!res?.ok()) {
      errors.push(`${label}: HTTP ${res?.status()}`);
      return;
    }

    await page.waitForSelector('[data-au-section="hero"]', { timeout: 20000 });
    await page.waitForTimeout(800);

    for (const section of ["hero", "intro", "closing"]) {
      if ((await page.locator(`[data-au-section="${section}"]`).count()) === 0) {
        errors.push(`${label}: missing [data-au-section="${section}"]`);
      }
    }

    await assertNoHorizontalOverflow(page, label);

    await assertBoxInViewport(
      page,
      page.locator('[data-au-section="hero"] h1'),
      `${label}/hero h1`,
      vp.width,
    );
    await assertBoxInViewport(
      page,
      page.locator(".au-intro__accent"),
      `${label}/intro accent`,
      vp.width,
    );
    await assertBoxInViewport(
      page,
      page.locator('[data-au-section="closing"]'),
      `${label}/closing`,
      vp.width,
    );

    const chapters = page.locator('[data-au-section="chapters"] article');
    const chapterCount = await chapters.count();
    if (chapterCount === 0) {
      errors.push(`${label}: no timeline chapters`);
    }

    for (let i = 0; i < Math.min(chapterCount, 2); i++) {
      await assertBoxInViewport(
        page,
        chapters.nth(i),
        `${label}/chapter-${i + 1}`,
        vp.width,
      );
    }

    await page.screenshot({
      path: `${OUT}/about-us-${vp.name}.png`,
      fullPage: true,
    });

    console.log(`✓ ${label} chapters=${chapterCount}`);
  } catch (e) {
    errors.push(`${label}: ${e.message}`);
    console.error(`✗ ${label}:`, e.message);
  } finally {
    await context.close();
  }
}

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
for (const vp of viewports) {
  await checkViewport(browser, vp);
}
await browser.close();

if (errors.length) {
  console.error("\nAbout Us layout check failed:\n", errors.join("\n"));
  process.exit(1);
}

console.log(`\nAll viewports OK. Screenshots in ${OUT}/about-us-*.png`);
