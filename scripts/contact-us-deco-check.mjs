/**
 * Contact Us decorative lines visibility check.
 * Run: node scripts/contact-us-deco-check.mjs (dev server on :5173)
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const BASE = process.env.LAYOUT_BASE_URL || "http://localhost:5173";
const OUT = "layout-screenshots";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const errors = [];

async function measureDeco(page) {
  return page.evaluate(() => {
    const main = document.querySelector("main");
    const layer = main?.querySelector('[aria-hidden="true"]');
    const svg = layer?.querySelector("svg");
    if (!svg) return { paths: [], svgMissing: true };

    const mainRect = main.getBoundingClientRect();
    const paths = [...svg.querySelectorAll("path")].map((path, i) => {
      const rect = path.getBoundingClientRect();
      const inViewport =
        rect.right > mainRect.left &&
        rect.left < mainRect.right &&
        rect.bottom > mainRect.top &&
        rect.top < mainRect.bottom;
      const style = getComputedStyle(path);
      return {
        index: i,
        inViewport,
        hasSize: rect.width > 2 && rect.height > 2,
        stroke: style.stroke,
        strokeOpacity: style.strokeOpacity,
      };
    });

    return { paths, svgMissing: false };
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
    const res = await page.goto(`${BASE}/contact-us`, {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    if (!res?.ok()) {
      errors.push(`${vp.name}: HTTP ${res?.status()}`);
      continue;
    }

    await page.waitForTimeout(1200);

    const deco = await measureDeco(page);

    if (deco.svgMissing) {
      errors.push(`${vp.name}: missing deco SVG layer`);
      continue;
    }

    if (deco.paths.length < 5) {
      errors.push(
        `${vp.name}: expected 5 deco paths, found ${deco.paths.length}`,
      );
    }

    deco.paths.forEach((d) => {
      if (!d.hasSize) {
        errors.push(`${vp.name}: path#${d.index} has zero size`);
      }
      if (!d.inViewport) {
        errors.push(`${vp.name}: path#${d.index} outside viewport`);
      }
    });

    const visibleCount = deco.paths.filter(
      (d) => d.inViewport && d.hasSize,
    ).length;

    console.log(
      `✓ ${vp.name}: ${visibleCount}/${deco.paths.length} deco paths in viewport`,
    );
    deco.paths.forEach((d) => {
      console.log(
        `  - path#${d.index}: inViewport=${d.inViewport} stroke=${d.stroke?.slice(0, 30)}`,
      );
    });

    await page.screenshot({
      path: `${OUT}/contact-us-${vp.name}.png`,
      fullPage: true,
    });
  } catch (e) {
    errors.push(`${vp.name}: ${e.message}`);
    console.error(`✗ ${vp.name}:`, e.message);
  }

  await context.close();
}

await browser.close();

if (errors.length) {
  console.error("\nDeco check issues:\n", errors.join("\n"));
  process.exit(1);
}

console.log(`\nDeco check OK. Screenshots in ${OUT}/`);
