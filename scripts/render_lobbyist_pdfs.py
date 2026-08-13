"""Render the lobbyist-registry PDFs to PNG so the figures can be verified by eye.

Why this exists: the Secretary of the Commonwealth's Lobbyist Public Search PDFs
embed subset fonts with no ToUnicode CMap, and each file uses its own glyph
ordering. Every text extractor (pdfplumber, pypdf, pdfminer) therefore returns a
different single-character substitution cipher rather than text — decoding them
programmatically is unreliable, so the figures in DATA_SUMMARY.md were transcribed
from these renders instead. The PNGs are committed so any reader can check the
numbers against the original filings.

Run: python scripts/render_lobbyist_pdfs.py [--src DIR] [--dpi N]
Requires: pip install pymupdf
"""

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', default=str(ROOT / 'data' / 'lobbyist_pdf'),
                    help='directory of source PDFs')
    ap.add_argument('--out', default=str(ROOT / 'data' / 'lobbyist_png'))
    ap.add_argument('--dpi', type=int, default=140)
    args = ap.parse_args()

    try:
        import pymupdf
    except ImportError:
        print('pymupdf is required:  pip install pymupdf', file=sys.stderr)
        return 1

    src, out = Path(args.src), Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    pdfs = sorted(src.glob('*.pdf'))
    if not pdfs:
        print(f'no PDFs in {src}', file=sys.stderr)
        return 1

    pages = 0
    for f in pdfs:
        doc = pymupdf.open(f)
        for i, page in enumerate(doc):
            page.get_pixmap(dpi=args.dpi).save(out / f'{f.stem}_p{i + 1}.png')
            pages += 1
        doc.close()
        print(f'{f.name:24} {len(doc)} pages')
    print(f'\nrendered {pages} pages at {args.dpi} dpi -> {out}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
