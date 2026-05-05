import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from './DashboardUpload';
import { CheckCircle2, Lightbulb, AlertCircle } from 'lucide-react';

const STAGES = [
  { label: 'Extracting Text from Resume', triggerAt: 0 },
  { label: 'Analyzing Skills & Keywords', triggerAt: 20 },
  { label: 'Evaluating Experience Level', triggerAt: 40 },
  { label: 'Matching Job Roles', triggerAt: 60 },
  { label: 'Generating AI Suggestions', triggerAt: 80 },
];

const TIPS = [
  'Our AI checks 50+ factors to give you a comprehensive analysis.',
  'ATS systems scan for keywords — we find exactly which ones you need.',
  'Tailoring your resume to a job description can increase callbacks by 40%.',
  'PDFs retain formatting better across different ATS platforms.',
];

export default function Analyzing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [error, setError] = useState(null);
  const apiCalledRef = useRef(false);

  useEffect(() => {
    // Rotate tips every 3 seconds
    const tipTimer = setInterval(() => setTipIndex(i => (i + 1) % TIPS.length), 3000);
    return () => clearInterval(tipTimer);
  }, []);

  useEffect(() => {
    if (apiCalledRef.current) return;
    apiCalledRef.current = true;

    const fileData = sessionStorage.getItem('resume_file_data');
    const fileName = sessionStorage.getItem('resume_file_name') || 'resume.pdf';
    const fileType = sessionStorage.getItem('resume_file_type') || 'application/pdf';

    if (!fileData) {
      // No file uploaded — go back to dashboard
      navigate('/dashboard');
      return;
    }

    // Animate progress while API call is in flight
    const progressTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 90) return p; // Hold at 90 until API resolves
        const newP = p + 0.8;
        const newStage = STAGES.findLastIndex(s => s.triggerAt <= newP);
        if (newStage >= 0) setStage(newStage);
        return newP;
      });
    }, 60);

    // Convert base64 dataURL back to Blob and upload
    const base64 = fileData.split(',')[1];
    const byteArray = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const blob = new Blob([byteArray], { type: fileType });

    const formData = new FormData();
    formData.append('file', blob, fileName);

    fetch('http://localhost:8080/api/resumes/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(json => {
        clearInterval(progressTimer);
        const data = json.data || json;

        // Persist result so Results page can read it
        sessionStorage.setItem('resume_result', JSON.stringify(data));
        sessionStorage.setItem('resume_score', String(data.score ?? 0));

        // Animate to 100% then navigate
        setStage(STAGES.length - 1);
        let p = 90;
        const finishTimer = setInterval(() => {
          p += 2;
          setProgress(p);
          if (p >= 100) {
            clearInterval(finishTimer);
            setTimeout(() => navigate('/results'), 500);
          }
        }, 30);
      })
      .catch(err => {
        clearInterval(progressTimer);
        console.error('API error:', err);
        setError(err.message || 'Something went wrong. Please try again.');
      });

    return () => clearInterval(progressTimer);
  }, [navigate]);

  const currentStage = STAGES.findLastIndex(s => s.triggerAt <= progress);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <TopBar />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', maxWidth: '560px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {error ? (
          /* ── Error State ── */
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ width: '72px', height: '72px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <AlertCircle size={32} color="#ef4444" />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Analysis Failed</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>{error}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/dashboard')}
                style={{ padding: '12px 28px', borderRadius: '12px', border: '2px solid #e2e8f0', background: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: '#374151' }}
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  // Use mock data for demo purposes if backend is unavailable
                  const mock = {
                    fileName: sessionStorage.getItem('resume_file_name') || 'resume.pdf',
                    score: 82,
                    skills: ['Java', 'Spring Boot', 'React', 'SQL', 'REST API', 'Git', 'HTML', 'CSS'],
                    missingSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
                    suggestions: [
                      'Add quantifiable achievements in your experience section.',
                      'Highlight cloud technologies to increase ATS match.',
                      'Keep your resume format clean and ATS-friendly.',
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
                  sessionStorage.setItem('resume_result', JSON.stringify(mock));
                  sessionStorage.setItem('resume_score', '82');
                  navigate('/results');
                }}
                style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', background: '#4f46e5', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: '#fff', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
              >
                View Demo Results
              </button>
            </div>
            <p style={{ marginTop: '16px', fontSize: '12px', color: '#94a3b8' }}>
              Make sure the backend is running at <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>localhost:8080</code>
            </p>
          </div>
        ) : (
          /* ── Progress State ── */
          <>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textAlign: 'center' }}>Analyzing Your Resume…</h1>
            <p style={{ color: '#64748b', marginBottom: '48px', textAlign: 'center' }}>AI is reading your resume — this takes a few seconds</p>

            {/* Circular Progress Ring */}
            <div style={{ position: 'relative', width: '180px', height: '180px', marginBottom: '48px' }}>
              <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e7ff" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="45" fill="none" stroke="url(#grad)" strokeWidth="6"
                  strokeDasharray={`${(Math.min(progress, 100) / 100) * 282.7} 282.7`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.3s ease' }}
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '36px', fontWeight: 800, color: '#4f46e5' }}>{Math.round(Math.min(progress, 100))}%</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Complete</span>
              </div>
            </div>

            {/* Stage Checklist */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
              {STAGES.map((s, i) => {
                const done = i < currentStage;
                const active = i === currentStage;
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px', background: '#fff', borderRadius: '14px',
                    border: `1.5px solid ${done ? '#bbf7d0' : active ? '#c7d2fe' : '#f1f5f9'}`,
                    boxShadow: active ? '0 4px 12px rgba(99,102,241,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: done ? '#dcfce7' : active ? '#eef2ff' : '#f8fafc' }}>
                        {done
                          ? <CheckCircle2 size={16} color="#10b981" />
                          : active
                            ? <div style={{ width: '16px', height: '16px', border: '2.5px solid #6366f1', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                            : <div style={{ width: '16px', height: '16px', border: '2px solid #cbd5e1', borderRadius: '50%' }} />
                        }
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '14px', color: done || active ? '#0f172a' : '#94a3b8' }}>{s.label}</span>
                    </div>
                    {done && <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', background: '#dcfce7', padding: '2px 8px', borderRadius: '999px' }}>Done</span>}
                    {active && <span style={{ fontSize: '11px', fontWeight: 700, color: '#4f46e5', background: '#eef2ff', padding: '2px 8px', borderRadius: '999px' }}>Running</span>}
                  </div>
                );
              })}
            </div>

            {/* Rotating Tips */}
            <div style={{ background: '#eef2ff', border: '1.5px solid #c7d2fe', padding: '18px 22px', borderRadius: '16px', width: '100%', transition: 'all 0.4s' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#3730a3', marginBottom: '6px', fontSize: '13px' }}>
                <Lightbulb size={16} color="#4f46e5" /> Did you know?
              </h4>
              <p style={{ fontSize: '13px', color: '#4338ca', margin: 0, lineHeight: 1.5 }}>{TIPS[tipIndex]}</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
