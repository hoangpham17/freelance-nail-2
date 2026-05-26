/**
 * Verifies PageDecoLines on /host-a-party content (Occasions + Form), all viewports.
 * Run: npm run build && npm run preview -- --port 4173
 *      PREVIEW_URL=http://localhost:4173 npm run test:host-party-deco
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PNG } from "pngjs";

const BASE_URL = process.env.PREVIEW_URL ?? "http://localhost:5173";
const URL = `${BASE_URL}/host-a-party`;
const OUT_DIR = path.join(process.cwd(), "scripts/.host-party-deco-screenshots");

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
];

/** Gold stroke pixels in viewport screenshot */
function countGoldPixels(png) {
  let gold = 0;
  const step = 2;
  for (let y = 0; y < png.height; y += step) {
    for (let x = 0; x < png.width; x += step) {
      const i = (png.width * y + x) << 2;
      const r = png.data[i];
      const g = png.data[i + 1];
      const b = png.data[i + 2];
      const a = png.data[i + 3];
      if (a < 40) continue;
      if (r > 160 && g > 110 && b < 130 && r > g && g > b) gold += 1;
    }
  }
  return gold;
}

const browser = await chromium.launch();
await mkdir(OUT_DIR, { recursive: true });
const failures = [];
const results = [];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(URL, { waitUntil: "networkidle" });

  const heroBox = await page.locator(".host-party-hero").boundingBox();
  await page.evaluate((y) => window.scrollTo(0, y), (heroBox?.height ?? 0) + 48);
  await page.waitForTimeout(350);

  const dom = await page.evaluate(() => {
    const content = document.querySelector(".host-party-content");
    const svg = content?.querySelector("svg");
    const paths = svg ? svg.querySelectorAll("path").length : 0;
    const firstPath = svg?.querySelector("path")?.getAttribute("d") ?? "";
    const isHostPartyLayout = firstPath.startsWith("M92 10");
    const occasions = document.querySelector(".host-party-occasions");
    const form = document.querySelector(".host-party-form");
    const isTransparent = (el) => {
      if (!el) return false;
      const bg = getComputedStyle(el).backgroundColor;
      return bg === "transparent" || bg === "rgba(0, 0, 0, 0)";
    };
    const svgBox = svg?.getBoundingClientRect();
    return {
      hasContent: Boolean(content),
      pathCount: paths,
      isHostPartyLayout,
      occasionsTransparent: isTransparent(occasions),
      formTransparent: isTransparent(form),
      heroHasDeco: Boolean(
        document.querySelector(".host-party-hero svg path[stroke]"),
      ),
      svgHeight: svgBox?.height ?? 0,
    };
  });

  const shotPath = path.join(OUT_DIR, `host-party-deco-${vp.name}.png`);
  const buffer = await page.screenshot({ path: shotPath, fullPage: false });
  const png = PNG.sync.read(buffer);
  const goldPixels = countGoldPixels(png);

  const minGold = vp.name === "mobile" ? 8 : 12;
  results.push({ viewport: vp.name, ...dom, goldPixels, minGold });

  if (!dom.hasContent || dom.pathCount < 5) {
    failures.push(`${vp.name}: missing deco SVG (paths=${dom.pathCount})`);
  }
  if (!dom.isHostPartyLayout) {
    failures.push(`${vp.name}: expected host-party deco layout, not contact-us paths`);
  }
  if (!dom.occasionsTransparent || !dom.formTransparent) {
    failures.push(`${vp.name}: opaque section backgrounds hide deco lines`);
  }
  if (dom.heroHasDeco) {
    failures.push(`${vp.name}: deco must not be in hero`);
  }
  if (dom.svgHeight < 200) {
    failures.push(`${vp.name}: deco SVG too short (${dom.svgHeight}px)`);
  }
  if (goldPixels < minGold) {
    failures.push(
      `${vp.name}: not enough visible gold deco pixels (${goldPixels} < ${minGold})`,
    );
  }

  await page.close();
}

await browser.close();

const report = {
  url: URL,
  passed: failures.length === 0,
  results,
  failures,
  screenshots: OUT_DIR,
};

await writeFile(path.join(OUT_DIR, "report.json"), JSON.stringify(report, null, 2));

if (failures.length) {
  console.error("Host party deco check FAILED:\n" + failures.map((f) => `  - ${f}`).join("\n"));
  console.error(`Report: ${path.join(OUT_DIR, "report.json")}`);
  process.exit(1);
}

console.log("Host party deco check passed:", VIEWPORTS.map((v) => v.name).join(", "));
for (const r of results) {
  console.log(`  ${r.viewport}: ${r.goldPixels} gold pixels, ${r.pathCount} paths`);
}
console.log(`Screenshots: ${OUT_DIR}`);
