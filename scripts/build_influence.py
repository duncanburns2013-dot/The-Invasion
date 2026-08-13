"""Consolidate lobbying + campaign-finance sources into data/influence.json.

Sources
-------
1. ocpf-output.txt          - 519 OCPF contribution records, ACLU-employer query.
2. ocpf-output*.xlsx        - three narrower OCPF exports (immigrant-service orgs,
                              "immigration" employers, ACLU). Kept SEPARATE because
                              the "immigration" query is name-matched and sweeps in
                              federal immigration staff and immigration law firms
                              donating to both parties.
3. Lobbyist Public Search PDFs - MA Secretary of the Commonwealth lobbyist registry.
   These embed subset fonts with no ToUnicode map, so no text extractor can read
   them; figures below were transcribed from page renders committed under
   data/lobbyist_png/ so any reader can check them against the images.

Privacy: OCPF publishes contributor home addresses. This script never copies them.

Run: python scripts/build_influence.py
"""

import csv
import json
import glob
import os
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "influence.json"
DOWNLOADS = Path.home() / "Downloads"

# ---------------------------------------------------------------- lobbying
# Transcribed from data/lobbyist_png/*.png (MA Secretary of the Commonwealth).
# "entity" = payments to a lobbying firm; "expenses" = operating + additional.
ACLU_LOBBYING = [
    {"year": 2020, "salaries": 230595.16, "entity": 80000.00, "expenses": 132996.93, "partial": False},
    {"year": 2021, "salaries": 202985.00, "entity": 80000.00, "expenses": 65572.83, "partial": False},
    {"year": 2022, "salaries": 206888.77, "entity": 85000.00, "expenses": 52765.89, "partial": False},
    {"year": 2023, "salaries": 219234.00, "entity": 90000.00, "expenses": 84894.59, "partial": False},
    {"year": 2024, "salaries": 170359.00, "entity": 95000.00, "expenses": 71598.96, "partial": False},
    {"year": 2025, "salaries": 221769.00, "entity": 97500.00, "expenses": 146439.67, "partial": False},
    {"year": 2026, "salaries": 112213.00, "entity": 37500.00, "expenses": 58504.16, "partial": True},
]
ACLU_ENTITY_FIRM = "Isaacson Political Consulting"

MIRA_LOBBYING = [
    {"year": 2026, "salaries": 16793.30, "entity": 23000.00, "expenses": 29847.66, "partial": True},
]
MIRA_ENTITY_FIRM = "Charles Group Consulting"
MIRA_2026_LOBBYISTS = [
    {"name": "Amy M Grunder", "amount": 8887.22},
    {"name": "Maroni Minter", "amount": 3335.85},
    {"name": "Gilberto Javier Calderin", "amount": 2584.43},
    {"name": "Elizabeth Sweet", "amount": 1985.80},
]
# MIRA's registered purpose is explicitly immigration policy (S.1681/H.2580,
# S.1127/H.1954). ACLU-MA's registered purpose is "all matters related to the
# protection and advancement of civil liberties and civil rights" - broad, and
# NOT immigration-specific. That distinction is carried into the JSON.
SCOPE = {
    "MIRA": "immigration-specific",
    "ACLU": "all civil liberties and civil rights (not immigration-specific)",
}


def num(x):
    try:
        return float(str(x).strip().strip('"').replace(",", "").replace("$", ""))
    except (TypeError, ValueError):
        return 0.0


def parse_ocpf_txt():
    """519-record tab-delimited ACLU-employer export already in the repo."""
    path = ROOT / "ocpf-output.txt"
    rows = list(csv.DictReader(path.open(encoding="utf-8-sig"), delimiter="\t"))
    by_rec, cnt_rec, by_year = defaultdict(float), defaultdict(int), defaultdict(float)
    total = 0.0
    for r in rows:
        amt = num(r.get("Amount"))
        total += amt
        rec = (r.get("Filer Full Name Reverse") or "?").strip('" ')
        by_rec[rec] += amt
        cnt_rec[rec] += 1
        yr = (r.get("Date") or "").strip('" ').split("/")[-1][:4]
        if yr.isdigit():
            by_year[int(yr)] += amt
    recipients = sorted(
        ({"name": k, "amount": round(v, 2), "donations": cnt_rec[k]} for k, v in by_rec.items()),
        key=lambda d: -d["amount"],
    )
    return {
        "records": len(rows),
        "total": round(total, 2),
        "recipients": recipients[:20],
        "by_year": {str(k): round(v, 2) for k, v in sorted(by_year.items())},
    }


def parse_xlsx_exports():
    """The three newer OCPF exports. Reported separately, never merged."""
    try:
        import openpyxl
    except ImportError:
        return []
    labels = {
        "ocpf-output.xlsx": ("ACLU employers", "aclu", "ACLU-employer donors."),
        "ocpf-output (1).xlsx": (
            "Immigrant-service organisations", "orgs",
            "Employers are named immigrant/refugee service organisations (Rian, Irish "
            "International, Immigrants Assistance Center, Immigrant Learning Center, MIRA).",
        ),
        "ocpf-output (2).xlsx": (
            "\"Immigration\" employer name-match", "namematch",
            "NAME-MATCHED, NOT VETTED. Sweeps in federal immigration staff "
            "(Citizenship and Immigration Services, Immigration and Customs Enforcement), "
            "private immigration law firms and service businesses, donating across parties. "
            "Do not read this as advocacy spending.",
        ),
    }
    out = []
    for fname, (label, key, caveat) in labels.items():
        p = DOWNLOADS / fname
        if not p.exists():
            continue
        wb = openpyxl.load_workbook(p, read_only=True)
        ws = wb.active
        rows = list(ws.iter_rows(values_only=True))
        hdr = {h: i for i, h in enumerate(rows[0])}
        total, n = 0.0, 0
        emp, rec, yr = defaultdict(float), defaultdict(float), defaultdict(float)
        for r in rows[1:]:
            if not r or r[hdr["Amount"]] in (None, ""):
                continue
            a = num(r[hdr["Amount"]])
            total += a
            n += 1
            emp[(r[hdr["Employer"]] or "?")] += a
            rec[(r[hdr["Recipient"]] or "?")] += a
            y = str(r[hdr["Date"]] or "").split("/")[-1][:4]
            if y.isdigit():
                yr[int(y)] += a
        wb.close()
        out.append({
            "key": key, "label": label, "caveat": caveat, "file": fname,
            "records": n, "total": round(total, 2),
            "top_employers": sorted(
                ({"name": k, "amount": round(v, 2)} for k, v in emp.items()),
                key=lambda d: -d["amount"])[:10],
            "top_recipients": sorted(
                ({"name": k, "amount": round(v, 2)} for k, v in rec.items()),
                key=lambda d: -d["amount"])[:10],
            "by_year": {str(k): round(v, 2) for k, v in sorted(yr.items())},
        })
    return out


def roll(series):
    for r in series:
        r["total"] = round(r["salaries"] + r["entity"] + r["expenses"], 2)
    return series


def main():
    aclu = roll([dict(r) for r in ACLU_LOBBYING])
    mira = roll([dict(r) for r in MIRA_LOBBYING])

    aclu_full = [r for r in aclu if not r["partial"]]
    payload = {
        "generated_note": "Lobbying figures transcribed from data/lobbyist_png/ page renders.",
        "lobbying": {
            "aclu": {
                "entity_name": "American Civil Liberties Union of Massachusetts",
                "scope": SCOPE["ACLU"],
                "firm": ACLU_ENTITY_FIRM,
                "years": aclu,
                "total_all_years": round(sum(r["total"] for r in aclu), 2),
                "total_complete_years": round(sum(r["total"] for r in aclu_full), 2),
                "complete_year_range": "2020-2025",
                "peak": max(aclu_full, key=lambda r: r["total"])["year"],
            },
            "mira": {
                "entity_name": "Massachusetts Immigrant and Refugee Advocacy Coalition, Inc.",
                "scope": SCOPE["MIRA"],
                "firm": MIRA_ENTITY_FIRM,
                "years": mira,
                "total_all_years": round(sum(r["total"] for r in mira), 2),
                "lobbyists_2026": MIRA_2026_LOBBYISTS,
                "address": "69 Canal Street, Ste. 3, Boston, MA 02114",
            },
        },
        "ocpf_aclu_519": parse_ocpf_txt(),
        "ocpf_exports": parse_xlsx_exports(),
    }

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    a = payload["lobbying"]["aclu"]
    m = payload["lobbying"]["mira"]
    print(f"ACLU-MA lobbying 2020-2025 (complete years): ${a['total_complete_years']:,.2f}")
    print(f"ACLU-MA incl. partial 2026:                  ${a['total_all_years']:,.2f}")
    for r in a["years"]:
        flag = "  (H1 only)" if r["partial"] else ""
        print(f"   {r['year']}  ${r['total']:>12,.2f}{flag}")
    print(f"\nMIRA lobbying 2026 (H1 only):                ${m['total_all_years']:,.2f}")
    o = payload["ocpf_aclu_519"]
    print(f"\nOCPF ACLU-employer donations: ${o['total']:,.2f} across {o['records']} records")
    print("  top 6 recipients:")
    for r in o["recipients"][:6]:
        print(f"     ${r['amount']:>9,.0f}  {r['donations']:>3} donations  {r['name']}")
    print("\nseparate OCPF exports:")
    for e in payload["ocpf_exports"]:
        print(f"   {e['label']:<42} ${e['total']:>9,.0f}  ({e['records']} records)")
    print(f"\nwrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
