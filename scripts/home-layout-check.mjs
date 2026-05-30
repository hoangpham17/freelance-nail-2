/**
 * Home page — responsive layout checks (desktop / tablet / mobile).
 * npm run build && npm run preview -- --port 4179
 * PREVIEW_URL=http://localhost:4179 node scripts/home-layout-check.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.PREVIEW_URL ?? "http://localhost:4179";
const OUT_DIR = path.join(process.cwd(), "scripts/.home-layout-screenshots");

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

const failures = [];

function fail(label, message) {
  failures.push(`${label}: ${message}`);
}

async function assertNoHorizontalOverflow(page, label) {
  const { overflow, scrollWidth, clientWidth } = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      overflow: doc.scrollWidth > doc.clientWidth + 2,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
    };
  });
  if (overflow) {
    fail(label, `horizontal overflow (${scrollWidth} > ${clientWidth})`);
  }
}

async function auditHome(page, vp) {
  const label = vp.name;
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(800);

  await assertNoHorizontalOverflow(page, label);

  const hero = page.locator(".home-page").locator("section").first();
  if ((await hero.count()) === 0) {
    fail(label, "missing hero section");
  }

  const sections = await page.locator("[data-gallery-section]").count();
  if (sections === 0) {
    fail(label, "missing gallery section");
  }

  const bookBtn = page
    .locator('a.madison-btn-primary[href*="booking"]')
    .first();
  const phoneBtn = page.getByText("(608) 720 1011").first();
  if ((await bookBtn.count()) === 0) {
    fail(label, "missing Book Online fixed button");
  }
  if ((await phoneBtn.count()) === 0) {
    fail(label, "missing phone fixed button");
  }

  const heroCta = page.locator(".home-btn-primary").first();
  if ((await heroCta.count()) > 0) {
    const heroColor = await heroCta.evaluate((el) => getComputedStyle(el).color);
    if (!isBlackish(heroColor)) {
      fail(label, `hero CTA text not black (${heroColor})`);
    }
  }

  if ((await bookBtn.count()) > 0) {
    const bookColor = await bookBtn.evaluate((el) => getComputedStyle(el).color);
    if (!isBlackish(bookColor)) {
      fail(label, `Book Online text not black (${bookColor})`);
    }
  }

  const galleryAudit = await page.evaluate((viewportWidth) => {
    const section = document.querySelector("[data-gallery-section]");
    const swiper = section?.querySelector('[data-testid="gallery-home-swiper"]');
    if (!section || !swiper) {
      return { ok: false, reason: "gallery swiper missing" };
    }

    const isStrip = swiper.classList.contains("gallery-home-swiper--strip");
    const isMosaic = !isStrip;
    const slides = swiper.querySelectorAll(".swiper-slide");
    if (slides.length === 0) {
      return { ok: false, reason: "no swiper slides" };
    }

    const tilesInFirstSlide =
      slides[0].querySelectorAll('[role="button"]').length;
    const imgsInFirstSlide = slides[0].querySelectorAll("img").length;
    const gridCellsInFirstSlide = slides[0].querySelectorAll("button").length;

    const instance = swiper.swiper;
    const slidesPerView = instance?.params?.slidesPerView;

    const expectedStrip = viewportWidth < 1280;
    const expectedMosaic = viewportWidth >= 1280;

    if (expectedStrip && !isStrip) {
      return { ok: false, reason: "expected strip carousel below 1280px" };
    }
    if (expectedMosaic && !isMosaic) {
      return { ok: false, reason: "expected mosaic carousel at 1280px+" };
    }

    if (isStrip) {
      if (tilesInFirstSlide !== 1) {
        return {
          ok: false,
          reason: `strip slide should have 1 tile, found ${tilesInFirstSlide}`,
        };
      }
      const spv = typeof slidesPerView === "number" ? slidesPerView : null;
      if (viewportWidth < 768) {
        if (spv == null || Math.abs(spv - 1.5) > 0.01) {
          return { ok: false, reason: `mobile slidesPerView expected 1.5, got ${spv}` };
        }
      } else if (viewportWidth < 1280) {
        if (spv == null || Math.abs(spv - 3.5) > 0.01) {
          return { ok: false, reason: `tablet slidesPerView expected 3.5, got ${spv}` };
        }
      }
    } else if (imgsInFirstSlide < 1) {
      return { ok: false, reason: "mosaic slide has no images" };
    }

    return {
      ok: true,
      isStrip,
      slides: slides.length,
      tilesInFirstSlide,
      imgsInFirstSlide,
      gridCellsInFirstSlide,
      slidesPerView,
    };
  }, vp.width);

  const fixedAtBottom = await page.evaluate(() => {
    const book = [...document.querySelectorAll("a")].find((a) =>
      /book online/i.test(a.textContent ?? ""),
    );
    const box = book?.getBoundingClientRect();
    return Boolean(
      box && box.width > 10 && box.height > 10 && box.top < window.innerHeight,
    );
  });
  if (!fixedAtBottom) {
    fail(label, "Book Online fixed CTA not visible in viewport");
  }

  if (!galleryAudit.ok) {
    fail(label, galleryAudit.reason);
  }

  const serviceAudit = await auditServiceGrid(page, vp.width);
  if (!serviceAudit.ok) {
    fail(label, serviceAudit.reason);
  }

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  await page.screenshot({
    path: path.join(OUT_DIR, `${label}.png`),
    fullPage: true,
  });

  return { galleryAudit, serviceAudit, consoleErrors };
}

async function auditServiceGrid(page, viewportWidth) {
  const list = page.locator("[data-home-service-list]");
  if ((await list.count()) === 0) {
    return { ok: false, reason: "missing [data-home-service-list]" };
  }

  await list.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  return page.evaluate((vw) => {
    const listEl = document.querySelector("[data-home-service-list]");
    const itemEls = [...document.querySelectorAll(".home-service-item")];
    if (!listEl || itemEls.length === 0) {
      return { ok: false, reason: "no service items rendered" };
    }

    const expectedCols = vw >= 1024 ? 5 : vw >= 768 ? 3 : 2;

    const rects = itemEls.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        top: Math.round(r.top),
        left: r.left,
        width: r.width,
        height: r.height,
      };
    });
    rects.sort((a, b) => a.top - b.top || a.left - b.left);

    const rows = [];
    for (const item of rects) {
      const row = rows.find((r) => Math.abs(r[0].top - item.top) <= 8);
      if (row) row.push(item);
      else rows.push([item]);
    }
    rows.forEach((r) => r.sort((a, b) => a.left - b.left));

    const expectedFirstRow = Math.min(itemEls.length, expectedCols);
    const firstRowCols = rows[0]?.length ?? 0;
    if (firstRowCols !== expectedFirstRow) {
      return {
        ok: false,
        reason: `service grid first row has ${firstRowCols} cols, expected ${expectedFirstRow} at ${vw}px`,
      };
    }

    const clippedLabels = itemEls.filter((item) => {
      const label = item.querySelector(".home-service-item__label");
      return label && label.scrollHeight > label.clientHeight + 2;
    }).length;
    if (clippedLabels > 0) {
      return {
        ok: false,
        reason: `${clippedLabels} service label(s) clipped (scrollHeight > clientHeight)`,
      };
    }

    const notSquare = itemEls.filter((item) => {
      const wrap = item.querySelector(".home-service-item__icon-wrap");
      if (!wrap) return true;
      const r = wrap.getBoundingClientRect();
      return Math.abs(r.width - r.height) > 4;
    }).length;
    if (notSquare > 0) {
      return { ok: false, reason: `${notSquare} service tile(s) not square` };
    }

    const lastRow = rows[rows.length - 1];
    if (lastRow && lastRow.length < expectedCols && rows.length > 1) {
      const listRect = listEl.getBoundingClientRect();
      const rowLeft = lastRow[0].left;
      const rowRight = lastRow[lastRow.length - 1].left + lastRow[lastRow.length - 1].width;
      const rowCenter = (rowLeft + rowRight) / 2;
      const listCenter = listRect.left + listRect.width / 2;
      if (Math.abs(rowCenter - listCenter) > 28) {
        return {
          ok: false,
          reason: `service last row not centered (offset ${Math.round(Math.abs(rowCenter - listCenter))}px)`,
        };
      }
    }

    const listStyle = getComputedStyle(listEl);
    const gap = parseFloat(listStyle.gap || listStyle.rowGap || "0");
    const itemWidth = rects[0]?.width ?? 0;
    const expectedWidth =
      (listEl.clientWidth - (expectedCols - 1) * gap) / expectedCols;
    const itemMaxWidth = parseFloat(getComputedStyle(itemEls[0]).maxWidth);
    const cappedTile =
      vw < 1024 && Number.isFinite(itemMaxWidth) && itemMaxWidth > 0;

    if (cappedTile) {
      if (itemWidth > expectedWidth + 6) {
        return {
          ok: false,
          reason: `service tile too wide (${Math.round(itemWidth)}px > ${Math.round(expectedWidth)}px)`,
        };
      }
      if (itemWidth > itemMaxWidth + 4) {
        return {
          ok: false,
          reason: `service tile exceeds max-width (${Math.round(itemWidth)}px > ${Math.round(itemMaxWidth)}px)`,
        };
      }
    } else if (Math.abs(itemWidth - expectedWidth) > 6) {
      return {
        ok: false,
        reason: `service item width ${Math.round(itemWidth)}px != expected ${Math.round(expectedWidth)}px`,
      };
    }

    return {
      ok: true,
      items: itemEls.length,
      expectedCols,
      firstRowCols,
      rows: rows.length,
    };
  }, viewportWidth);
}

function isBlackish(rgb) {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return rgb === "black" || rgb === "#000000" || rgb === "rgb(0, 0, 0)";
  const [, r, g, b] = m.map(Number);
  return r <= 30 && g <= 30 && b <= 30;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const vp of VIEWPORTS) {
    console.log(`Checking ${vp.name} (${vp.width}x${vp.height})...`);
    try {
      const result = await auditHome(page, vp);
      if (result?.galleryAudit?.ok) {
        console.log(`  gallery OK`, result.galleryAudit);
      }
      if (result?.serviceAudit?.ok) {
        console.log(`  services OK`, result.serviceAudit);
      }
    } catch (err) {
      fail(vp.name, err.message);
    }
  }

  await browser.close();

  if (failures.length > 0) {
    console.error("\nHome layout check failed:\n", failures.join("\n"));
    process.exit(1);
  }

  console.log("\nHome layout check passed for all viewports.");
  console.log(`Screenshots: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
