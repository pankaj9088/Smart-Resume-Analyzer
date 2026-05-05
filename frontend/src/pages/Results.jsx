import React, { useState, useMemo } from 'react';
import { TopBar } from './DashboardUpload';
import { CheckCircle2, Download, AlertCircle, Sparkles, FileText, UploadCloud } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const JOB_COLORS = [
  { bg: '#d1fae5', text: '#059669', bar: '#10b981' },
  { bg: '#dbeafe', text: '#2563eb', bar: '#3b82f6' },
  { bg: '#fed7aa', text: '#ea580c', bar: '#f97316' },
  { bg: '#e9d5ff', text: '#7c3aed', bar: '#8b5cf6' },
  { bg: '#ccfbf1', text: '#0d9488', bar: '#14b8a6' },
];

function useAnalysisData() {
  const location = useLocation();
  return useMemo(() => {
    if (location.state && location.state.analysis) {
      return location.state.analysis;
    }
    try {
      const raw = sessionStorage.getItem('resume_result');
      if (raw) return JSON.parse(raw);
    } catch {}
    // fallback demo data
    return {
      fileName: 'demo_resume.pdf',
      score: 82,
      skills: ['Java', 'Spring Boot', 'React', 'SQL', 'REST API', 'Git', 'HTML', 'CSS'],
      missingSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      suggestions: [
        'Add quantifiable achievements in your experience section.',
        'Highlight cloud technologies to increase ATS match.',
        'Keep the resume format clean and ATS-friendly.',
        'Add relevant certifications to boost credibility.',
        'Include more role-specific keywords to pass automated screening.',
      ],
      atsCompatibility: 88,
      jobMatches: [
        { role: 'Full Stack Developer', matchPercentage: 85 },
        { role: 'Backend Java Developer', matchPercentage: 92 },
        { role: 'Software Engineer', matchPercentage: 78 },
        { role: 'Frontend Developer', matchPercentage: 70 },
        { role: 'Data Engineer', matchPercentage: 62 },
      ],
    };
  }, []);
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: '#fff', borderRadius: '20px', border: '1.5px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '28px', ...style }}>
      {children}
    </div>
  );
}

export default function Results() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.defaultTab || 'Overview');
  const data = useAnalysisData();
  const tabs = ['Overview', 'Skills', 'Job Matches', 'Suggestions', 'ATS', 'Improve'];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <TopBar />

      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: '68px', zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '16px 20px', fontSize: '13px', fontWeight: 700, border: 'none',
              background: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              borderBottom: activeTab === tab ? '2px solid #4f46e5' : '2px solid transparent',
              color: activeTab === tab ? '#4f46e5' : '#64748b', transition: 'all 0.15s'
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <main style={{ flex: 1, maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>
        {activeTab === 'Overview'    && <OverviewTab    data={data} />}
        {activeTab === 'Skills'      && <SkillsTab      data={data} />}
        {activeTab === 'Job Matches' && <JobsTab        data={data} />}
        {activeTab === 'Suggestions' && <SuggestionsTab data={data} />}
        {activeTab === 'ATS'         && <AtsTab         data={data} />}
        {activeTab === 'Improve'     && <ImproveTab     data={data} />}
      </main>
    </div>
  );
}

// ── 1. Overview ───────────────────────────────────────────────────────────────
function OverviewTab({ data }) {
  const { score = 0, jobMatches = [], missingSkills = [] } = data;
  const scoreColor = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const scoreLabel = score >= 80 ? 'Great Job! 🎉' : score >= 60 ? 'Good Progress 👍' : 'Needs Work 💪';

  const handleDownloadReport = () => {
    const reportText = `RESUME ANALYSIS REPORT\n\n` +
      `File: ${data.fileName || 'Analysis'}\n` +
      `Score: ${score}/100\n` +
      `ATS Compatibility: ${data.atsCompatibility || 0}%\n\n` +
      `DETECTED SKILLS:\n${(data.skills || []).join(', ')}\n\n` +
      `MISSING SKILLS:\n${(data.missingSkills || []).join(', ')}\n\n` +
      `TOP JOB MATCHES:\n${jobMatches.map(j => `- ${j.role} (${j.matchPercentage}%)`).join('\n')}\n\n` +
      `SUGGESTIONS:\n${(data.suggestions || []).map(s => `- ${s}`).join('\n')}`;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_report_${(data.fileName || 'analysis').replace('.pdf', '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
            <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={scoreColor} strokeWidth="8"
                strokeDasharray={`${(score / 100) * 251.2} 251.2`} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '42px', fontWeight: 900, color: '#0f172a' }}>{score}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>/100</span>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: scoreColor, marginBottom: '10px' }}>{scoreLabel}</h2>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px', maxWidth: '340px' }}>
              {score >= 80
                ? 'Your resume is strong. Keep improving by adding missing skills and keywords!'
                : score >= 60
                  ? 'Your resume is decent. Address the missing skills to boost your score significantly.'
                  : 'Your resume needs improvement. Follow the suggestions to increase your chances.'
              }
            </p>
            <button onClick={handleDownloadReport} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4f46e5', fontWeight: 700, border: '1.5px solid #c7d2fe', padding: '10px 22px', borderRadius: '12px', background: '#fff', cursor: 'pointer', fontSize: '13px' }}>
              <Download size={16} /> Download Report
            </button>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>Top Job Matches</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {jobMatches.slice(0, 3).map((job, i) => {
              const c = JOB_COLORS[i];
              const pct = job.matchPercentage ?? 0;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: c.bg, color: c.text, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{job.role}</span>
                      <span style={{ fontWeight: 800, color: c.text, fontSize: '14px' }}>{pct}%</span>
                    </div>
                    <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px' }}>
                      <div style={{ background: c.bar, height: '6px', borderRadius: '3px', width: `${pct}%`, transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Card>
          <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '20px' }}>Detected Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(data.skills || []).map((s, i) => (
              <span key={i} style={{ background: '#dcfce7', color: '#16a34a', fontSize: '12px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', border: '1px solid #bbf7d0' }}>{s}</span>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Missing Skills</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(data.missingSkills || []).map((s, i) => (
              <span key={i} style={{ background: '#fee2e2', color: '#ef4444', fontSize: '12px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', border: '1px solid #fecaca' }}>{s}</span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── 2. Skills ─────────────────────────────────────────────────────────────────
function SkillsTab({ data }) {
  const skills = data.skills || [];
  const missing = data.missingSkills || [];
  return (
    <Card>
      <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px' }}>Skills Analysis</h2>
      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>✅ Detected Skills</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
        {skills.map((s, i) => (
          <span key={i} style={{ background: '#dcfce7', color: '#16a34a', fontSize: '13px', fontWeight: 700, padding: '6px 14px', borderRadius: '999px', border: '1px solid #bbf7d0' }}>{s}</span>
        ))}
      </div>
      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>❌ Missing Skills</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
        {missing.map((s, i) => (
          <span key={i} style={{ background: '#fee2e2', color: '#ef4444', fontSize: '13px', fontWeight: 700, padding: '6px 14px', borderRadius: '999px', border: '1px solid #fecaca' }}>{s}</span>
        ))}
      </div>
      {missing.length > 0 && (
        <div style={{ background: '#eef2ff', border: '1.5px solid #c7d2fe', padding: '16px 20px', borderRadius: '14px', display: 'flex', gap: '10px', color: '#4338ca', fontSize: '13px', fontWeight: 600 }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          Tip: Learning {missing.slice(0, 2).join(' and ')} can significantly increase your job match score.
        </div>
      )}
    </Card>
  );
}

// ── 3. Job Matches ────────────────────────────────────────────────────────────
function JobsTab({ data }) {
  const jobs = data.jobMatches || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {jobs.map((job, i) => {
        const c = JOB_COLORS[i % JOB_COLORS.length];
        const pct = job.matchPercentage ?? 0;
        return (
          <Card key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: c.bar, color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>{job.role}</h3>
                <span style={{ fontSize: '20px', fontWeight: 800, color: c.text }}>{pct}%</span>
              </div>
              <div style={{ background: '#f1f5f9', height: '8px', borderRadius: '4px' }}>
                <div style={{ background: c.bar, height: '8px', borderRadius: '4px', width: `${pct}%`, transition: 'width 0.8s ease' }} />
              </div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginTop: '6px' }}>
                {pct >= 80 ? '🟢 Great Match' : pct >= 65 ? '🟡 Good Match' : '🔴 Partial Match'}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ── 4. Suggestions ────────────────────────────────────────────────────────────
const SUGGESTION_STYLES = [
  { color: '#10b981', bg: '#dcfce7', Icon: Sparkles },
  { color: '#3b82f6', bg: '#dbeafe', Icon: AlertCircle },
  { color: '#f97316', bg: '#fed7aa', Icon: FileText },
  { color: '#8b5cf6', bg: '#e9d5ff', Icon: CheckCircle2 },
  { color: '#f43f5e', bg: '#ffe4e6', Icon: CheckCircle2 },
];

function SuggestionsTab({ data }) {
  const suggestions = data.suggestions || [];
  return (
    <Card>
      <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px' }}>AI Suggestions to Improve</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {suggestions.map((s, i) => {
          const style = SUGGESTION_STYLES[i % SUGGESTION_STYLES.length];
          return (
            <div key={i} style={{ display: 'flex', gap: '20px', padding: '20px', border: '1.5px solid #f1f5f9', borderRadius: '16px', background: '#fafafa' }}
              onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseOut={e => e.currentTarget.style.background = '#fafafa'}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: style.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <style.Icon size={22} color={style.color} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Suggestion {i + 1}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{s}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── 5. ATS ────────────────────────────────────────────────────────────────────
function AtsTab({ data }) {
  const ats = data.atsCompatibility ?? 0;
  const atsColor = ats >= 80 ? '#10b981' : ats >= 60 ? '#f59e0b' : '#ef4444';
  const breakdown = [
    { label: 'Format',   p: Math.min(ats + 5, 100) },
    { label: 'Keywords', p: Math.max(ats - 5, 0)   },
    { label: 'Skills',   p: data.score ?? 0        },
    { label: 'Sections', p: Math.min(ats + 8, 100) },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '28px' }}>ATS Compatibility</h3>
        <div style={{ position: 'relative', width: '180px', height: '180px', marginBottom: '24px' }}>
          <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke={atsColor} strokeWidth="8"
              strokeDasharray={`${(ats / 100) * 282.7} 282.7`} strokeLinecap="round" />
          </svg>
          <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 900, color: '#0f172a' }}>{ats}%</span>
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 800, color: atsColor, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <CheckCircle2 size={20} /> {ats >= 80 ? 'ATS Friendly' : ats >= 60 ? 'Needs Work' : 'Poor Match'}
        </h4>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          {ats >= 80 ? 'Your resume passes most ATS filters.' : 'Add more keywords and simplify formatting.'}
        </p>
      </Card>
      <Card>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>ATS Breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          {breakdown.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: '80px', fontSize: '13px', fontWeight: 700 }}>{s.label}</span>
              <div style={{ flex: 1, background: '#f1f5f9', height: '8px', borderRadius: '4px' }}>
                <div style={{ background: atsColor, height: '8px', borderRadius: '4px', width: `${s.p}%`, transition: 'width 0.8s ease' }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: atsColor, width: '36px', textAlign: 'right' }}>{s.p}%</span>
            </div>
          ))}
        </div>
        <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '14px' }}>Recommendations</h3>
        {['Use standard section headings', 'Avoid tables, images & complex formatting', 'Add more relevant keywords from job listings'].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500 }}>{r}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── 6. Improve ────────────────────────────────────────────────────────────────
function ImproveTab({ data }) {
  const navigate = useNavigate();

  const handleDownloadOriginal = () => {
    const fileData = sessionStorage.getItem('resume_file_data');
    const fileName = sessionStorage.getItem('resume_file_name') || data.fileName || 'resume.pdf';
    if (fileData) {
      const a = document.createElement('a');
      a.href = fileData;
      a.download = fileName;
      a.click();
    } else {
      alert("Original file not found in session. Please upload again.");
    }
  };

  const handleGenerateImproved = () => {
    const improvedText = `AI IMPROVED RESUME CONTENT (SUGGESTIONS)\n\n` +
      `Based on your original resume, we suggest incorporating the following changes:\n\n` +
      `1. Include these missing skills seamlessly into your experience section:\n` +
      `${(data.missingSkills || []).map(s => `   - ${s}`).join('\n')}\n\n` +
      `2. Optimize your phrasing based on these suggestions:\n` +
      `${(data.suggestions || []).map(s => `   - ${s}`).join('\n')}\n\n` +
      `3. Target keywords from these top matching roles:\n` +
      `${(data.jobMatches || []).map(j => `   - ${j.role}`).join('\n')}\n\n` +
      `Note: Currently, we provide this text guide. Advanced PDF generation is coming soon!`;
      
    const blob = new Blob([improvedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Improved_Resume_Guide.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', marginBottom: '6px' }}>Improve &amp; Download</h2>
        <p style={{ color: '#64748b', fontSize: '15px' }}>Get an AI-optimized resume and download it.</p>
      </div>

      <Card style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ width: '48px', height: '48px', background: '#eef2ff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Sparkles size={24} color="#4f46e5" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>AI Improved Resume</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>Get an AI-optimized version with better wording, keywords and formatting.</p>
          <button onClick={handleGenerateImproved} style={{ background: '#4f46e5', color: '#fff', padding: '12px 28px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}>
            Generate &amp; Download
          </button>
        </div>
        <div style={{ width: '120px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
            <rect x="15" y="5" width="70" height="95" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
            <rect x="28" y="18" width="24" height="24" rx="12" fill="#f1f5f9"/>
            <rect x="28" y="52" width="44" height="5" rx="2.5" fill="#e2e8f0"/>
            <rect x="28" y="64" width="32" height="5" rx="2.5" fill="#e2e8f0"/>
            <circle cx="78" cy="90" r="18" fill="#10b981"/>
            <path d="M70 90 L76 96 L86 82" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Card>

      <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', background: '#dbeafe', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Download size={22} color="#3b82f6" />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Original Resume</h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>{data.fileName || 'Your uploaded file'}</p>
          </div>
        </div>
        <button onClick={handleDownloadOriginal} style={{ border: '2px solid #c7d2fe', color: '#4f46e5', padding: '10px 22px', borderRadius: '12px', background: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
          Download
        </button>
      </Card>

      <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', background: '#dcfce7', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UploadCloud size={22} color="#10b981" />
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Analyze Another Resume</h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Upload a new resume for fresh analysis.</p>
          </div>
        </div>
        <button onClick={() => navigate('/dashboard')} style={{ border: '2px solid #bbf7d0', color: '#10b981', padding: '10px 22px', borderRadius: '12px', background: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
          Upload New
        </button>
      </Card>

      <div style={{ background: '#eef2ff', border: '1.5px solid #c7d2fe', borderRadius: '16px', padding: '20px 24px' }}>
        <p style={{ color: '#3730a3', fontSize: '14px', fontWeight: 500 }}>
          <strong>Pro Tip:</strong> Use the AI Improved resume to increase your chances of getting shortlisted by up to 40%!
        </p>
      </div>
    </div>
  );
}
