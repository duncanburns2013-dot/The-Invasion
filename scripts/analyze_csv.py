"""Audit immigrant_orgs_FILTERED.csv and report what the raw data actually says.

Run: python scripts/analyze_csv.py
Purpose: resolve the doc contradictions (total $, org count, MassHealth share,
fiscal-year split) from the source data rather than from prose.
"""

import csv
import sys
from collections import defaultdict
from pathlib import Path

CSV = Path(__file__).resolve().parent.parent / "immigrant_orgs_FILTERED.csv"


def money(n):
    return f"${n:,.0f}"


def main():
    rows = []
    with CSV.open(newline="", encoding="utf-8-sig") as fh:
        reader = csv.DictReader(fh)
        reader.fieldnames = [(f or "").strip() for f in reader.fieldnames]
        for r in reader:
            raw = (r.get("Amount") or "").strip()
            if not raw:
                continue
            try:
                amt = float(raw)
            except ValueError:
                continue
            rows.append(
                {
                    "amount": amt,
                    "vendor": (r.get("Vendor") or "").strip(),
                    "dept": (r.get("Department") or "").strip(),
                    "sec": (r.get("Cabinet_Secretariat") or "").strip(),
                    "fy": (r.get("Budget_Fiscal_Year") or "").strip(),
                    "approp": (r.get("Appropriation") or "").strip(),
                    "obj": (r.get("Object") or "").strip(),
                    "objclass": (r.get("Object_Class") or "").strip(),
                    "fund": (r.get("Fund") or "").strip(),
                    "city": (r.get("City") or "").strip(),
                    "state": (r.get("State") or "").strip(),
                    "date": (r.get("Payment Date") or "").strip()[:10],
                }
            )

    total = sum(r["amount"] for r in rows)
    vendors = {r["vendor"] for r in rows if r["vendor"]}
    print(f"ROWS (with amount): {len(rows):,}")
    print(f"TOTAL: {money(total)}")
    print(f"DISTINCT VENDORS: {len(vendors)}")
    print(f"NEGATIVE/REVERSAL ROWS: {sum(1 for r in rows if r['amount'] < 0):,} "
          f"({money(sum(r['amount'] for r in rows if r['amount'] < 0))})")

    def group(key, label, top=15):
        agg = defaultdict(float)
        cnt = defaultdict(int)
        for r in rows:
            agg[r[key]] += r["amount"]
            cnt[r[key]] += 1
        print(f"\n=== BY {label} ===")
        for k, v in sorted(agg.items(), key=lambda kv: -kv[1])[:top]:
            share = v / total * 100 if total else 0
            print(f"{money(v):>16}  {share:5.1f}%  {cnt[k]:>5} pmts  {k[:64]}")
        return agg

    group("fy", "FISCAL YEAR", 12)
    group("sec", "SECRETARIAT", 10)
    group("dept", "DEPARTMENT", 12)
    vend = group("vendor", "VENDOR", 30)
    group("approp", "APPROPRIATION", 15)
    group("objclass", "OBJECT CLASS", 12)
    group("fund", "FUND", 10)

    # MassHealth share - the contested number
    print("\n=== MASSHEALTH / MEDICAID SHARE ===")
    keys = ("MASSHEALTH", "MEDICAID", "HEALTH CARE SERVICES", "MEDICAL")
    mh = sum(
        r["amount"]
        for r in rows
        if any(k in (r["approp"] + r["dept"] + r["obj"] + r["objclass"]).upper() for k in keys)
    )
    print(f"rows matching {keys}: {money(mh)} = {mh / total * 100:.1f}% of {money(total)}")

    hc_vendors = [v for v in vendors if "HEALTH" in v.upper()]
    hc_total = sum(vend[v] for v in hc_vendors)
    print(f"vendors with 'HEALTH' in name ({len(hc_vendors)}): {money(hc_total)} = "
          f"{hc_total / total * 100:.1f}%")
    for v in sorted(hc_vendors, key=lambda x: -vend[x]):
        print(f"   {money(vend[v]):>14}  {v}")

    print("\n=== DATE RANGE ===")
    dates = sorted(r["date"] for r in rows if r["date"])
    print(f"{dates[0]} -> {dates[-1]}")

    print("\n=== OUT-OF-STATE VENDORS ===")
    oos = defaultdict(float)
    for r in rows:
        if r["state"] and r["state"] != "MA":
            oos[r["state"]] += r["amount"]
    for k, v in sorted(oos.items(), key=lambda kv: -kv[1]):
        print(f"{money(v):>16}  {k}")


if __name__ == "__main__":
    sys.exit(main())
