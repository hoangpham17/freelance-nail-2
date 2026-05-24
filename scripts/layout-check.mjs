/**
 * Responsive layout smoke test — captures home page at 3 viewports.
 * Run: npm run layout:check (requires dev server on PORT, default 5173)
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const BASE = process.env.LAYOUT_BASE_URL || "http://localhost:5174";
const OUT = "layout-screenshots";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const errors = [];

async function checkPage(page, name) {
  const res = await page.goto(`${BASE}/`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  if (!res?.ok()) {
    errors.push(`${name}: HTTP ${res?.status()}`);
    return;
  }

  await page.waitForTimeout(1500);

  const hasHero = await page.locator(".hero-section").count();
  const hasHeader = await page.locator("header").count();
  const hasFooter = await page.locator("footer").count();

  if (!hasHero) errors.push(`${name}: missing .hero-section`);
  if (!hasHeader) errors.push(`${name}: missing header`);
  if (!hasFooter) errors.push(`${name}: missing footer`);

  const bodyBg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  );
  if (bodyBg !== "rgb(0, 0, 0)") {
    errors.push(`${name}: body background expected black, got ${bodyBg}`);
  }

  await page.screenshot({
    path: `${OUT}/home-${name}.png`,
    fullPage: true,
  });
}

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
  });
  const page = await context.newPage();
  try {
    await checkPage(page, vp.name);
    console.log(`✓ ${vp.name} (${vp.width}×${vp.height})`);
  } catch (e) {
    errors.push(`${vp.name}: ${e.message}`);
    console.error(`✗ ${vp.name}:`, e.message);
  }
  await context.close();
}

await browser.close();

if (errors.length) {
  console.error("\nLayout check failed:\n", errors.join("\n"));
  process.exit(1);
}

console.log(`\nAll viewports OK. Screenshots in ${OUT}/`);
