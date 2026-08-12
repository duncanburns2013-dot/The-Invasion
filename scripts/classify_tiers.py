"""Classify every payment in immigrant_orgs_FILTERED.csv into evidence tiers.

The source CSV was built by substring-matching vendor names (IMMIGRANT, REFUGEE,
MIRA, NEIGHBOR...). That match is noisy: it sweeps in community health centers
and unrelated businesses/individuals whose names merely contain "NEIGHBOR" or
"MIRA". This script separates what the data actually supports.

Run: python scripts/classify_tiers.py
Emits: data/tiers.json  (also used to power the dashboard's evidence toggle)
"""

import csv
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV = ROOT / "immigrant_orgs_FILTERED.csv"
OUT = ROOT / "data" / "tiers.json"

# Appropriations that are explicitly immigrant/refugee programs by name.
IMMIGRANT_APPROP = (
    "LOW-INCOME CITIZENSHIP",
    "RESETTLEMENT AGENCIES",
    "REFUGEE",
    "IMMIGRATION AND REFUGEE",
    "SCHOOL IMPACT",
    "CITIZENSHIP FOR NEW AMERICANS",
)
SHELTER_APPROP = ("FAMILY SHELTER AND SERVICES RESERVE", "IMMIGRANTS HOUSING", "IMMIGRANTS SUPPORTS")
# Standard MassHealth / claims-processing appropriations - not immigrant programs.
HEALTH_APPROP = (
    "MASSHEALTH",
    "INDEMNITY / THIRD PARTY LIABILITY",
    "MANAGED CARE PLAN",
    "ACA EXPANSION",
    "HEALTH SAFETY NET",
    "PUBLIC HEALTH TRUST FUND",
    "BEHAVIORAL HEALTH",
    "OPIOID",
)
# Vendors swept in purely by a name substring, with no immigrant mission.
FALSE_POSITIVE_VENDORS = {
    "KRISTINA MIRANDA",
    "MIRANDA Y CHEN",
    "PAUL F MIRAGLIA D.D.S., P.C.",
    "AMIRAH, INC",
    "MINI MIRACLES FAMILY DAYCARE",
    "NEIGHBORHOOD DENTAL GROUP PC",
    "NEIGHBORHOOD PEDIATRICS PC",
    "NEIGHBORHOOD HOME HLTH CARE INC",
    "HARVARD NEIGHBORHOOD PHARMACY INC",
    "NEIGHBORHOOD CARE MEDICAL SERVICES PLLC",
    "NEIGHBORHOOD COUNSELING AND COMMUNITY",
    "NEIGHBORHOOD HOUSE",
}
# Community health centers: real providers, but matched on "NEIGHBOR"/"HEALTH",
# serving their whole neighborhood and billing MassHealth for all patients.
HEALTH_CENTER_VENDORS = {
    "EAST BOSTON NEIGHBORHOOD HEALTH CENTER",
    "EAST BOSTON NEIGHBORHOOD",
    "BROCKTON NEIGHBORHOOD HLTH CTR",
    "NEIGHBORHEALTH CORPORATION",
    "HARVARD STREET NEIGHBORHOOD",
}


def tier_of(r):
    v, ap, dept = r["vendor"], r["approp"].upper(), r["dept"].upper()
    if v in FALSE_POSITIVE_VENDORS:
        return "D_false_positive"
    if v in HEALTH_CENTER_VENDORS:
        return "C_health_center"
    if any(k in ap for k in SHELTER_APPROP):
        return "B_shelter_reserve"
    if "OFFICE FOR REFUGEES AND IMMIGRANTS" in dept or any(k in ap for k in IMMIGRANT_APPROP):
        return "A_immigrant_program"
    if any(k in ap for k in HEALTH_APPROP):
        return "C_health_center"
    return "A_immigrant_program"


LABELS = {
    "A_immigrant_program": "Immigrant/refugee program spending (defensible)",
    "B_shelter_reserve": "Family shelter & housing reserves (defensible)",
    "C_health_center": "MassHealth claims / community health centers (not immigrant-specific)",
    "D_false_positive": "Name-match false positives (unrelated vendors)",
}


def main():
    rows = []
    with CSV.open(newline="", encoding="utf-8-sig") as fh:
        reader = csv.DictReader(fh)
        reader.fieldnames = [(f or "").strip() for f in reader.fieldnames]
        for r in reader:
            try:
                amt = float((r.get("Amount") or "").strip())
            except ValueError:
                continue
            rows.append(
                {
                    "amount": amt,
                    "vendor": (r.get("Vendor") or "").strip(),
                    "dept": (r.get("Department") or "").strip(),
                    "fy": (r.get("Budget_Fiscal_Year") or "").strip(),
                    "approp": (r.get("Appropriation") or "").strip(),
                    "date": (r.get("Payment Date") or "").strip()[:10],
                    "city": (r.get("City") or "").strip(),
                }
            )

    for r in rows:
        r["tier"] = tier_of(r)

    total = sum(r["amount"] for r in rows)
    by_tier = defaultdict(float)
    cnt_tier = defaultdict(int)
    vendors_tier = defaultdict(set)
    for r in rows:
        by_tier[r["tier"]] += r["amount"]
        cnt_tier[r["tier"]] += 1
        vendors_tier[r["tier"]].add(r["vendor"])

    print(f"TOTAL AS PUBLISHED: ${total:,.0f}  ({len(rows):,} payments)\n")
    for t in sorted(by_tier, key=lambda k: -by_tier[k]):
        print(
            f"{t:22} ${by_tier[t]:>14,.0f}  {by_tier[t]/total*100:5.1f}%  "
            f"{cnt_tier[t]:>5} pmts  {len(vendors_tier[t]):>2} vendors"
        )
        print(f"{'':22} {LABELS[t]}")

    defensible = by_tier["A_immigrant_program"] + by_tier["B_shelter_reserve"]
    print(f"\nDEFENSIBLE CORE (A+B): ${defensible:,.0f} = {defensible/total*100:.1f}% of published total")
    print(f"NOT IMMIGRANT-SPECIFIC (C+D): ${total-defensible:,.0f} = {(total-defensible)/total*100:.1f}%")

    # per-FY, defensible only
    fy_all, fy_core = defaultdict(float), defaultdict(float)
    for r in rows:
        fy_all[r["fy"]] += r["amount"]
        if r["tier"] in ("A_immigrant_program", "B_shelter_reserve"):
            fy_core[r["fy"]] += r["amount"]
    print("\nFY        AS PUBLISHED      DEFENSIBLE CORE")
    for fy in sorted(fy_all):
        print(f"FY{fy}   ${fy_all[fy]:>13,.0f}   ${fy_core[fy]:>13,.0f}")

    # vendor rollup for the dashboard explorer
    vend = defaultdict(lambda: {"amount": 0.0, "payments": 0, "tier": "", "fys": set(), "city": ""})
    for r in rows:
        v = vend[r["vendor"]]
        v["amount"] += r["amount"]
        v["payments"] += 1
        v["tier"] = r["tier"]
        v["fys"].add(r["fy"])
        v["city"] = v["city"] or r["city"]

    payload = {
        "generated_from": CSV.name,
        "total_as_published": round(total, 2),
        "payment_count": len(rows),
        "tiers": {
            t: {
                "label": LABELS[t],
                "amount": round(by_tier[t], 2),
                "payments": cnt_tier[t],
                "vendors": len(vendors_tier[t]),
            }
            for t in by_tier
        },
        "defensible_core": round(defensible, 2),
        "by_fy": {
            fy: {"published": round(fy_all[fy], 2), "core": round(fy_core[fy], 2)} for fy in sorted(fy_all)
        },
        "vendors": sorted(
            (
                {
                    "name": k,
                    "amount": round(v["amount"], 2),
                    "payments": v["payments"],
                    "tier": v["tier"],
                    "city": v["city"],
                    "fys": sorted(v["fys"]),
                }
                for k, v in vend.items()
            ),
            key=lambda d: -d["amount"],
        ),
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"\nwrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
