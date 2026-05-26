/**
 * UI checks for PageDecoLines on /contact-us and /host-a-party.
 * Verifies: slice scaling (no stretch), visibility, variant paths.
 *
 * npm run build && npm run preview -- --port 4173
 * PREVIEW_URL=http://localhost:4173 npm run test:page-deco
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PNG } from "pngjs";

const BASE_URL = process.env.PREVIEW_URL ?? "http://localhost:5173";
const OUT_DIR = path.join(process.cwd(), "scripts/.page-deco-screenshots");

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
];

const PAGES = [
  {
    id: "contact",
    path: "/contact-us",
    decoSelector: "main > .page-deco-lines svg",
    firstPathPrefix: "M2 18",
    scrollPastHero: false,
  },
  {
    id: "host-party",
    path: "/host-a-party",
    decoSelector: ".host-party-content .page-deco-lines svg",
    firstPathPrefix: "M92 10",
    scrollPastHero: true,
  },
];

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

async function auditPage(page, pageConfig, vp) {
  await page.goto(`${BASE_URL}${pageConfig.path}`, { waitUntil: "networkidle" });

  if (pageConfig.scrollPastHero) {
    const heroBox = await page.locator(".host-party-hero").boundingBox();
    await page.evaluate((y) => window.scrollTo(0, y), (heroBox?.height ?? 0) + 48);
    await page.waitForTimeout(300);
  }

  const dom = await page.evaluate(
    ({ decoSelector, firstPathPrefix }) => {
      const wrap = document.querySelector(
        decoSelector.replace(" svg", ""),
      );
      const svg = document.querySelector(decoSelector);
      const path0 = svg?.querySelector("path");
      const wrapStyle = wrap ? getComputedStyle(wrap) : null;
      const svgPreserve = svg?.getAttribute("preserveAspectRatio") ?? "";
      const viewBox = svg?.getAttribute("viewBox") ?? "";

      return {
        hasWrap: Boolean(wrap),
        hasSvg: Boolean(svg),
        pathCount: svg?.querySelectorAll("path").length ?? 0,
        correctPaths: path0?.getAttribute("d")?.startsWith(firstPathPrefix) ?? false,
        overflow: wrapStyle?.overflow ?? "",
        preserve: svgPreserve,
        viewBox,
      };
    },
    {
      decoSelector: pageConfig.decoSelector,
      firstPathPrefix: pageConfig.firstPathPrefix,
    },
  );

  const angles = await page.evaluate((decoSelector) => {
    const path = document.querySelector(`${decoSelector} path`);
    if (!path) return null;

    const segmentAngle = (pathEl, t0, t1) => {
      const len = pathEl.getTotalLength();
      const p0 = pathEl.getPointAtLength(len * t0);
      const p1 = pathEl.getPointAtLength(len * t1);
      const ctm = pathEl.getScreenCTM();
      if (!ctm) return null;
      const s0 = new DOMPoint(p0.x, p0.y).matrixTransform(ctm);
      const s1 = new DOMPoint(p1.x, p1.y).matrixTransform(ctm);
      return Math.atan2(s1.y - s0.y, s1.x - s0.x);
    };

    return {
      a1: segmentAngle(path, 0.1, 0.25),
      a2: segmentAngle(path, 0.35, 0.5),
    };
  }, pageConfig.decoSelector);

  const shotPath = path.join(
    OUT_DIR,
    `${pageConfig.id}-${vp.name}.png`,
  );
  const buffer = await page.screenshot({ path: shotPath, fullPage: false });
  const goldPixels = countGoldPixels(PNG.sync.read(buffer));

  return { dom, angles, goldPixels, shotPath };
}

async function runSuite(runLabel) {
  const browser = await chromium.launch();
  await mkdir(OUT_DIR, { recursive: true });
  const failures = [];
  const results = [];
  const angleByPage = {};

  for (const pageConfig of PAGES) {
    angleByPage[pageConfig.id] = {};
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });
      const { dom, angles, goldPixels } = await auditPage(page, pageConfig, vp);

      if (angles) angleByPage[pageConfig.id][vp.name] = angles;

      const row = {
        run: runLabel,
        page: pageConfig.id,
        viewport: vp.name,
        ...dom,
        goldPixels,
        angles,
      };
      results.push(row);

      const label = `${pageConfig.id}/${vp.name}`;

      if (!dom.hasSvg || dom.pathCount < 5) {
        failures.push(`${label}: missing deco SVG`);
      }
      if (!dom.correctPaths) {
        failures.push(`${label}: unexpected path layout`);
      }
      if (dom.overflow !== "hidden") {
        failures.push(`${label}: wrapper overflow should be hidden (got ${dom.overflow})`);
      }
      if (!dom.preserve.includes("slice") || dom.preserve === "none") {
        failures.push(`${label}: preserveAspectRatio must use slice (got ${dom.preserve})`);
      }
      if (dom.viewBox !== "0 0 110 100") {
        failures.push(`${label}: viewBox should be 0 0 110 100 (got ${dom.viewBox})`);
      }
      const minGold = vp.name === "mobile" ? 6 : 10;
      if (goldPixels < minGold) {
        failures.push(`${label}: low visible gold pixels (${goldPixels} < ${minGold})`);
      }

      await page.close();
    }

    const desktop = angleByPage[pageConfig.id].desktop;
    const mobile = angleByPage[pageConfig.id].mobile;
    if (desktop?.a1 != null && mobile?.a1 != null) {
      const delta = Math.abs(desktop.a1 - mobile.a1);
      const normalized = Math.min(delta, Math.PI * 2 - delta);
      if (normalized > 0.12) {
        failures.push(
          `${pageConfig.id}: curve angle differs mobile vs desktop (${normalized.toFixed(3)} rad) — possible stretch`,
        );
      }
    }
  }

  await browser.close();
  return { failures, results };
}

const allFailures = [];
const allResults = [];

for (const run of [1, 2]) {
  console.log(`\n=== Page deco check — run ${run}/2 ===`);
  const { failures, results } = await runSuite(run);
  allResults.push(...results);
  if (failures.length) {
    console.error("FAILED:\n" + failures.map((f) => `  - ${f}`).join("\n"));
    allFailures.push(...failures.map((f) => `[run ${run}] ${f}`));
  } else {
    console.log("Run passed.");
    for (const pageConfig of PAGES) {
      const rows = results.filter((r) => r.page === pageConfig.id);
      console.log(
        `  ${pageConfig.id}: ${rows.map((r) => `${r.viewport}=${r.goldPixels}px`).join(", ")}`,
      );
    }
  }
}

const report = {
  url: BASE_URL,
  passed: allFailures.length === 0,
  failures: allFailures,
  results: allResults,
  screenshots: OUT_DIR,
};

await writeFile(path.join(OUT_DIR, "report.json"), JSON.stringify(report, null, 2));

if (allFailures.length) {
  console.error(`\nReport: ${path.join(OUT_DIR, "report.json")}`);
  process.exit(1);
}

console.log(`\nAll runs passed (2/2). Screenshots: ${OUT_DIR}`);
