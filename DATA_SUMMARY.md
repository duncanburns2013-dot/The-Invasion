# Massachusetts Immigrant Spending — Data Summary

**Dashboard:** https://duncanburns2013-dot.github.io/The-Invasion/
**Repo:** https://github.com/duncanburns2013-dot/The-Invasion

Figure-by-figure reference. Confidence levels (A documented / B reported / C estimated) are
defined in [`METHODOLOGY.md`](METHODOLOGY.md).

*Budget figures current to the FY27 GAA, signed 9 July 2026. Payment records run through
February 2026. Last reviewed August 2026.*

---

## 1. CURRENT BUDGET — FY27 (Level A)

| Line item | FY26 enacted | FY27 enacted | Change |
|---|---|---|---|
| Total state budget | — | **$63.42B** | signed 9 Jul 2026 |
| EA family shelter (7004-0101) | $276M | **$259.9M** | ↓ 6% |
| HomeBASE (7004-0108) | ~$57M | **$82.3M** | ↑ 44% |
| RAFT (7004-9316) | — | $209M | — |
| MRVP vouchers (7004-9024) | — | $278.3M | ↑ 10% |
| **Rental/housing aid, FY27** | | **$569.6M** | |

> The 44% HomeBASE rise is enacted-to-enacted. FY26 received in-year transfers above its
> $57M appropriation, so growth in actual *spending* is smaller than growth in
> *appropriation*.

---

## 2. THE SHIFT — shelter down, HomeBASE up

| FY | Shelter | HomeBASE | Basis |
|---|---|---|---|
| FY22 | $150M | $12M | spending |
| FY23 | $350M | $26M | spending |
| FY24 | $856M | $37M | spending |
| FY25 | $1.06B | $101M | spending ($830M shelter actual as of June) |
| FY26 | $276M | ~$57M | enacted |
| FY27 | $259.9M | $82.3M | enacted |

- HomeBASE spending growth FY22→FY25: **+718%**
- Shelter spending growth FY22→FY25: **+607%**, then cut sharply as caseload fell
- HomeBASE pays up to **$30,000 per family over two years**
- Enrolment: ~1,500 families (early 2023) → **7,700+** (2025)

### Caseload
- Families in EA shelter fell **below 5,000** — first time since July 2023
- ~**4,800** families as of May 2026
- State shrinking the system toward **~3,200 units**; reporting indicates a substantial share
  of beds sitting empty while some families are turned away

---

## 3. FY25 HEADLINE COST — $1.88B (mixed confidence)

| Component | Amount | Level |
|---|---|---|
| Emergency shelter | $1.06B | B |
| Wraparound services (legal aid, case mgmt, workforce, Guard) | $150M | B |
| Education K-12 (25,000 × $23,000) | $575M | **C** |
| Healthcare (~$3,800 × 25,000) | $95M | **C** |
| **Total** | **$1.88B** | mixed |
| **Documented only** | **$1.21B** | B |

Derived per-capita figures (from the $1.88B):

| Metric | Value | Calculation |
|---|---|---|
| Per taxpayer/year | $537 | $1.88B ÷ 3.5M filers |
| Per household/year | $671 | $1.88B ÷ 2.8M households |
| Two-year total FY24+FY25 | $3.1B | combined |

**$670M (36%) of the headline is Level C** — modelled by the Center for Immigration Studies,
an advocacy organisation. The dashboard calculator defaults to the documented $1.21B.

---

## 4. PAYMENT RECORDS — $228.6M, with a correction

`immigrant_orgs_FILTERED.csv` — **8,883 payments, $228,606,882**, Oct 2019 – Feb 2026,
Executive Office of Health & Human Services, 28 vendors.

> **Correction to earlier versions of this document.** Previous editions described this as
> Executive Office of Housing and Livable Communities data and reported the MassHealth share
> as both 38% and 67% in different places. Both were wrong. The file is Health & Human
> Services, and the correct breakdown is below. The $2.48B "full checkbook" figure cited
> previously is not reproducible from anything in this repo and has been withdrawn pending
> a re-export.

### Evidence tiers (from `scripts/classify_tiers.py`)

| Tier | Amount | Share | Payments | Vendors |
|---|---|---|---|---|
| MassHealth / community health centres | $179,338,211 | 78.4% | 4,973 | 7 |
| Immigrant & refugee programs | $38,177,054 | 16.7% | 2,377 | 11 |
| Family shelter & housing reserves | $8,582,543 | 3.8% | 112 | 4 |
| Name-match false positives | $2,509,074 | 1.1% | 1,421 | 12 |
| **Defensible core** | **$46,759,597** | **20.5%** | | |

### By fiscal year

| FY | As published | Defensible core |
|---|---|---|
| FY2020 | $550,890 | $550,890 |
| FY2021 | $2,626,808 | $554,782 |
| FY2022 | $12,813,330 | $12,813,330 |
| FY2023 | $90,422,381 | $7,498,502 |
| FY2024 | $14,746,092 | $7,661,104 |
| FY2025 | $100,421,451 | $15,089,432 |
| FY2026 (partial) | $7,025,929 | $2,591,556 |

### Top vendors as filtered

| Vendor | Amount | Payments | Classification |
|---|---|---|---|
| East Boston Neighborhood Health Center | $59,184,430 | 723 | MassHealth (matched "NEIGHBOR") |
| Brockton Neighborhood Health Center | $58,566,403 | 2,660 | MassHealth (matched "NEIGHBOR") |
| NeighborHealth Corporation | $45,435,559 | 618 | MassHealth (matched "NEIGHBOR") |
| Refugee & Immigrant Assistance Center | $17,098,052 | 1,370 | Immigrant program |
| Immigrant Family Servs Inst (IFSI-USA) | $14,480,198 | 46 | Immigrant program |
| Harvard Street Neighborhood | $11,942,275 | 914 | MassHealth (matched "NEIGHBOR") |
| Massachusetts Immigrant & Refugee (MIRA) | $7,662,233 | 293 | Immigrant program |
| Organization Refugee & Immigrant Success | $4,296,552 | 264 | Immigrant program (NH-based) |

### Largest appropriations in the file

| Appropriation | Amount | Share |
|---|---|---|
| (40000601) MASSHEALTH SENIOR CARE | $83,457,273 | 36.5% |
| (40000700) INDEMNITY / THIRD PARTY LIABILITY | $40,892,536 | 17.9% |
| (40030122) LOW-INCOME CITIZENSHIP PROGRAM | $17,948,568 | 7.9% |
| (40000500) MANAGED CARE PLAN | $16,512,886 | 7.2% |
| (15992026) BEHAVIORAL HEALTH AND ADDICTION | $11,145,668 | 4.9% |
| (40000940) ACA EXPANSION POPULATIONS | $9,177,947 | 4.0% |
| (15991213) FAMILY SHELTER AND SERVICES RESERVE | $5,458,912 | 2.4% |

MassHealth Senior Care being the single largest line is the clearest signal that the vendor
filter is not selecting immigrant spending.

### By department

| Department | Amount | Share |
|---|---|---|
| Executive Office of Health and Human Services | $174,982,620 | 76.5% |
| **Office for Refugees and Immigrants (ORI)** | **$45,193,090** | **19.8%** |
| Department of Public Health | $8,205,358 | 3.6% |
| All others | $225,814 | 0.1% |

**ORI — the state's actual immigrant agency — accounts for $45.2M**, not $228.6M.

---

## 5. MIRA COALITION

| | |
|---|---|
| Total contracts | $7,662,233 (293 payments) |
| Lobbying spend | $87,548 (2022–2025) |
| Growth | FY20 $256K → FY25 $4.2M (16×) |

| Program | Amount |
|---|---|
| Family Shelter Services | $3,976,026 |
| Immigrants Housing Reserve | $1,296,000 |
| Immigration Legal Assistance | $930,314 |
| Low-Income Citizenship | $803,799 |
| Immigrants Supports Reserve | $474,095 |

| Registered lobbyist | Years | Amount |
|---|---|---|
| Amy M. Grunder | 2022–2025 | $61,132 |
| Charles Group Consulting | 2022 | $20,000 |
| Edwin Jonathan Paz | 2023 | $4,626 |
| Elizabeth Sweet | 2025 | $1,790 |

MIRA holds contracts from agencies it is registered to lobby — a documented structural
conflict, stated as such.

---

## 5b. REGISTERED LOBBYING (Level A — Secretary of the Commonwealth)

Transcribed from `data/lobbyist_png/` page renders; source PDFs in `data/lobbyist_pdf/`.
The PDFs embed subset fonts with no ToUnicode map, so no text extractor can read them —
the renders exist so any reader can check the figures against the originals.

### ACLU of Massachusetts

| Year | In-house salaries | Isaacson Political Consulting | Expenses | Total |
|---|---|---|---|---|
| 2020 | $230,595.16 | $80,000.00 | $132,996.93 | **$443,592.09** |
| 2021 | $202,985.00 | $80,000.00 | $65,572.83 | **$348,557.83** |
| 2022 | $206,888.77 | $85,000.00 | $52,765.89 | **$344,654.66** |
| 2023 | $219,234.00 | $90,000.00 | $84,894.59 | **$394,128.59** |
| 2024 | $170,359.00 | $95,000.00 | $71,598.96 | **$336,957.96** |
| 2025 | $221,769.00 | $97,500.00 | $146,439.67 | **$465,708.67** |
| **2020–2025 total** | | | | **$2,333,599.80** |
| 2026 (1/1–6/30 only) | $112,213.00 | $37,500.00 | $58,504.16 | *$208,217.16* |

That is roughly **40× the $59,185 in employee campaign donations** — the lobbying is the
bigger number by a wide margin.

> **Scope caveat, important.** ACLU-MA's registered purpose is *"all matters related to the
> protection and advancement of civil liberties and civil rights."* That is broad and **not
> immigration-specific**. This total must not be described as immigration lobbying. It is
> included here because the site's ACLU section previously showed only the much smaller
> donation figure, which understated the organisation's actual Beacon Hill spending.

### MIRA Coalition — 2026 registration (new)

| Item | Amount |
|---|---|
| Amy M Grunder | $8,887.22 |
| Maroni Minter *(new)* | $3,335.85 |
| Gilberto Javier Calderin *(new)* | $2,584.43 |
| Elizabeth Sweet | $1,985.80 |
| **Lobbyist salaries subtotal** | **$16,793.30** |
| Charles Group Consulting (firm) | $23,000.00 |
| Operating expenses | $1,640.53 |
| Additional expenses | $28,207.13 |
| **2026 total (1/1–6/30 only)** | **$69,640.96** |

Half of 2026 alone nearly equals the $87,548 previously reported for all of 2022–2025 —
because that earlier figure counted only individual lobbyist salaries, not payments to
lobbying firms or disclosed expenses.

MIRA's 2026 registration names its targets explicitly: **S.1681 / H.2580** and
**S.1127 / H.1954**, plus budget legislation; lobbying House and Senate leadership, the
Governor, SOC, AG, and A&F, DOT, DHE, EOLWD, EOPSS, EOHED and EOHHS. Registered address
69 Canal Street, Ste. 3, Boston. **Unlike ACLU-MA's, this registration is explicitly
immigration policy.**

---

## 6. ACLU EMPLOYEE DONATIONS (Level A, correlation only)

$59,185 across 519 donations by individuals employed by the ACLU. **Individual** OCPF
filings, not organisational contributions.

| Recipient | Role | Amount | Donations |
|---|---|---|---|
| **Rahsaan Hall** | ACLU-MA racial justice director; 2022 Plymouth DA candidate | **$4,643** | 43 |
| **Deval Patrick** | Former Governor | **$3,850** | 14 |
| Michelle Wu | Boston Mayor | $2,915 | 95 |
| **Quentin Palfrey** | 2018 Lt. Governor nominee | **$2,700** | 5 |
| Maura Healey | Governor | $2,300 | 14 |
| MA Democratic State Committee | Party committee | $1,800 | 2 |
| Andrea Campbell | Attorney General | $1,775 | 10 |
| Aaron Michlewitz | House Ways & Means Chair | $1,550 | 9 |
| Martin J. Walsh | Former Boston Mayor | $1,525 | 14 |
| Karen Spilka | Senate President | $1,200 | 6 |

> **Correction (August 2026).** An earlier version of this table reported Wu at $3,215/98
> and Healey at $2,370/16 — both overstated — and omitted the two largest recipients
> entirely. The single biggest recipient of ACLU-employee money is **Rahsaan Hall**, who at
> the time was ACLU-MA's own racial justice program director and running for Plymouth County
> District Attorney. Recomputed directly from the 519 records in `ocpf-output.txt`;
> the $59,185.25 / 519 headline total is confirmed correct.

Annual totals: $825 (2019) → $11,616 (2022). Presented as a sequence, not causation.

---

## 7. SHELTER INFRASTRUCTURE VENDORS (Level B)

| Vendor | Total | Immigrant % | Immigrant $ | Purpose |
|---|---|---|---|---|
| Accenture LLP | $26.0M | 50.6% | $13.1M | Shelter intake/tracking IT |
| University of Massachusetts | $12.6M | 100% | $12.6M | EA shelter operations |
| Internal Security Associates | $7.1M | 100% | $7.1M | Security guards |
| TransPerfect | $6.9M | 100% | $6.9M | Translation |
| Pine Street Inn | $14.8M | 47.1% | $6.9M | Emergency shelters |
| United Way of MA Bay | $11.0M | 54.5% | $6.0M | Family Shelter Reserve |

The immigrant-percentage allocations are apportionment assumptions, not amounts stated in
any source document.

---

## 8. SOURCES

1. FY27 General Appropriations Act (signed 9 July 2026), Mass.gov budget
2. MassBudget — in-depth FY27 GAA analysis (July 2026)
3. MAPC — FY27 budget summary
4. MA Executive Office of Housing and Livable Communities — biweekly shelter reports
5. Mass.gov — shelter caseload announcements
6. WBUR, State House News Service — shelter system reporting, 2026
7. Boston Herald — shelter/housing spending, March 2025
8. Center for Immigration Studies — Massachusetts case study, July 2024 *(advocacy source)*
9. FAIR — 2023 national cost study *(advocacy source)*
10. Congressional Budget Office — immigration surge fiscal analysis
11. MA statewide payment records (CTHRU)
12. OCPF — campaign finance
13. MA Secretary of State — lobbyist registry

---

*Reproduce every figure in section 4: `python scripts/analyze_csv.py` and
`python scripts/classify_tiers.py`.*
