/**
 * Services header submenu — desktop hover + mobile/tablet drawer.
 * Run: node scripts/services-submenu-check.mjs (dev server on 5173)
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const BASE = process.env.LAYOUT_BASE_URL || "http://localhost:5173";
const OUT = "layout-screenshots";

const viewports = [
  { name: "desktop", width: 1440, height: 900, mode: "desktop" },
  { name: "tablet", width: 768, height: 1024, mode: "mobile" },
  { name: "mobile", width: 390, height: 844, mode: "mobile" },
];

const errors = [];

async function testDesktop(page, name) {
  await page
    .locator('nav[aria-label="Main navigation"]')
    .getByRole("link", { name: /services/i })
    .hover();
  await page.waitForTimeout(400);

  const submenu = page.locator('[data-services-submenu="true"]');
  const visible = await submenu.evaluate((el) => {
    const style = getComputedStyle(el);
    return style.opacity !== "0" && style.pointerEvents !== "none";
  });

  if (!visible) {
    errors.push(`${name}: desktop submenu not visible on hover`);
    return;
  }

  if ((await submenu.locator("a").count()) < 1) {
    errors.push(`${name}: desktop submenu has no category links`);
  }

  await page.screenshot({
    path: `${OUT}/services-submenu-${name}.png`,
    fullPage: false,
  });
}

async function testMobileDrawer(page, name) {
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(350);
  await page.getByRole("button", { name: "SERVICES" }).click();
  await page.waitForTimeout(300);

  const submenuLinks = page.locator('a[href*="/services#"]');
  if ((await submenuLinks.count()) < 1) {
    errors.push(`${name}: mobile services submenu has no links after expand`);
    return;
  }

  await page.screenshot({
    path: `${OUT}/services-submenu-${name}.png`,
    fullPage: false,
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
    const res = await page.goto(`${BASE}/`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    if (!res?.ok()) {
      errors.push(`${vp.name}: HTTP ${res?.status()}`);
      continue;
    }

    await page.waitForTimeout(1200);

    if (vp.mode === "desktop") {
      await testDesktop(page, vp.name);
    } else {
      await testMobileDrawer(page, vp.name);
    }

    console.log(`✓ ${vp.name} (${vp.width}×${vp.height})`);
  } catch (e) {
    errors.push(`${vp.name}: ${e.message}`);
    console.error(`✗ ${vp.name}:`, e.message);
  }

  await context.close();
}

await browser.close();

if (errors.length) {
  console.error("\nServices submenu check failed:\n", errors.join("\n"));
  process.exit(1);
}

console.log(`\nAll viewports OK. Screenshots in ${OUT}/`);
