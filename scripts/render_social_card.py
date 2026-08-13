"""Render social-card.html to a 1200x630 JPEG for OG/Twitter previews.

The card is deliberately evergreen — no dollar figures, percentages or fiscal
years — so it does not go stale as the underlying data is revised.

Run: python scripts/render_social_card.py
Requires: pip install playwright && python -m playwright install chromium
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "social-card.html"
OUT = ROOT / "social-card.jpg"
W, H = 1200, 630


def main():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("playwright required:  pip install playwright && python -m playwright install chromium",
              file=sys.stderr)
        return 1
    if not SRC.exists():
        print(f"missing {SRC}", file=sys.stderr)
        return 1

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={"width": W, "height": H}, device_scale_factor=1)
        page.goto(SRC.as_uri())
        page.wait_for_load_state("networkidle")
        try:
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(600)
        except Exception:
            page.wait_for_timeout(1000)
        card = page.locator(".card")
        card.screenshot(path=str(OUT), type="jpeg", quality=92)
        browser.close()

    kb = OUT.stat().st_size / 1024
    print(f"wrote {OUT.relative_to(ROOT)}  ({W}x{H}, {kb:,.0f} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
