/**
 * About Us — responsive layout smoke test.
 * Run: npm run about-us:check (dev server required, default port 5173)
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

async function assertBoxInViewport(page, locator, name, label, vpWidth) {
  const count = await locator.count();
  if (count === 0) {
    errors.push(`${name}: missing ${label}`);
    return;
  }
  const box = await locator.first().boundingBox();
  if (!box) {
    errors.push(`${name}: no bounding box for ${label}`);
    return;
  }
  if (box.x < -2) {
    errors.push(`${name}: ${label} clipped left (x=${Math.round(box.x)})`);
  }
  if (box.x + box.width > vpWidth + 2) {
    errors.push(
      `${name}: ${label} overflows right (x+w=${Math.round(box.x + box.width)}, vp=${vpWidth})`,
    );
  }
  if (box.width < 8 || box.height < 8) {
    errors.push(
      `${name}: ${label} collapsed (${Math.round(box.width)}×${Math.round(box.height)})`,
    );
  }
}

async function assertNoOverlap(page, selA, selB, name, label) {
  const a = await page.locator(selA).first().boundingBox();
  const b = await page.locator(selB).first().boundingBox();
  if (!a || !b) return;
  const overlap =
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
  if (overlap) {
    errors.push(`${name}: ${label} overlaps`);
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

    await page.waitForSelector(".au-hero", { timeout: 15000 });
    await page.waitForTimeout(1000);

    for (const sel of [".au-hero", ".au-manifesto", ".au-closing"]) {
      if ((await page.locator(sel).count()) === 0) {
        errors.push(`${vp.name}: missing ${sel}`);
      }
    }

    await assertNoHorizontalOverflow(page, vp.name);

    await assertBoxInViewport(
      page,
      page.locator(".au-hero h1"),
      vp.name,
      "hero title",
      vp.width,
    );
    await assertBoxInViewport(
      page,
      page.locator(".au-hero__lead"),
      vp.name,
      "hero lead",
      vp.width,
    );
    const manifestoAccent = page.locator(".au-manifesto__accent");
    const manifestoText = page.locator(".au-manifesto__text");
    await assertBoxInViewport(
      page,
      manifestoAccent,
      vp.name,
      "manifesto accent",
      vp.width,
    );
    await assertBoxInViewport(
      page,
      manifestoText,
      vp.name,
      "manifesto text",
      vp.width,
    );

    if ((await manifestoAccent.count()) > 0 && (await manifestoText.count()) > 0) {
      const accentBox = await manifestoAccent.first().boundingBox();
      const textBox = await manifestoText.first().boundingBox();
      if (accentBox && textBox && accentBox.y > textBox.y) {
        errors.push(`${vp.name}: manifesto accent below body (layout order broken)`);
      }
    }

    const fixedBtns = page.locator(".fixed.bottom-4");
    if ((await fixedBtns.count()) > 0 && (await manifestoText.count()) > 0) {
      const btnBox = await fixedBtns.first().boundingBox();
      const textBox = await manifestoText.first().boundingBox();
      if (btnBox && textBox) {
        const obscured =
          btnBox.y < textBox.y + textBox.height &&
          btnBox.y + btnBox.height > textBox.y &&
          btnBox.x < textBox.x + textBox.width &&
          btnBox.x + btnBox.width > textBox.x;
        if (obscured && vp.width < 1024) {
          await page.evaluate(() => {
            document.querySelector(".au-manifesto")?.scrollIntoView({
              block: "center",
            });
          });
          await page.waitForTimeout(400);
          const accentVisible = await manifestoAccent.first().isVisible();
          const textStart = await manifestoText.first().evaluate((el) => {
            const range = document.createRange();
            range.selectNodeContents(el);
            const rect = range.getBoundingClientRect();
            return rect.top;
          });
          const btnTop = await fixedBtns.first().evaluate(
            (el) => el.getBoundingClientRect().top,
          );
          if (textStart < btnTop + 80 && textStart > 0 && !accentVisible) {
            errors.push(
              `${vp.name}: manifesto text obscured by fixed booking buttons`,
            );
          }
        }
      }
    }

    const chapters = page.locator(".au-chapter");
    const chapterCount = await chapters.count();
    if (chapterCount === 0) {
      errors.push(`${vp.name}: no .au-chapter sections`);
    }

    for (let i = 0; i < Math.min(chapterCount, 3); i++) {
      const ch = chapters.nth(i);
      await assertBoxInViewport(
        page,
        ch.locator(".au-chapter__media"),
        vp.name,
        `chapter ${i + 1} media`,
        vp.width,
      );
      await assertBoxInViewport(
        page,
        ch.locator(".au-chapter__copy"),
        vp.name,
        `chapter ${i + 1} copy`,
        vp.width,
      );
      const mediaBox = await ch.locator(".au-chapter__media").boundingBox();
      if (mediaBox && mediaBox.height < 100) {
        errors.push(
          `${vp.name}: chapter ${i + 1} media too short (${Math.round(mediaBox.height)}px)`,
        );
      }
    }

    if (vp.width >= 768) {
      await assertNoOverlap(
        page,
        ".au-hero",
        ".au-manifesto",
        vp.name,
        "hero vs manifesto",
      );
    }

    await page.screenshot({
      path: `${OUT}/about-us-${vp.name}.png`,
      fullPage: true,
    });

    console.log(`✓ ${vp.name} (${vp.width}×${vp.height}) chapters=${chapterCount}`);
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
  console.error("\nAbout Us layout check failed:\n", errors.join("\n"));
  process.exit(1);
}

console.log(`\nAll viewports OK. Screenshots in ${OUT}/about-us-*.png`);
