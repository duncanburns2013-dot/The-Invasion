# Massachusetts Immigrant Spending Audit

A comprehensive data-driven analysis of Massachusetts taxpayer spending on immigrant services, shelter, education, and related programs.

## Key Findings

| Metric | Amount | Source |
|--------|--------|--------|
| **Total Annual Cost (FY25)** | $1.88 Billion | Combined sources |
| **Cost Per Taxpayer/Year** | $537 | $1.88B ÷ 3.5M filers |
| **Cost Per Household/Year** | $671 | $1.88B ÷ 2.8M households |
| **Two-Year Total (FY24+FY25)** | $3.1 Billion | Combined sources |

### Cost Breakdown by Category

| Category | FY25 Amount | Source |
|----------|-------------|--------|
| Emergency Shelter System | $1.06B | MA Executive Office of Housing, Boston Herald |
| Education (K-12) | $575M | CIS Study (25K students × $23K/student) |
| Wraparound Services | $150M | State biweekly report (legal aid, case mgmt) |
| Healthcare/MassHealth | $95M | CIS estimate ($3,800/person) |

### Shelter Spending Trend

| Fiscal Year | Amount | Source |
|-------------|--------|--------|
| FY22 | $150M | State reports |
| FY23 | $350M | State reports |
| FY24 | $856M | Boston Herald (actual) |
| FY25 | $1.06B | State projection ($830M spent as of June) |

## Data Sources

### Primary Data (User-Uploaded)
- **MA State Checkbook**: $2.48B total (46,921 transactions from Executive Office of Housing and Livable Communities)
- **Immigrant-Filtered Vendors**: $228.6M across 28 organizations
- **OCPF Data**: ACLU employee political donations ($59,185 / 519 donations)
- **Lobbyist Registry**: MIRA Coalition lobbying records ($87,548)

### Secondary Sources
- [Boston Herald](https://www.bostonherald.com/2025/03/04/mass-spending-on-shelters-housing-migrants-locals-hits-half-a-billion-in-fy25-data-shows/) - Shelter spending reports
- [Center for Immigration Studies](https://cis.org/Report/Massachusetts-Case-Study-Mass-Immigration-and-Welfare-State) - Education and healthcare cost estimates
- [MA Executive Office of Housing](https://www.mass.gov/orgs/executive-office-of-housing-and-livable-communities) - Biweekly shelter reports
- [Fox News](https://www.foxnews.com/politics/migrant-influx-pushing-mass-shelter-costs-past-1b-fy25-report) - FY25 projections

## Files

### Dashboard
- `ma-immigrant-audit.html` - Interactive dashboard (standalone HTML)
- `MA_Audit_Final.jsx` - React component version

### Social Media
- `social-card.html` - 1200×630 social sharing card
- `social_card.jsx` - React version

### Raw Data
- `checkbook_data_*.csv` - MA State Checkbook exports (17 files, $2.48B total)
- `immigrant_orgs_FILTERED.csv` - Filtered immigrant-related vendors ($228.6M)
- `ocpf-output.txt` - ACLU political donation records
- `Lobbyist_Public_Search*.pdf` - MIRA lobbying filings

## Key Organizations Analyzed

### MIRA Coalition (Massachusetts Immigrant & Refugee Advocacy)
- **Contracts**: $7,662,233 (293 payments)
- **Lobbying**: $87,548 (registered lobbyists 2022-2025)
- **Conflict**: Receives contracts from same agencies they lobby

### Top Contract Recipients
| Organization | Amount | Type |
|--------------|--------|------|
| East Boston Neighborhood Health | $59.2M | Health Center (72% MassHealth) |
| Brockton Neighborhood Health | $58.6M | Health Center (80% MassHealth) |
| NeighborHealth Corp | $45.4M | Health Center (95% MassHealth) |
| RIAC | $17.1M | Refugee Services |
| IFSI | $14.5M | Immigrant Services |
| MIRA Coalition | $7.66M | Advocacy + Lobbying |

### Shelter Infrastructure Vendors
| Vendor | Total | Immigrant % | Purpose |
|--------|-------|-------------|---------|
| Accenture LLP | $26.0M | 50.6% | IT systems for shelter tracking |
| UMass | $12.6M | 100% | Emergency shelter operations |
| Internal Security | $7.1M | 100% | Security guards at shelters |
| TransPerfect | $6.9M | 100% | Translation services |

## ACLU → Politicians

$59,185 in donations from ACLU employees to MA politicians (519 donations)

| Recipient | Amount | Role |
|-----------|--------|------|
| Michelle Wu | $3,215 | Boston Mayor (Sanctuary City) |
| Maura Healey | $2,370 | Governor |
| Andrea Campbell | $1,775 | Attorney General |
| Aaron Michlewitz | $1,550 | House Ways & Means Chair |
| Karen Spilka | $1,200 | Senate President |

Donations spiked 14x from 2019 ($825) to 2022 ($11,616) during migrant influx.

## Methodology

1. **Checkbook Analysis**: Downloaded complete MA State Checkbook data for Executive Office of Housing and Livable Communities
2. **Vendor Filtering**: Identified 28 immigrant-related vendors by name/mission
3. **MassHealth Separation**: Distinguished healthcare billing (67%) from actual immigrant programs (33%)
4. **State Report Integration**: Combined checkbook data with official state shelter cost reports
5. **Cost Estimation**: Applied CIS study methodology for education and healthcare costs
6. **Lobbying Cross-Reference**: Matched contract recipients with registered lobbyist filings
7. **Political Donation Analysis**: Analyzed OCPF records for ACLU employee contributions

## License

Data sourced from public records. Analysis and visualization code is open source.

## Contributing

Pull requests welcome. Please cite sources for any data additions.
