/**
 * Verifies submit-success Lottie + HostAParty page loads without black screen.
 */
import { chromium } from "playwright";

const BASE = process.env.PREVIEW_URL ?? "http://localhost:5173";

const browser = await chromium.launch();
const failures = [];

async function checkViewport(name, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });

  const assetRes = await page.goto(`${BASE}/assets/images/submit-success.json`, {
    waitUntil: "domcontentloaded",
  });
  if (!assetRes?.ok()) {
    failures.push(`${name}: submit-success.json not reachable`);
  }

  const response = await page.goto(`${BASE}/host-a-party`, {
    waitUntil: "networkidle",
  });
  if (!response?.ok()) {
    failures.push(`${name}: /host-a-party returned ${response?.status()}`);
  }

  const heroVisible = await page.locator(".host-party-hero h1").isVisible();
  if (!heroVisible) {
    failures.push(`${name}: hero not visible (possible black screen / chunk error)`);
  }

  const hasOverlay = await page.locator(".submit-success-lottie").count();
  if (hasOverlay === 0) {
    failures.push(`${name}: expected entry Lottie overlay on page load`);
  }

  await page.close();
}

await checkViewport("mobile", 375, 812);
await checkViewport("desktop", 1280, 900);

await browser.close();

if (failures.length) {
  console.error("FAILED:\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log("submit-success-lottie check passed (mobile + desktop)");
