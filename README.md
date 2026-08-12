# Massachusetts Immigrant Spending Audit

**Live dashboard:** https://duncanburns2013-dot.github.io/The-Invasion/

A data-driven audit of Massachusetts taxpayer spending on shelter, rental assistance and
immigrant services — built from state payment records, enacted budget line items and
official shelter reports.

> **Last data review:** August 2026 · FY27 budget signed 9 July 2026 · payment records run
> through February 2026.

---

## The current story: the money moved, it didn't leave

Emergency shelter spending has fallen sharply as the caseload dropped. At the same time,
**HomeBASE** — the rental-assistance program that moves families *out* of shelter — has grown
in the opposite direction.

| Line item | FY26 enacted | FY27 enacted | Change |
|---|---|---|---|
| Emergency Assistance family shelter (7004-0101) | $276M | **$259.9M** | ↓ 6% |
| HomeBASE (7004-0108) | ~$57M | **$82.3M** | ↑ 44% |
| RAFT rental/mortgage aid (7004-9316) | — | $209M | — |
| MRVP rental vouchers (7004-9024) | — | $278.3M | ↑ 10% |

HomeBASE pays up to **$30,000 per family over two years**. Enrolment rose from roughly
1,500 families in early 2023 to over 7,700 by 2025, and annual spending went from $12M to
$101M — a **718% increase** — while the shelter budget was being cut.

Shelter caseload has fallen below 5,000 families (first time since July 2023) to roughly
4,800 as of May 2026, and the state is shrinking the system toward ~3,200 units.

---

## Headline cost figures (FY25 peak)

| Metric | Amount | Basis |
|---|---|---|
| Total annual cost, FY25 | $1.88B | Combined — see confidence note below |
| **Documented portion** | **$1.21B** | Shelter + wraparound, from state reports |
| *Estimated portion* | *$670M* | *Education + healthcare, modelled by CIS* |
| Two-year total (FY24+FY25) | $3.1B | Combined |

### Confidence note — read this before quoting the $1.88B

The $1.88B blends two very different kinds of evidence:

- **Documented ($1.21B)** — emergency shelter ($1.06B) and wraparound services ($150M),
  drawn from state budget reports and payment records.
- **Estimated ($670M)** — K-12 education ($575M, 25,000 students × $23,000) and healthcare
  ($95M, $3,800/person) are **modelled figures from the Center for Immigration Studies**, an
  advocacy organisation. They rest on assumptions about student counts and per-capita cost,
  not on audited spending.

The dashboard's calculator lets you switch between the two bases. Quoting the documented
$1.21B is the more defensible claim.

---

## The checkbook data — and an important correction

The repo ships `immigrant_orgs_FILTERED.csv`: **8,883 real payments totalling $228,606,882**
to 28 vendors, October 2019 – February 2026, all from the Executive Office of Health & Human
Services.

**That $228.6M is not $228.6M of immigrant spending.** The vendor list was built by matching
names against substrings — `IMMIGRANT`, `REFUGEE`, `MIRA`, `NEIGHBOR` — and that match is
broad. Re-sorting every payment by what its appropriation actually funds gives:

| Category | Amount | Share |
|---|---|---|
| MassHealth claims / community health centres | $179,338,211 | 78.4% |
| **Immigrant & refugee programs** | **$38,177,054** | **16.7%** |
| **Family shelter & housing reserves** | **$8,582,543** | **3.8%** |
| Name-match false positives | $2,509,074 | 1.1% |
| **Defensible core (immigrant + shelter)** | **$46,759,597** | **20.5%** |

What the filter caught by accident:

- The three largest "immigrant vendors" — East Boston Neighborhood Health Center ($59.2M),
  Brockton Neighborhood Health Center ($58.6M) and NeighborHealth ($45.4M) — matched on
  **NEIGHBOR**. They are federally qualified health centres billing MassHealth for all
  patients, not immigrant programs. The single largest appropriation in the whole file is
  **MassHealth Senior Care ($83.5M, 36.5%)**.
- `MIRA` matched a dentist (**Paul F. Miraglia D.D.S.**), a daycare (**Mini Miracles**),
  **Amirah Inc**, and two individuals (**Kristina Miranda**, **Miranda Y Chen**).

The genuinely immigrant-specific spending is smaller but far harder to dispute. The
**Office for Refugees and Immigrants** received **$45.2M** across the period; the
Low-Income Citizenship Program is $17.9M; resettlement agencies $3.7M; Afghan refugee
services $2.7M.

Reproduce any of this yourself:

```bash
python scripts/analyze_csv.py      # raw totals by vendor, FY, appropriation, fund
python scripts/classify_tiers.py   # evidence-tier breakdown -> data/tiers.json
python scripts/build_payload.py    # compact JSON the dashboard reads -> data/payments.json
```

---

## Key organizations

### MIRA Coalition (Massachusetts Immigrant & Refugee Advocacy)

| | |
|---|---|
| State contracts | $7,662,233 (293 payments) |
| Registered lobbying | $87,548 (2022–2025) |
| Contract growth | FY20 $256K → FY25 $4.2M |

MIRA is paid by the same agencies it is registered to lobby. Contract breakdown: family
shelter services $3.98M, immigrants housing reserve $1.30M, immigration legal assistance
$930K, low-income citizenship $804K, immigrant supports reserve $474K.

Registered lobbyists: Amy M. Grunder ($61,132, 2022–25), Charles Group Consulting ($20,000,
2022), Edwin Jonathan Paz ($4,626, 2023), Elizabeth Sweet ($1,790, 2025).

### ACLU employee political donations

$59,185 across 519 donations from ACLU employees to Massachusetts politicians. Top
recipients: Michelle Wu ($3,215), Maura Healey ($2,370), Andrea Campbell ($1,775), Aaron
Michlewitz ($1,550), Karen Spilka ($1,200). Annual totals rose from $825 in 2019 to $11,616
in 2022.

*These are donations by individuals who work at the ACLU, reported to OCPF. They are not
organizational contributions, and the timing is presented as a sequence of events, not as
evidence that one caused the other.*

---

## Repo contents

| File | What it is |
|---|---|
| `index.html` | The dashboard (standalone, no build step) |
| `data/payments.json` | Compact payment data the dashboard reads (338 KB, generated) |
| `data/tiers.json` | Evidence-tier rollup (generated) |
| `immigrant_orgs_FILTERED.csv` | Source payment records, 8,883 rows |
| `ocpf-output.txt` | ACLU employee donation records from OCPF |
| `scripts/*.py` | Reproducible analysis — see commands above |
| `MA_Audit_Final.jsx` | React port of an earlier version of the dashboard |
| `social-card.html`, `social_card.jsx`, `social-card.jpg` | 1200×630 sharing card |
| `DATA_SUMMARY.md` | Full figure-by-figure summary with sources |
| `METHODOLOGY.md` | How each number was derived, and its confidence level |

---

## Sources

- FY27 General Appropriations Act, signed 9 July 2026 ($63.42B) — [Mass.gov budget](https://budget.digital.mass.gov/)
- [MassBudget in-depth analysis of the FY27 GAA](https://massbudget.org/2026/07/21/massbudget-in-depth-analysis-of-fy-2027-gaa/)
- [MAPC FY27 budget summary](https://www.mapc.org/planning101/update-on-the-fy27-budget-2/)
- [MA Executive Office of Housing and Livable Communities](https://www.mass.gov/orgs/executive-office-of-housing-and-livable-communities) — biweekly shelter reports
- [Mass.gov: families in shelter falls below 5,000](https://www.mass.gov/news/number-of-families-in-shelter-falls-below-5000-following-governor-healeys-reforms)
- [WBUR: further cuts to emergency family shelter](https://www.wbur.org/news/2026/03/11/massachusetts-shelter-system-more-cuts-restrictions-hearing)
- [Boston Herald: shelter/housing spending, March 2025](https://www.bostonherald.com/2025/03/04/mass-spending-on-shelters-housing-migrants-locals-hits-half-a-billion-in-fy25-data-shows/)
- [Center for Immigration Studies: Massachusetts case study](https://cis.org/Report/Massachusetts-Case-Study-Mass-Immigration-and-Welfare-State) — *advocacy source; education and healthcare estimates*
- MA Statewide payment records (CTHRU), OCPF campaign finance, Secretary of State lobbyist registry

---

## Corrections

Found an error? Open an issue with the figure, the source you checked it against, and where
it appears. Corrections are applied and noted rather than quietly edited.

## License

Analysis and visualization code released under the MIT License (see `LICENSE`). Underlying
data is public record.
