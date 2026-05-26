/**
 * About Us — responsive layout + SectionHeadingLine spacing symmetry.
 * PREVIEW_URL=http://localhost:4177 npm run test:about-us-layout
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const BASE = process.env.PREVIEW_URL || process.env.LAYOUT_BASE_URL || "http://localhost:5173";
const OUT = "layout-screenshots";
const PATH = "/about-us";
const GAP_TOLERANCE_PX = 8;

const viewports = [
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const errors = [];

async function assertNoHorizontalOverflow(page, label) {
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
      `${label}: horizontal overflow (${scrollWidth} > ${clientWidth})`,
    );
  }
}

async function assertDividerSpacing(page, label) {
  const intro = page.locator('[data-au-section="intro"]');
  const divider = page.locator(".au-divider");
  const line = divider.locator("svg");
  const chapters = page.locator('[data-au-section="chapters"]');

  if ((await divider.count()) === 0) {
    errors.push(`${label}: missing .au-divider`);
    return;
  }

  const introBox = await intro.boundingBox();
  const lineBox = await line.boundingBox();
  const chaptersBox = await chapters.boundingBox();

  if (!introBox || !lineBox || !chaptersBox) {
    errors.push(`${label}: could not measure divider spacing boxes`);
    return;
  }

  const gapAbove = lineBox.y - (introBox.y + introBox.height);
  const gapBelow = chaptersBox.y - (lineBox.y + lineBox.height);
  const diff = Math.abs(gapAbove - gapBelow);

  if (gapAbove < 12 || gapBelow < 12) {
    errors.push(
      `${label}: divider gaps too tight (above=${Math.round(gapAbove)}px, below=${Math.round(gapBelow)}px)`,
    );
  }

  if (diff > GAP_TOLERANCE_PX) {
    errors.push(
      `${label}: uneven SectionHeadingLine spacing (above=${Math.round(gapAbove)}px, below=${Math.round(gapBelow)}px, diff=${Math.round(diff)}px)`,
    );
  }
}

async function checkViewport(browser, vp) {
  const label = `${PATH} ${vp.name}`;
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
    await page.waitForSelector(".au-divider svg", { timeout: 20000 });
    await page.waitForTimeout(600);

    await assertNoHorizontalOverflow(page, label);
    await assertDividerSpacing(page, label);

    await page.screenshot({
      path: `${OUT}/about-us-${vp.name}.png`,
      fullPage: true,
    });

    const gaps = await page.evaluate(() => {
      const intro = document.querySelector('[data-au-section="intro"]');
      const line = document.querySelector(".au-divider svg");
      const chapters = document.querySelector('[data-au-section="chapters"]');
      if (!intro || !line || !chapters) return null;
      const ir = intro.getBoundingClientRect();
      const lr = line.getBoundingClientRect();
      const cr = chapters.getBoundingClientRect();
      return {
        above: Math.round(lr.top - ir.bottom),
        below: Math.round(cr.top - lr.bottom),
      };
    });

    console.log(`✓ ${label} divider gaps ${gaps?.above ?? "?"}px / ${gaps?.below ?? "?"}px`);
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

console.log(`\nAll viewports OK. Screenshots in ${OUT}/`);
