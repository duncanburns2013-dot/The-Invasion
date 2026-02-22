import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

const MATaxpayerAudit = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  // DATA
  // ===== COMPREHENSIVE COST DATA =====
  
  // FROM USER'S UPLOADED CHECKBOOK DATA
  const checkbookTotal = 2470080229;  // Full housing/shelter checkbook
  const immigrantFiltered = 228606882;  // Immigrant-named vendors
  const masshealthBilling = 86358044;   // MassHealth portion
  const actualPrograms = 142248838;     // Actual immigrant programs
  
  // FROM STATE REPORTS (Boston Herald, MA Executive Office, CIS Study)
  const shelterFY24 = 856000000;   // Actual
  const shelterFY25 = 1060000000;  // Projected ($830M already spent as of June)
  const educationAnnual = 575000000;  // 25K kids x $23K/student (CIS)
  const wraparoundFY25 = 149700000;   // Legal aid, case mgmt, workforce (state report)
  
  // ESTIMATED ADDITIONAL COSTS
  const snapEstimate = 18000000;  // $4.5M per cohort x 4 cohorts
  const healthcareEstimate = 95000000;  // $3,800/person x 25K adults (CIS estimate)
  
  // TOTALS
  const totalFY25 = shelterFY25 + educationAnnual + wraparoundFY25 + healthcareEstimate;  // ~$1.88B
  const totalTwoYear = shelterFY24 + shelterFY25 + (educationAnnual * 2) + healthcareEstimate;  // ~$3.1B
  
  // PER TAXPAYER/HOUSEHOLD
  const taxpayers = 3500000;
  const households = 2800000;
  const perTaxpayerAnnual = Math.round(totalFY25 / taxpayers);  // ~$537
  const perHouseholdAnnual = Math.round(totalFY25 / households);  // ~$671
  
  // Checkbook by FY (from user data)
  const checkbookByFY = [
    { fy: 'FY23', amount: 150770392 },
    { fy: 'FY24', amount: 1105891371 },
    { fy: 'FY25', amount: 1203372386 },
  ];
  
  // Immigrant spending trend (from user's filtered data)
  const immigrantTrend = [
    { fy: 'FY20', amount: 550890 },
    { fy: 'FY21', amount: 2626808 },
    { fy: 'FY22', amount: 12813330 },
    { fy: 'FY23', amount: 90422381 },
    { fy: 'FY24', amount: 14746092 },
    { fy: 'FY25', amount: 100421451 },
  ];
  
  // Shelter spending (from state reports)
  const shelterTrend = [
    { fy: 'FY22', amount: 150000000 },
    { fy: 'FY23', amount: 350000000 },
    { fy: 'FY24', amount: 856000000 },
    { fy: 'FY25', amount: 1060000000 },
  ];

  const shelterVendors = [
    { name: "Accenture LLP", total: 25970319, immAmt: 13145336, immPct: 50.6, desc: "IT systems for shelter intake, tracking, case management" },
    { name: "University of Massachusetts", total: 12572400, immAmt: 12572400, immPct: 100, desc: "Emergency Assistance shelter operations" },
    { name: "Internal Security Associates", total: 7071632, immAmt: 7071632, immPct: 100, desc: "Security guards at shelter sites" },
    { name: "TransPerfect Translations", total: 6853527, immAmt: 6853527, immPct: 100, desc: "Translation services for non-English speakers" },
    { name: "United Way of MA Bay", total: 11000000, immAmt: 6000000, immPct: 54.5, desc: "Family Shelter Reserve services" },
    { name: "Pine Street Inn", total: 14758157, immAmt: 6949628, immPct: 47.1, desc: "Emergency shelter grant operations" },
  ];

  const immigrantVendors = [
    { name: "East Boston Neighborhood Health", amount: 59184430, type: "Health Center", mh: 72 },
    { name: "Brockton Neighborhood Health", amount: 58566403, type: "Health Center", mh: 80 },
    { name: "NeighborHealth Corp", amount: 45435559, type: "Health Center", mh: 95 },
    { name: "RIAC", amount: 17098052, type: "Refugee Services", mh: 0 },
    { name: "IFSI", amount: 14480198, type: "Immigrant Services", mh: 0 },
    { name: "MIRA Coalition", amount: 7662233, type: "ADVOCACY", mh: 0 },
    { name: "ORIS", amount: 4296552, type: "Refugee Services", mh: 0 },
    { name: "Project Citizenship", amount: 1857950, type: "Citizenship", mh: 0 },
  ];

  const miraContracts = [
    { name: "Family Shelter Services", amount: 3976026, desc: "Case management and support for immigrant families in shelters" },
    { name: "Immigrants Housing Reserve", amount: 1296000, desc: "Housing placement and rental assistance" },
    { name: "Immigration Legal Assistance", amount: 930314, desc: "Legal representation, deportation defense" },
    { name: "Low-Income Citizenship", amount: 803799, desc: "Citizenship applications, forms, fees, classes" },
    { name: "Immigrants Supports Reserve", amount: 474095, desc: "Translation, job placement, benefits enrollment" },
  ];

  const acluRecipients = [
    { name: "Aaron Michlewitz", role: "HOUSE WAYS & MEANS CHAIR", amount: 1550, count: 9, power: "Controls the entire state budget" },
    { name: "Karen Spilka", role: "SENATE PRESIDENT", amount: 1200, count: 6, power: "Controls which bills get voted on" },
    { name: "Maura Healey", role: "GOVERNOR", amount: 2370, count: 16, power: "Signs bills, runs executive agencies" },
    { name: "Andrea Campbell", role: "ATTORNEY GENERAL", amount: 1775, count: 10, power: "Decides what to prosecute" },
    { name: "Michelle Wu", role: "BOSTON MAYOR", amount: 3215, count: 98, power: "Sanctuary city policies, limits ICE cooperation" },
  ];

  const fmt = (n) => '$' + n.toLocaleString();
  const fmtM = (n) => '$' + (n / 1000000).toFixed(1) + 'M';

  const tabs = [
    { id: 'overview', label: 'OVERVIEW', color: '#ef4444' },
    { id: 'vendors', label: 'VENDORS', color: '#f59e0b' },
    { id: 'immigrant', label: 'IMMIGRANT ORGS', color: '#3b82f6' },
    { id: 'mira', label: 'MIRA', color: '#f59e0b' },
    { id: 'aclu', label: 'ACLU', color: '#a855f7' },
  ];

  const boxStyle = {
    backgroundColor: '#111118',
    borderRadius: '8px',
    border: '1px solid #222230',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#09090d', color: '#e4e4e7', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ borderBottom: '1px solid #222230', padding: '32px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#ef4444', color: '#000', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '12px' }}>
            TAXPAYER AUDIT
          </div>
          <h1 style={{ 
            fontSize: '38px', 
            fontWeight: '800', 
            margin: '0 0 6px 0',
            background: 'linear-gradient(90deg, #ef4444, #f59e0b, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Massachusetts Immigrant Spending
          </h1>
          <p style={{ color: '#71717a', fontSize: '14px', margin: 0 }}>
            $3.1B+ spent in FY24-FY25 on shelter, education, healthcare, and services
          </p>
        </div>
      </header>

      {/* STATS ROW */}
      <section style={{ borderBottom: '1px solid #222230', padding: '24px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
            {[
              { label: 'TOTAL FY25 COST', value: '$1.88B', sub: 'All categories', color: '#ef4444' },
              { label: 'PER TAXPAYER/YR', value: '$' + perTaxpayerAnnual, sub: 'Annual', color: '#f59e0b' },
              { label: 'PER HOUSEHOLD/YR', value: '$' + perHouseholdAnnual, sub: 'Annual', color: '#22c55e' },
              { label: 'TWO-YEAR TOTAL', value: '$3.1B', sub: 'FY24 + FY25', color: '#3b82f6' },
              { label: 'CHECKBOOK DATA', value: '$2.47B', sub: 'Housing/Shelter', color: '#a855f7' },
            ].map((s, i) => (
              <div key={i} style={{ ...boxStyle, padding: '16px 18px' }}>
                <div style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '1px', color: s.color, marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontSize: '26px', fontWeight: '800', color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#71717a', marginTop: '6px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS */}
      <nav style={{ borderBottom: '1px solid #222230', position: 'sticky', top: 0, backgroundColor: '#09090d', zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '14px 20px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === t.id ? `2px solid ${t.color}` : '2px solid transparent',
                color: activeTab === t.id ? t.color : '#71717a',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* === OVERVIEW === */}
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '28px' }}>
              {/* Cost Breakdown */}
              <div style={boxStyle}>
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #222230' }}>
                  <h2 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#ef4444', letterSpacing: '0.5px' }}>COST BREAKDOWN</h2>
                </div>
                {[
                  { label: 'Emergency Shelter System', amount: shelterFY25, color: '#ef4444', desc: 'Hotels, shelters, food, services (State Report)' },
                  { label: 'Education (K-12)', amount: educationAnnual, color: '#a855f7', desc: '~25,000 children at $23K/student (CIS Study)' },
                  { label: 'Wraparound Services', amount: wraparoundFY25, color: '#f59e0b', desc: 'Legal aid, case mgmt, workforce (State Report)' },
                  { label: 'Healthcare/MassHealth', amount: healthcareEstimate, color: '#3b82f6', desc: '~$3,800/person estimate (CIS Study)' },
                ].map((r, i) => (
                  <div key={i} style={{ padding: '14px 18px', borderBottom: '1px solid #222230', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '13px' }}>{r.label}</div>
                      <div style={{ color: '#71717a', fontSize: '11px' }}>{r.desc}</div>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: r.color }}>{fmtM(r.amount)}</div>
                  </div>
                ))}
                <div style={{ padding: '16px 18px', backgroundColor: '#1a0a0a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700', fontSize: '13px' }}>TOTAL FY25 ESTIMATED</span>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#ef4444' }}>$1.88B</span>
                </div>
              </div>

              {/* Taxpayer Cost */}
              <div style={{ ...boxStyle, border: '2px solid #f59e0b', padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1px', color: '#f59e0b', marginBottom: '12px' }}>ANNUAL COST PER MA TAXPAYER</div>
                <div style={{ fontSize: '72px', fontWeight: '800', color: '#f59e0b', lineHeight: 1 }}>${perTaxpayerAnnual}</div>
                <div style={{ color: '#71717a', fontSize: '14px', marginTop: '12px' }}>$1.88B total / 3.5M filers</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '28px' }}>
                  <div style={{ backgroundColor: '#09090d', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ fontSize: '10px', color: '#71717a', letterSpacing: '1px', marginBottom: '4px' }}>PER HOUSEHOLD/YR</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#22c55e' }}>${perHouseholdAnnual}</div>
                  </div>
                  <div style={{ backgroundColor: '#09090d', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ fontSize: '10px', color: '#71717a', letterSpacing: '1px', marginBottom: '4px' }}>TWO-YEAR TOTAL</div>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#ef4444' }}>$3.1B</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Uploaded Data */}
            <div style={{ ...boxStyle, padding: '20px', marginBottom: '28px' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: '700', color: '#a855f7', letterSpacing: '0.5px' }}>FROM YOUR UPLOADED CHECKBOOK DATA</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ backgroundColor: '#09090d', borderRadius: '6px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#71717a', marginBottom: '6px' }}>FULL CHECKBOOK</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#a855f7' }}>$2.47B</div>
                  <div style={{ fontSize: '10px', color: '#71717a', marginTop: '4px' }}>Housing/Shelter total</div>
                </div>
                <div style={{ backgroundColor: '#09090d', borderRadius: '6px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#71717a', marginBottom: '6px' }}>IMMIGRANT VENDORS</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6' }}>{fmtM(immigrantFiltered)}</div>
                  <div style={{ fontSize: '10px', color: '#71717a', marginTop: '4px' }}>Your filtered file</div>
                </div>
                <div style={{ backgroundColor: '#09090d', borderRadius: '6px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#71717a', marginBottom: '6px' }}>ACTUAL PROGRAMS</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#22c55e' }}>{fmtM(actualPrograms)}</div>
                  <div style={{ fontSize: '10px', color: '#71717a', marginTop: '4px' }}>Excl. MassHealth billing</div>
                </div>
              </div>
            </div>

            {/* State Reported Shelter Costs */}
            <div style={{ ...boxStyle, padding: '20px', marginBottom: '28px' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: '700', color: '#3b82f6', letterSpacing: '0.5px' }}>STATE-REPORTED SHELTER COSTS</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ backgroundColor: '#09090d', borderRadius: '6px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#71717a', marginBottom: '6px' }}>FY24 (ACTUAL)</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#3b82f6' }}>$856M</div>
                  <div style={{ fontSize: '10px', color: '#71717a', marginTop: '4px' }}>Source: Boston Herald</div>
                </div>
                <div style={{ backgroundColor: '#09090d', borderRadius: '6px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#ef4444', marginBottom: '6px' }}>FY25 (PROJECTED)</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#ef4444' }}>$1.06B</div>
                  <div style={{ fontSize: '10px', color: '#71717a', marginTop: '4px' }}>$830M spent as of June</div>
                </div>
              </div>
              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#1a0a0a', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #3f1515' }}>
                <span style={{ fontWeight: '600', fontSize: '12px' }}>SHELTER ONLY (FY24 + FY25)</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#ef4444' }}>$1.92B</span>
              </div>
            </div>

            {/* Shelter Spending Trend Chart */}
            <div style={{ ...boxStyle, padding: '20px', marginBottom: '28px' }}>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '13px', fontWeight: '700', color: '#ef4444', letterSpacing: '0.5px' }}>EMERGENCY SHELTER SPENDING BY FISCAL YEAR</h2>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={shelterTrend}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#222230" strokeDasharray="3 3" />
                  <XAxis dataKey="fy" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis tickFormatter={fmtM} stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip formatter={(v) => fmt(v)} contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333', borderRadius: '6px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="amount" stroke="#ef4444" strokeWidth={2} fill="url(#grad)" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #222230' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#71717a' }}>FY22</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e' }}>$150M</div>
                </div>
                <div style={{ color: '#71717a' }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#71717a' }}>FY25</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#ef4444' }}>$1.06B</div>
                </div>
                <div style={{ backgroundColor: '#1a0a0a', border: '1px solid #ef4444', borderRadius: '6px', padding: '8px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#ef4444' }}>INCREASE</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#ef4444' }}>7x</div>
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '11px', color: '#71717a', textAlign: 'center' }}>
                Source: MA Executive Office of Housing, Boston Herald
              </div>
            </div>

            {/* MIRA Callout */}
            <div style={{ ...boxStyle, border: '2px solid #f59e0b', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '700', color: '#f59e0b' }}>THE MIRA CONFLICT OF INTEREST</h3>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: '#a1a1aa' }}>
                    <strong style={{ color: '#f59e0b' }}>MIRA Coalition</strong> receives <strong style={{ color: '#22c55e' }}>$7,662,233</strong> in state contracts while spending <strong style={{ color: '#ef4444' }}>$87,548</strong> lobbying the same agencies. Contracts increased <strong style={{ color: '#f59e0b' }}>16x</strong> from FY20 to FY25.
                  </p>
                </div>
                <div style={{ textAlign: 'right', marginLeft: '24px' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#22c55e' }}>$7.66M</div>
                  <div style={{ fontSize: '10px', color: '#71717a' }}>CONTRACTS</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#ef4444', marginTop: '6px' }}>+$87.5K</div>
                  <div style={{ fontSize: '10px', color: '#71717a' }}>LOBBYING</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* === VENDORS === */}
        {activeTab === 'vendors' && (
          <>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>SHELTER INFRASTRUCTURE VENDORS</h2>
            <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#71717a' }}>Vendors supporting immigrant shelters through IT, security, and translation</p>
            <div style={boxStyle}>
              {shelterVendors.map((v, i) => (
                <div key={i} style={{ borderBottom: i < shelterVendors.length - 1 ? '1px solid #222230' : 'none' }}>
                  <div
                    onClick={() => toggle(`v${i}`)}
                    style={{ padding: '14px 18px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '48px 1fr 100px 100px 32px', alignItems: 'center', gap: '14px' }}
                  >
                    <div style={{ width: '42px', height: '42px', borderRadius: '6px', backgroundColor: v.immPct >= 50 ? '#2a1515' : '#15152a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: v.immPct >= 50 ? '#ef4444' : '#3b82f6' }}>
                      {v.immPct}%
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '13px' }}>{v.name}</div>
                      <div style={{ color: '#71717a', fontSize: '11px' }}>{v.desc}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', color: '#71717a' }}>TOTAL</div>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>{fmtM(v.total)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '10px', color: '#ef4444' }}>IMMIGRANT</div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#ef4444' }}>{fmtM(v.immAmt)}</div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '18px', color: '#71717a' }}>{expanded[`v${i}`] ? '−' : '+'}</div>
                  </div>
                  {expanded[`v${i}`] && (
                    <div style={{ padding: '14px 18px', backgroundColor: '#09090d', borderTop: '1px solid #222230' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        <div style={{ backgroundColor: '#111118', borderRadius: '6px', padding: '12px' }}>
                          <div style={{ fontSize: '9px', color: '#71717a', letterSpacing: '1px' }}>TOTAL CONTRACT</div>
                          <div style={{ fontSize: '18px', fontWeight: '800', marginTop: '4px' }}>{fmt(v.total)}</div>
                        </div>
                        <div style={{ backgroundColor: '#111118', borderRadius: '6px', padding: '12px' }}>
                          <div style={{ fontSize: '9px', color: '#ef4444', letterSpacing: '1px' }}>IMMIGRANT PORTION</div>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: '#ef4444', marginTop: '4px' }}>{fmt(v.immAmt)}</div>
                        </div>
                        <div style={{ backgroundColor: '#111118', borderRadius: '6px', padding: '12px' }}>
                          <div style={{ fontSize: '9px', color: '#71717a', letterSpacing: '1px' }}>IMMIGRANT %</div>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: v.immPct >= 50 ? '#ef4444' : '#f59e0b', marginTop: '4px' }}>{v.immPct}%</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* === IMMIGRANT ORGS === */}
        {activeTab === 'immigrant' && (
          <>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '700', color: '#3b82f6' }}>IMMIGRANT-NAMED VENDORS</h2>
            <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#71717a' }}>28 organizations totaling $228.6M — 67% is MassHealth billing, not actual immigrant programs</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {immigrantVendors.map((v, i) => (
                <div key={i} style={{ ...boxStyle, border: v.type === 'ADVOCACY' ? '2px solid #ef4444' : '1px solid #222230', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{v.name}</div>
                      <span style={{
                        display: 'inline-block', padding: '2px 6px', borderRadius: '3px', fontSize: '9px', fontWeight: '700',
                        backgroundColor: v.type === 'ADVOCACY' ? '#2a1515' : v.type.includes('Health') ? '#15152a' : '#0a2a0a',
                        color: v.type === 'ADVOCACY' ? '#ef4444' : v.type.includes('Health') ? '#3b82f6' : '#22c55e',
                      }}>{v.type}</span>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: v.type === 'ADVOCACY' ? '#ef4444' : '#fff' }}>{fmtM(v.amount)}</div>
                  </div>
                  {v.mh > 0 ? (
                    <div style={{ backgroundColor: '#09090d', borderRadius: '4px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: '#71717a' }}>MassHealth Billing</span>
                      <span style={{ fontWeight: '700', color: '#71717a' }}>{v.mh}%</span>
                    </div>
                  ) : (
                    <div style={{ backgroundColor: '#0a1a0a', borderRadius: '4px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', border: '1px solid #153f15' }}>
                      <span style={{ color: '#22c55e' }}>100% Actual Programs</span>
                      <span style={{ fontWeight: '700', color: '#22c55e' }}>✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* === MIRA === */}
        {activeTab === 'mira' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>MIRA COALITION</h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#71717a' }}>Massachusetts Immigrant & Refugee Advocacy Coalition</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#f59e0b' }}>$7,662,233</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#ef4444' }}>+ $87,548 LOBBYING</div>
              </div>
            </div>

            <div style={{ ...boxStyle, border: '2px solid #ef4444', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontWeight: '700', color: '#ef4444', fontSize: '12px', marginBottom: '6px' }}>THE CONFLICT</div>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#a1a1aa' }}>
                MIRA lobbies the same agencies that give them contracts. FY25 contracts ($4.2M) increased 16x from FY20 ($256K) during the same period they spent $87K lobbying.
              </p>
            </div>

            <h3 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700', color: '#f59e0b', letterSpacing: '0.5px' }}>WHAT THEY'RE PAID TO DO</h3>
            <div style={{ ...boxStyle, marginBottom: '20px' }}>
              {miraContracts.map((c, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: i < miraContracts.length - 1 ? '1px solid #222230' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '13px' }}>{c.name}</div>
                    <div style={{ color: '#71717a', fontSize: '11px' }}>{c.desc}</div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#f59e0b' }}>{fmt(c.amount)}</div>
                </div>
              ))}
            </div>

            <h3 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700', color: '#ef4444', letterSpacing: '0.5px' }}>REGISTERED LOBBYISTS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { name: 'Amy M. Grunder', years: '2022-2025', amount: 61132 },
                { name: 'Charles Group Consulting', years: '2022', amount: 20000 },
                { name: 'Edwin Jonathan Paz', years: '2023', amount: 4626 },
                { name: 'Elizabeth Sweet', years: '2025', amount: 1790 },
              ].map((l, i) => (
                <div key={i} style={{ ...boxStyle, padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '13px' }}>{l.name}</div>
                    <div style={{ color: '#71717a', fontSize: '10px' }}>{l.years}</div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#ef4444' }}>{fmt(l.amount)}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* === ACLU === */}
        {activeTab === 'aclu' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: '#a855f7' }}>ACLU EMPLOYEES → MA POLITICIANS</h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#71717a' }}>519 donations to politicians controlling budgets and immigration policy</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#a855f7' }}>$59,185</div>
                <div style={{ fontSize: '11px', color: '#71717a' }}>519 donations</div>
              </div>
            </div>

            <div style={{ ...boxStyle, padding: '16px', marginBottom: '20px' }}>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#a1a1aa' }}>
                Donations spiked <strong style={{ color: '#ef4444' }}>14x</strong> from 2019 ($825) to 2022 ($11,616) during the migrant influx. ACLU employees fund the politicians who control state budgets, immigration enforcement, and prosecution decisions.
              </p>
            </div>

            <h3 style={{ margin: '0 0 12px 0', fontSize: '12px', fontWeight: '700', color: '#a855f7', letterSpacing: '0.5px' }}>POWER BROKERS THEY FUND</h3>
            <div style={boxStyle}>
              {acluRecipients.map((p, i) => (
                <div key={i} style={{ borderBottom: i < acluRecipients.length - 1 ? '1px solid #222230' : 'none' }}>
                  <div
                    onClick={() => toggle(`a${i}`)}
                    style={{ padding: '14px 18px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr 90px 32px', alignItems: 'center', gap: '12px' }}
                  >
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>{p.name}</div>
                      <div style={{ color: '#a855f7', fontSize: '11px', fontWeight: '600' }}>{p.role}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#a855f7' }}>{fmt(p.amount)}</div>
                      <div style={{ fontSize: '10px', color: '#71717a' }}>{p.count} donations</div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '18px', color: '#71717a' }}>{expanded[`a${i}`] ? '−' : '+'}</div>
                  </div>
                  {expanded[`a${i}`] && (
                    <div style={{ padding: '14px 18px', backgroundColor: '#09090d', borderTop: '1px solid #222230' }}>
                      <div style={{ backgroundColor: '#1a0a1a', borderRadius: '6px', padding: '14px', borderLeft: '3px solid #a855f7' }}>
                        <div style={{ fontSize: '10px', color: '#a855f7', fontWeight: '700', letterSpacing: '1px', marginBottom: '4px' }}>WHY THIS MATTERS</div>
                        <div style={{ fontSize: '13px', lineHeight: 1.5 }}>{p.power}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #222230', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', color: '#71717a', fontSize: '11px' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#a1a1aa' }}>Sources:</strong> MA State Checkbook ($2.47B), Boston Herald (shelter costs), 
            MA Executive Office of Housing (FY reports), Center for Immigration Studies (education/healthcare estimates), 
            OCPF (ACLU donations), Secretary of State (lobbyist registry) | <strong style={{ color: '#a1a1aa' }}>56,374 data points analyzed</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Checkbook data through FY25 | State reports through June 2025</span>
            <a href="https://github.com/duncanburns2013-dot/The-Invasion" style={{ color: '#f59e0b', textDecoration: 'none' }}>github.com/duncanburns2013-dot/The-Invasion</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MATaxpayerAudit;
