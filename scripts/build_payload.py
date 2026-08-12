"""Build a compact JSON payload of every payment so the dashboard can compute
its own numbers in the browser instead of hard-coding them.

Columnar + lookup-table encoding keeps 8,883 payments well under 1 MB.
Run: python scripts/build_payload.py  ->  data/payments.json
"""

import csv
import json
from pathlib import Path

from classify_tiers import tier_of  # reuse the single source of truth

ROOT = Path(__file__).resolve().parent.parent
CSV = ROOT / "immigrant_orgs_FILTERED.csv"
OUT = ROOT / "data" / "payments.json"

TIER_CODE = {
    "A_immigrant_program": 0,
    "B_shelter_reserve": 1,
    "C_health_center": 2,
    "D_false_positive": 3,
}


def main():
    rows = []
    with CSV.open(newline="", encoding="utf-8-sig") as fh:
        reader = csv.DictReader(fh)
        reader.fieldnames = [(f or "").strip() for f in reader.fieldnames]
        for r in reader:
            try:
                amt = float((r.get("Amount") or "").strip())
            except (ValueError, AttributeError):
                continue
            rows.append(
                {
                    "amount": amt,
                    "vendor": (r.get("Vendor") or "").strip(),
                    "dept": (r.get("Department") or "").strip(),
                    "approp": (r.get("Appropriation") or "").strip(),
                    "fy": (r.get("Budget_Fiscal_Year") or "").strip(),
                    "date": (r.get("Payment Date") or "").strip()[:10],
                    "city": (r.get("City") or "").strip(),
                    "fund": (r.get("Fund") or "").strip(),
                }
            )

    def table(key):
        vals = sorted({r[key] for r in rows})
        return vals, {v: i for i, v in enumerate(vals)}

    vendors, vi = table("vendor")
    depts, di = table("dept")
    approps, ai = table("approp")
    funds, fi = table("fund")
    cities, ci = table("city")

    payload = {
        "meta": {
            "source": "MA Statewide Payments (CTHRU) export, filtered by vendor name",
            "payments": len(rows),
            "total": round(sum(r["amount"] for r in rows), 2),
            "date_min": min(r["date"] for r in rows if r["date"]),
            "date_max": max(r["date"] for r in rows if r["date"]),
            "tier_labels": [
                "Immigrant/refugee program",
                "Family shelter & housing reserve",
                "MassHealth claims / community health center",
                "Name-match false positive",
            ],
        },
        "lookups": {
            "vendor": vendors,
            "dept": depts,
            "approp": approps,
            "fund": funds,
            "city": cities,
        },
        # columnar: v=vendor d=dept a=approp f=fund c=city y=fy t=tier m=amount(cents) p=date
        "cols": {
            "v": [vi[r["vendor"]] for r in rows],
            "d": [di[r["dept"]] for r in rows],
            "a": [ai[r["approp"]] for r in rows],
            "f": [fi[r["fund"]] for r in rows],
            "c": [ci[r["city"]] for r in rows],
            "y": [int(r["fy"]) if r["fy"].isdigit() else 0 for r in rows],
            "t": [TIER_CODE[tier_of(r)] for r in rows],
            "m": [round(r["amount"] * 100) for r in rows],
            "p": [r["date"] for r in rows],
        },
    }

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")
    kb = OUT.stat().st_size / 1024
    print(f"wrote {OUT.relative_to(ROOT)}  ({kb:,.0f} KB, {len(rows):,} payments)")


if __name__ == "__main__":
    main()
