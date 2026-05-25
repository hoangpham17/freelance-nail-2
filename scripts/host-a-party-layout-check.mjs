/**
 * Host A Party — responsive layout smoke test.
 * Run: npm run host-party:check (dev server required, default port 5173)
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const BASE = process.env.LAYOUT_BASE_URL || "http://localhost:5173";
const OUT = "layout-screenshots";
const PATH = "/host-a-party";

const viewports = [
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const errors = [];

async function assertNoHorizontalOverflow(page, name) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1;
  });
  if (overflow) {
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    );
    errors.push(
      `${name}: horizontal overflow (scrollWidth ${scrollWidth} > clientWidth ${clientWidth})`,
    );
  }
}

async function assertShellCentered(page, name, vpWidth) {
  const box = await page.locator(".host-party-shell").first().boundingBox();
  if (!box) {
    errors.push(`${name}: missing .host-party-shell bounding box`);
    return;
  }
  if (box.width > vpWidth) {
    errors.push(
      `${name}: shell wider than viewport (${Math.round(box.width)} > ${vpWidth})`,
    );
  }
  const maxShell = Math.min(1152, vpWidth - 32);
  if (box.width > maxShell + 2) {
    errors.push(
      `${name}: shell exceeds max content width (${Math.round(box.width)} > ${maxShell})`,
    );
  }
}

async function checkViewport(browser, vp) {
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
      errors.push(`${vp.name}: HTTP ${res?.status()}`);
      return;
    }

    await page.waitForSelector(".host-party-hero", { timeout: 15000 });
    await page.waitForTimeout(800);

    const hero = await page.locator(".host-party-hero").count();
    const occasions = await page.locator(".host-party-occasions").count();
    const form = await page.locator("#party-inquiry").count();
    const shells = await page.locator(".host-party-shell").count();

    if (!hero) errors.push(`${vp.name}: missing .host-party-hero`);
    if (!occasions) errors.push(`${vp.name}: missing .host-party-occasions`);
    if (!form) errors.push(`${vp.name}: missing #party-inquiry`);
    if (shells < 2) {
      errors.push(`${vp.name}: expected 2+ .host-party-shell, got ${shells}`);
    }

    await assertShellCentered(page, vp.name, vp.width);
    await assertNoHorizontalOverflow(page, vp.name);

    const planBtn = page.getByRole("button", { name: /plan your party/i });
    if ((await planBtn.count()) === 0) {
      errors.push(`${vp.name}: missing Plan your party CTA`);
    }

    const occasionItems = await page.locator(
      ".host-party-occasions-menu__item",
    ).count();
    if (occasionItems !== 5) {
      errors.push(
        `${vp.name}: expected 5 occasion menu items, got ${occasionItems}`,
      );
    }

    const formPanel = await page.locator(".host-party-form__panel").count();
    if (!formPanel) errors.push(`${vp.name}: missing form panel`);

    await page.screenshot({
      path: `${OUT}/host-a-party-${vp.name}.png`,
      fullPage: true,
    });

    console.log(`✓ ${vp.name} (${vp.width}×${vp.height})`);
  } catch (e) {
    errors.push(`${vp.name}: ${e.message}`);
    console.error(`✗ ${vp.name}:`, e.message);
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
  console.error("\nHost A Party layout check failed:\n", errors.join("\n"));
  process.exit(1);
}

console.log(`\nAll viewports OK. Screenshots in ${OUT}/host-a-party-*.png`);
