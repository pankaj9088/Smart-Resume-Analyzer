import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck, CheckCircle2, BarChart2, Lightbulb, Briefcase } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', fontWeight: 800, fontSize: '20px' }}>
          <FileCheck size={26} /> Smart Resume
        </div>
        <nav style={{ display: 'flex', gap: '32px' }}>
          {['Features', 'How It Works', 'Testimonials', 'Pricing'].map(item => (
            <a key={item} href="#" style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
              onMouseOver={e => e.target.style.color = '#4f46e5'}
              onMouseOut={e => e.target.style.color = '#64748b'}>
              {item}
            </a>
          ))}
        </nav>
        <button
          onClick={() => navigate('/auth')}
          style={{ background: '#4f46e5', color: '#fff', padding: '10px 24px', borderRadius: '10px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
        >
          Get Started
        </button>
      </header>

      {/* Hero */}
      <main style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '40px 48px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: '60px' }}>

        {/* Left Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eef2ff', color: '#4f46e5', fontWeight: 700, fontSize: '12px', padding: '6px 14px', borderRadius: '999px', width: 'fit-content' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
            AI-Powered
          </div>

          <h1 style={{ fontSize: '56px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, margin: 0 }}>
            Smart Resume<br />
            <span style={{ color: '#4f46e5' }}>Analyzer</span> &<br />
            Job Matcher
          </h1>

          <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.7, maxWidth: '460px', margin: 0 }}>
            Upload your resume, get AI-powered analysis, improve your skills and match with the best jobs.
          </p>

          <div>
            <button
              onClick={() => navigate('/auth')}
              style={{ background: '#4f46e5', color: '#fff', padding: '16px 36px', borderRadius: '14px', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(79,70,229,0.3)', display: 'block', marginBottom: '10px' }}
            >
              Get Started Free
            </button>
            <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500, margin: 0 }}>No credit card required</p>
          </div>

          {/* Feature Pills */}
          <div style={{ display: 'flex', gap: '20px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
            {[
              { icon: <BarChart2 size={16} />, title: 'AI Resume Analysis', desc: 'Get comprehensive insights and score' },
              { icon: <Briefcase size={16} />, title: 'Job Matching', desc: 'Find best job roles that match you' },
              { icon: <Lightbulb size={16} />, title: 'Smart Suggestions', desc: 'Improve and optimize your resume' },
            ].map((f, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4f46e5', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                  {f.icon} {f.title}
                </div>
                <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Graphic */}
        <div style={{ flex: 1, maxWidth: '500px', position: 'relative' }}>
          {/* Glow */}
          <div style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}></div>

          {/* Main Card */}
          <div style={{ position: 'relative', background: '#fff', borderRadius: '24px', border: '1.5px solid #e2e8f0', boxShadow: '0 24px 64px rgba(0,0,0,0.08)', padding: '32px', zIndex: 1, transform: 'rotate(2deg)' }}>
            
            {/* Header lines */}
            <div style={{ background: '#f1f5f9', height: '12px', borderRadius: '6px', marginBottom: '12px' }}></div>
            <div style={{ background: '#f1f5f9', height: '12px', borderRadius: '6px', width: '70%', marginBottom: '28px' }}></div>

            {/* Resume Row Items */}
            {[
              { label: 'Skills Match', value: '92%', color: '#10b981' },
              { label: 'ATS Score', value: '88%', color: '#4f46e5' },
              { label: 'Experience', value: '85%', color: '#f59e0b' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={18} color={item.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>{item.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: item.color }}>{item.value}</span>
                  </div>
                  <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px' }}>
                    <div style={{ background: item.color, height: '6px', borderRadius: '3px', width: item.value, transition: 'width 1s ease' }}></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {['React', 'Node.js', 'Spring Boot', 'AWS'].map(tag => (
                <span key={tag} style={{ background: '#eef2ff', color: '#4f46e5', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Floating Score Badge */}
          <div style={{
            position: 'absolute', bottom: '-24px', left: '-24px', zIndex: 2,
            background: '#fff', borderRadius: '20px', padding: '16px 20px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)', border: '1.5px solid #e2e8f0',
            display: 'flex', alignItems: 'center', gap: '14px', transform: 'rotate(-4deg)'
          }}>
            <div style={{ position: 'relative', width: '52px', height: '52px' }}>
              <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="22" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                <circle cx="26" cy="26" r="22" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="117 138.2" strokeLinecap="round" />
              </svg>
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: '#10b981' }}>85</span>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Resume Score</div>
              <div style={{ fontSize: '13px', color: '#10b981', fontWeight: 800 }}>Great Job! 🎉</div>
            </div>
          </div>

          {/* Floating Check badge */}
          <div style={{
            position: 'absolute', top: '-16px', right: '-16px', zIndex: 2,
            background: '#4f46e5', borderRadius: '14px', padding: '10px',
            boxShadow: '0 8px 20px rgba(79,70,229,0.35)', transform: 'rotate(12deg)'
          }}>
            <CheckCircle2 size={22} color="#fff" />
          </div>
        </div>
      </main>
    </div>
  );
}
