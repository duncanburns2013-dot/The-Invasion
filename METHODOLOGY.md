# Methodology & Confidence Levels

Every figure on the dashboard falls into one of three confidence levels. This file states
which is which, so a reader can weigh each claim on its own merits rather than treating a
modelled estimate and an audited payment as the same kind of fact.

| Level | Meaning |
|---|---|
| **A — Documented** | A line item in an enacted budget, or a payment record. Verifiable against a primary source. |
| **B — Reported** | A figure published by the state or a news organisation citing state data. Reliable, but secondary. |
| **C — Estimated** | A modelled figure built on assumptions. Useful for scale; not a measurement. |

---

## Budget line items — Level A

| Figure | Value | Source |
|---|---|---|
| FY27 total state budget | $63.42B | FY27 GAA, signed 9 July 2026 |
| EA family shelter, FY27 (7004-0101) | $259.9M | FY27 GAA |
| EA family shelter, FY26 | $276M | FY26 GAA |
| HomeBASE, FY27 (7004-0108) | $82.3M | FY27 GAA |
| HomeBASE, FY26 | ~$57M | FY26 GAA (plus in-year transfers) |
| RAFT, FY27 (7004-9316) | $209M | FY27 GAA |
| MRVP, FY27 (7004-9024) | $278.3M | FY27 GAA |

Cross-checked against MassBudget's and MAPC's independent FY27 analyses.

**Caveat on FY26 HomeBASE:** additional funds were transferred into HomeBASE during FY26 to
meet demand, so the "44% increase" compares enacted-to-enacted. Actual FY26 spending was
higher than $57M, which makes the year-over-year growth in *spending* smaller than the growth
in *appropriation*. Both framings are stated rather than the more dramatic one being chosen.

---

## Shelter and HomeBASE spending trend — Level A/B

| FY | Shelter | HomeBASE | Level |
|---|---|---|---|
| FY22 | $150M | $12M | B |
| FY23 | $350M | $26M | B |
| FY24 | $856M | $37M | B (Boston Herald, state data) |
| FY25 | $1.06B | $101M | B (state projection; $830M actual as of June) |
| FY26 | $276M | ~$57M | A (enacted) |
| FY27 | $259.9M | $82.3M | A (enacted) |

FY22–FY25 are spending; FY26–FY27 are appropriations. The dashboard labels each bar
`actual` or `enacted` rather than presenting them as one continuous series.

---

## The $1.88B FY25 total — mixed

| Component | Amount | Level | Note |
|---|---|---|---|
| Emergency shelter | $1.06B | B | State reports, Boston Herald |
| Wraparound services | $150M | B | State biweekly shelter report |
| Education (K-12) | $575M | **C** | CIS: 25,000 students × $23,000 |
| Healthcare / MassHealth | $95M | **C** | CIS: ~$3,800 × 25,000 |

**$670M — 36% of the headline — is Level C.** Both estimates come from the Center for
Immigration Studies, an organisation that advocates for reduced immigration. Its per-student
and per-capita figures are contested, and the 25,000-student count is itself an estimate.

The dashboard's calculator therefore defaults to the **documented $1.21B**, with the full
$1.88B available as an explicit alternative.

---

## Per-taxpayer figures — two different methods

The site quotes **$537 per taxpayer per year**. The household calculator will usually give a
different answer. Both are correct; they slice the same total two different ways, and the
difference is worth understanding before quoting either.

### Method 1 — flat average per filer (this is the $537)

```
$1.88B ÷ ~3.5M individual filers = $537
$1.21B ÷ ~3.5M individual filers = $346   (documented basis)
```

Everyone gets the same number regardless of income. Simple, but it tells you nothing about
your own position.

### Method 2 — income-scaled share (this is the calculator)

```
your MA income tax (5% flat)
  × (spending ÷ $26.712B total FY25 income tax collections)
  × years
```

FY25 Massachusetts income tax collections were **$26.712B** of $43.705B total tax revenue
(MA DOR). So the full $1.88B is **7.04%** of income tax revenue, and the documented $1.21B is
**4.53%**.

### Why they disagree, and where they meet

The average Massachusetts filer's income tax bill is about **$26.712B ÷ 3.5M = $7,632**. A
household with $115,000 in taxable income pays $5,750 — about **75% of average** — so its
income-scaled share is 75% of the flat average:

| Taxable income | MA income tax | vs. average filer | Share (full $1.88B) | Flat average |
|---|---|---|---|---|
| $115,000 | $5,750 | 75% | **$405** | $537 |
| $120,000 | $6,000 | 79% | **$422** | $537 |
| ~$152,640 | $7,632 | 100% | **$537** | $537 |

**The two methods agree exactly at the average filer.** Below-average earners come in under
$537; above-average earners come in over it. That is the correct behaviour for a flat-rate
income tax, not a discrepancy.

Note also that the calculator **defaults to the documented $1.21B**, not the $1.88B headline,
so its default answer is lower again for that separate reason.

### Correction

An earlier version of the calculator used **$23.8B** as the income-tax denominator instead of
the correct **$26.712B**, which overstated every user's share by about 12%. Fixed August 2026.

### Caveats

- The **~3.5M filer count is the weakest input** in both methods and is not independently
  verified here. Every per-taxpayer figure moves inversely with it.
- The $26.712B denominator includes capital gains tax and the 4% millionaires surtax
  ($3.049B), which are not levied at 5%. Including them is deliberate: that revenue really
  does fund the budget, so counting it reduces an ordinary filer's apportioned share.
- Because of the above, dividing $7,632 by 5% to infer a "$152,640 average income" overstates
  actual average income. The average *tax bill* is the defensible figure; the implied income
  is not.
- "Per household" figures ($671) use ~2.8M households and are a different denominator again.

---

## The checkbook data — Level A payments, contested filter

`immigrant_orgs_FILTERED.csv` contains 8,883 payments totalling $228,606,882 (Oct 2019 –
Feb 2026), all from the Executive Office of Health & Human Services.

The **payments** are Level A. The **filter that selected them** is the weak point: vendors
were matched on name substrings (`IMMIGRANT`, `REFUGEE`, `MIRA`, `NEIGHBOR`), which is
over-inclusive.

`scripts/classify_tiers.py` re-sorts every payment by what its appropriation funds:

| Tier | Amount | Share | Basis |
|---|---|---|---|
| MassHealth / community health centres | $179,338,211 | 78.4% | MassHealth Senior Care, indemnity/TPL, managed care, ACA expansion |
| Immigrant & refugee programs | $38,177,054 | 16.7% | ORI department, citizenship, resettlement, refugee services |
| Family shelter & housing reserves | $8,582,543 | 3.8% | Family shelter reserve, immigrant housing reserve |
| Name-match false positives | $2,509,074 | 1.1% | Vendors with no immigrant mission |
| **Defensible core** | **$46,759,597** | **20.5%** | |

Known false positives, listed explicitly so the classification can be challenged:
Paul F. Miraglia D.D.S., Mini Miracles Family Daycare, Amirah Inc, Kristina Miranda,
Miranda Y Chen, and seven "Neighborhood"-named medical and dental practices.

Community health centres (East Boston Neighborhood Health Center, Brockton Neighborhood
Health Center, NeighborHealth, Harvard Street Neighborhood) are classified as MassHealth
rather than immigrant spending. They serve heavily immigrant neighbourhoods, so a share of
their billing does fund care for immigrants — but the payments are patient-care
reimbursements for all residents, and the file gives no basis for splitting them. Counting
them whole would overstate the figure by roughly 3.5×.

**Two claims this data does not support:**

1. That $228.6M is immigrant spending. It isn't; $46.8M is the supportable figure.
2. That this CSV is the "$2.48B Executive Office of Housing checkbook." It is a different
   secretariat (Health & Human Services). Earlier versions of this repo conflated the two.

---

## Political donations — Level A, correlation only

OCPF records for donations by individuals employed by the ACLU: $59,185 across 519
donations. These are **individual** contributions reported to OCPF, not organisational
spending.

The rise from $825 (2019) to $11,616 (2022) is presented as a sequence of events. Nothing in
the data establishes that the donations caused any policy outcome, and this repo does not
claim they did.

---

## State comparison table — Level C, methodologically mixed

The state-by-state table draws its non-Massachusetts figures from FAIR's 2023 national study
and CBO shelter-cost reporting, while the Massachusetts row uses this project's own FY25
estimate. **These are different methodologies and different years**, so the table shows
relative scale only. Per-capita figures across rows are not strictly comparable.

---

## Reproducing everything

```bash
python scripts/analyze_csv.py      # totals by vendor, FY, appropriation, object class, fund
python scripts/classify_tiers.py   # evidence tiers -> data/tiers.json
python scripts/build_payload.py    # dashboard payload -> data/payments.json
```

The dashboard's "Explore the Data" tab computes its totals in the browser from
`data/payments.json`. No figure on that tab is hard-coded, so if the CSV changes, the
displayed totals change with it.

---

## Known gaps

- No FY26/FY27 payment records yet — the checkbook data ends February 2026.
- Shelter cost per family is not broken out by immigration status in any public source; the
  state does not publish it.
- The 25,000-student figure underpinning the education estimate has no primary-source
  citation in the CIS report.
- RAFT and MRVP are counted as housing aid generally, not as immigrant spending; they are
  shown for budget context only.
