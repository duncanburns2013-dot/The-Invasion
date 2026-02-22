import React from 'react';

const SocialCard = () => {
  return (
    <div style={{
      width: '1200px',
      height: '630px',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0508 50%, #0a0a0f 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#fff',
      padding: '48px 64px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      
      {/* Top badge */}
      <div>
        <div style={{
          display: 'inline-block',
          backgroundColor: '#ef4444',
          color: '#000',
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '800',
          letterSpacing: '2px',
          marginBottom: '20px',
        }}>
          MASSACHUSETTS DATA
        </div>
        <h1 style={{
          fontSize: '56px',
          fontWeight: '800',
          margin: '0 0 8px 0',
          background: 'linear-gradient(90deg, #ef4444, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          The Invasion: The Taxpayer Cost
        </h1>
        <p style={{ fontSize: '22px', color: '#a1a1aa', margin: 0 }}>
          What Massachusetts taxpayers are paying for shelter, education, and services
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{
          flex: 1,
          backgroundColor: 'rgba(239,68,68,0.1)',
          border: '2px solid #ef4444',
          borderRadius: '16px',
          padding: '28px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '14px', color: '#ef4444', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px' }}>
            ANNUAL COST (FY25)
          </div>
          <div style={{ fontSize: '64px', fontWeight: '800', color: '#ef4444', lineHeight: 1 }}>
            $1.88B
          </div>
        </div>

        <div style={{
          flex: 1,
          backgroundColor: 'rgba(245,158,11,0.1)',
          border: '2px solid #f59e0b',
          borderRadius: '16px',
          padding: '28px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '14px', color: '#f59e0b', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px' }}>
            PER TAXPAYER/YEAR
          </div>
          <div style={{ fontSize: '64px', fontWeight: '800', color: '#f59e0b', lineHeight: 1 }}>
            $537
          </div>
        </div>

        <div style={{
          flex: 1,
          backgroundColor: 'rgba(34,197,94,0.1)',
          border: '2px solid #22c55e',
          borderRadius: '16px',
          padding: '28px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '14px', color: '#22c55e', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px' }}>
            TWO-YEAR TOTAL
          </div>
          <div style={{ fontSize: '64px', fontWeight: '800', color: '#22c55e', lineHeight: 1 }}>
            $3.1B
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: '14px', color: '#71717a' }}>
          Sources: MA State Checkbook, Boston Herald, CIS Study, OCPF
        </div>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: '700',
          color: '#a1a1aa',
        }}>
          Massachusetts Data Hub
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
