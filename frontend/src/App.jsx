import React, { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({ electricityKwh: '', transportKm: '', vehicleType: 'petrol' });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsAnimated(false);
    
    try {
      const res = await fetch('http://localhost:5000/api/v1/carbon/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      setData(result);
      // Data aane ke baad animation trigger karne ke liye chota sa timeout
      setTimeout(() => setIsAnimated(true), 50);
    } catch (err) {
      alert("Backend running nahi hai port 5000 par!");
    } {
      setLoading(false);
    }
  };

  // UI calculations helper variables
  const elecPercentage = data ? Math.min(100, Math.round((data.breakdown.electricity / data.summary.totalEmissions) * 100)) : 0;
  const transPercentage = data ? (100 - elecPercentage) : 0;

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh' }}>
      
      {/* Global CSS for Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(5, 150, 105, 0); }
          100% { box-shadow: 0 0 0 0 rgba(5, 150, 105, 0); }
        }
        .animate-fade-in { animation: fadeInUp 0.5s ease forward; }
        .pulse-btn:hover { animation: pulseGlow 1.5s infinite; }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: '#059669', margin: 0, fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          🌱 EcoSphere <span style={{ fontSize: '0.8rem', background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '20px', fontWeight: 'normal' }}>v2.0 Pro</span>
        </h1>
        <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>Advanced Carbon Footprint Tracker & Mitigation Dashboard</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '35px', alignItems: 'start' }}>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '22px', border: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: '1.3rem', margin: 0, color: '#1e293b', fontWeight: '700' }}>Metrics Analyzer</h2>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: '#475569' }}>💡 Monthly Electricity (kWh)</label>
            <input type="number" required value={form.electricityKwh} onChange={e => setForm({...form, electricityKwh: e.target.value})} style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', transition: 'all 0.3s' }} placeholder="e.g. 250"/>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: '#475569' }}>🚗 Monthly Travel Distance (km)</label>
            <input type="number" required value={form.transportKm} onChange={e => setForm({...form, transportKm: e.target.value})} style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', transition: 'all 0.3s' }} placeholder="e.g. 500"/>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: '#475569' }}>🎯 Primary Transport Mode</label>
            <select value={form.vehicleType} onChange={e => setForm({...form, vehicleType: e.target.value})} style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', backgroundColor: '#fff', cursor: 'pointer' }}>
              <option value="petrol">Petrol Car</option>
              <option value="diesel">Diesel Car</option>
              <option value="electric">Electric Vehicle (EV)</option>
              <option value="public">Public Transit (Bus/Train)</option>
            </select>
          </div>

          <button type="submit" className="pulse-btn" style={{ width: '100%', padding: '14px', border: 'none', borderRadius: '12px', backgroundColor: '#059669', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', shadow: '0 4px 12px rgba(5,150,105,0.2)' }}>
            {loading ? 'Processing Insights...' : 'Analyze Impacts'}
          </button>
        </form>

        {/* Dynamic Display */}
        <div>
          {data ? (
            <div style={{ opacity: isAnimated ? 1 : 0, transform: isAnimated ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', backgroundColor: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px', border: '1px solid #f1f5f9' }}>
              
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.3rem', margin: 0, color: '#1e293b', fontWeight: '700' }}>Audit Results</h2>
                <span style={{ fontSize: '0.8rem', padding: '4px 12px', background: data.summary.sustainabilityScore > 75 ? '#d1fae5' : '#fee2e2', color: data.summary.sustainabilityScore > 75 ? '#065f46' : '#991b1b', borderRadius: '12px', fontWeight: '600' }}>
                  {data.summary.sustainabilityScore > 75 ? 'Safe Standing' : 'High Output Alert'}
                </span>
              </div>
              
              {/* Main Score Box */}
              <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '18px', borderLeft: '5px solid #ef4444', position: 'relative', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold', trackingWide: '1px' }}>Monthly Carbon Output</span>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '2.2rem', color: '#0f172a', fontWeight: '800' }}>
                  {data.summary.totalEmissions} <span style={{ fontSize: '1.1rem', fontWeight: '500', color: '#64748b' }}>kg CO2e</span>
                </h3>
              </div>

              {/* Metrics Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Eco Health Score</span>
                  <p style={{ margin: 0, fontWeight: '800', fontSize: '1.5rem', color: '#059669' }}>{data.summary.sustainabilityScore}<span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400' }}>/100</span></p>
                </div>
                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Offset Target</span>
                  <p style={{ margin: 0, fontWeight: '800', fontSize: '1.5rem', color: '#2563eb' }}>{data.summary.treesNeeded} <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>trees</span></p>
                </div>
              </div>

              {/* FEATURE 1: Interactive Segment Allocation (Chart Alternate) */}
              <div style={{ marginTop: '5px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#334155', fontWeight: '700' }}>Emission Resource Breakdown</h4>
                <div style={{ width: '100%', height: '14px', backgroundColor: '#e2e8f0', borderRadius: '10px', display: 'flex', overflow: 'hidden', marginBotton: '12px' }}>
                  <div style={{ width: `${elecPercentage}%`, backgroundColor: '#f59e0b', transition: 'width 1s ease-in-out' }} title="Electricity Share" />
                  <div style={{ width: `${transPercentage}%`, backgroundColor: '#3b82f6', transition: 'width 1s ease-in-out' }} title="Transport Share" />
                </div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></span> Utilities Grid ({elecPercentage}%)</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></span> Mobility Transit ({transPercentage}%)</span>
                </div>
              </div>

              {/* FEATURE 2: Gamified Afforestation Countermeasures */}
              <div style={{ backgroundColor: '#f0fdf4', padding: '18px', borderRadius: '18px', border: '1px dashed #bbf7d0' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#166534', fontWeight: '700' }}>Afforestation Strategy Tracker</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '10px 0' }}>
                  {Array.from({ length: Math.min(15, Math.ceil(data.summary.treesNeeded)) }).map((_, i) => (
                    <span key={i} style={{ fontSize: '1.3rem', display: 'inline-block', transform: isAnimated ? 'scale(1)' : 'scale(0)', transition: `transform 0.4s ease ${i * 0.05}s` }}>🌳</span>
                  ))}
                  {data.summary.treesNeeded > 15 && <span style={{ fontSize: '0.85rem', alignSelf: 'center', color: '#166534', fontWeight: 'bold' }}>+ {Math.ceil(data.summary.treesNeeded) - 15} more</span>}
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#166534' }}>Planting these trees fully cleanses your calculated monthly atmosphere impact.</p>
              </div>

              {/* Mitigation Protocols */}
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#334155', fontWeight: '700' }}>Targeted Strategic Advice:</h4>
                <ul style={{ margin: 0, paddingLeft: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {data.recommendations.map((rec, idx) => (
                    <li key={idx} style={{ padding: '10px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.85rem', color: '#475569', display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ background: '#059669', color: '#fff', width: '18px', height: '18px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            /* Blank Slate Wrapper */
            <div style={{ border: '2px dashed #cbd5e1', height: '100%', boxSizing: 'border-box', minHeight: '340px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', color: '#94a3b8', textAlign: 'center', backgroundColor: '#fff' }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📊</span>
              <p style={{ margin: 0, fontWeight: '600', color: '#64748b' }}>Awaiting Analytics Query</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#94a3b8', maxWidth: '240px' }}>Fill your metrics and run the simulation engine to generate active analytics data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}