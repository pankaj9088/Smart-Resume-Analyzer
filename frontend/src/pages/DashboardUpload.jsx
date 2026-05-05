import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  UploadCloud, FileText, X, Bell, CheckCircle2, ChevronRight,
  ChevronDown, LayoutDashboard, Upload, Briefcase, Activity,
  Lightbulb, History, Settings, FileCheck, LogOut
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DashboardUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const picked = acceptedFiles[0];
      setFile(picked);
      setUploading(true);
      // Store file reference in sessionStorage as base64 so Analyzing page can send it
      const reader = new FileReader();
      reader.onload = () => {
        sessionStorage.setItem('resume_file_data', reader.result);
        sessionStorage.setItem('resume_file_name', picked.name);
        sessionStorage.setItem('resume_file_type', picked.type);
        setTimeout(() => navigate('/analyzing'), 300);
      };
      reader.readAsDataURL(picked);
    }
  }, [navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <TopBar />

      <main style={{ flex: 1, maxWidth: '860px', margin: '0 auto', width: '100%', padding: '40px 24px', boxSizing: 'border-box' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
          Welcome, {localStorage.getItem('user_name') || 'there'} 👋
        </h1>
        <p style={{ color: '#64748b', marginBottom: '36px', fontSize: '15px' }}>
          Let's analyze your resume and find the best job matches for you.
        </p>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          style={{
            background: isDragActive ? '#eef2ff' : '#fff',
            border: `2px dashed ${isDragActive ? '#4f46e5' : uploading ? '#a5b4fc' : '#c7d2fe'}`,
            borderRadius: '24px', padding: '64px 32px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            cursor: uploading ? 'default' : 'pointer',
            marginBottom: '40px', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', transition: 'all 0.2s'
          }}
        >
          <input {...getInputProps()} />
          <div style={{ width: '64px', height: '64px', background: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#4f46e5' }}>
            {uploading
              ? <div style={{ width: '28px', height: '28px', border: '3px solid #c7d2fe', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              : <UploadCloud size={32} />
            }
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            {uploading ? 'Preparing your resume…' : 'Upload Your Resume'}
          </h2>
          <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px', lineHeight: 1.6 }}>
            {uploading
              ? <span style={{ color: '#4f46e5', fontWeight: 600 }}>{file?.name}</span>
              : <>Drag &amp; drop your file here, or click to browse<br />(PDF, DOCX · Max 10MB)</>
            }
          </p>
          {!uploading && (
            <button style={{ background: '#4f46e5', color: '#fff', padding: '12px 32px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}>
              Choose File
            </button>
          )}
        </div>

        {/* Bottom Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Tips */}
          <div>
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '16px', fontSize: '15px' }}>Tips for best results:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Use a well-structured resume', 'Include skills, experience & education', 'PDF format works best for ATS'].map((tip, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontSize: '14px' }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} /> {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Recent */}
          <div>
            <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '16px', fontSize: '15px' }}>Recent Analyses</h3>
            <div
              onClick={() => navigate('/results')}
              style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'border 0.2s' }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#a5b4fc'}
              onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', background: '#fee2e2', borderRadius: '10px', color: '#ef4444' }}><FileText size={18} /></div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', margin: '0 0 2px' }}>
                    {sessionStorage.getItem('resume_file_name') || 'My_Resume.pdf'}
                  </p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Last analyzed</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>
                  {sessionStorage.getItem('resume_score') ? `${sessionStorage.getItem('resume_score')} / 100` : '— / 100'}
                </span>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Shared TopBar ──────────────────────────────────────────────────────────
export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const userName = localStorage.getItem('user_name') || 'User';
  const userEmail = localStorage.getItem('user_email') || 'user@email.com';
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=e0e7ff&color=4f46e5`;

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Upload size={18} />, label: 'Upload Resume', path: '/' },
    { icon: <Briefcase size={18} />, label: 'Job Matches', path: '/results', state: { defaultTab: 'Job Matches' } },
    { icon: <Activity size={18} />, label: 'ATS Check', path: '/results', state: { defaultTab: 'ATS' } },
    { icon: <Lightbulb size={18} />, label: 'Resume Tips', path: '/results', state: { defaultTab: 'Suggestions' } },
    { icon: <History size={18} />, label: 'History', path: '/dashboard', state: { defaultTab: 'History' } },
    { icon: <Settings size={18} />, label: 'Settings', path: '/dashboard', state: { defaultTab: 'Settings' } },
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <>
      {/* TopBar */}
      <header style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 24px',
        height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#eef2ff'}
            onMouseOut={e => e.currentTarget.style.background = '#f8fafc'}
          >
            <span style={{ display: 'block', width: '18px', height: '2px', background: '#374151', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: '#374151', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '18px', height: '2px', background: '#374151', borderRadius: '2px' }} />
          </button>

          {/* Logo */}
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', fontWeight: 800, fontSize: '17px', cursor: 'pointer' }}>
            <FileCheck size={22} /> Smart Resume
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Bell */}
          <button style={{ position: 'relative', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
            <Bell size={18} />
            <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }} />
          </button>

          {/* Profile */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileOpen(p => !p)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '4px 10px 4px 4px', cursor: 'pointer' }}
            >
              <img src={avatarUrl} style={{ width: '34px', height: '34px', borderRadius: '8px' }} alt="Avatar" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{userName}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{userEmail}</div>
              </div>
              <ChevronDown size={14} color="#94a3b8" style={{ marginLeft: '4px' }} />
            </button>

            {profileOpen && (
              <>
                <div onClick={() => setProfileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 400 }} />
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 500, background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 16px 48px rgba(0,0,0,0.12)', minWidth: '220px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{userName}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{userEmail}</div>
                  </div>
                  {[
                    { icon: <LayoutDashboard size={15} />, label: 'Dashboard', action: () => { navigate('/dashboard'); setProfileOpen(false); } },
                    { icon: <Upload size={15} />, label: 'Upload Resume', action: () => { navigate('/dashboard'); setProfileOpen(false); } },
                    { icon: <Briefcase size={15} />, label: 'My Job Matches', action: () => { navigate('/results'); setProfileOpen(false); } },
                    { icon: <Settings size={15} />, label: 'Settings', action: () => { navigate('/dashboard'); setProfileOpen(false); } },
                  ].map((item, i) => (
                    <button key={i} onClick={item.action} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#374151', textAlign: 'left' }}
                      onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
                      onMouseOut={e => e.currentTarget.style.background = 'none'}
                    >
                      <span style={{ color: '#4f46e5' }}>{item.icon}</span> {item.label}
                    </button>
                  ))}
                  <div style={{ borderTop: '1px solid #f1f5f9' }}>
                    <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#ef4444', textAlign: 'left' }}
                      onMouseOver={e => e.currentTarget.style.background = '#fff5f5'}
                      onMouseOut={e => e.currentTarget.style.background = 'none'}
                    >
                      <LogOut size={15} /> Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Drawer Backdrop */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, backdropFilter: 'blur(2px)' }} />
      )}

      {/* Slide-out Drawer */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '280px', background: '#0f172a', zIndex: 300, boxShadow: '8px 0 40px rgba(0,0,0,0.2)', transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 800, fontSize: '16px' }}>
            <FileCheck size={22} color="#818cf8" /> Smart Resume
          </div>
          <button onClick={() => setMenuOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={16} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <button key={i} onClick={() => { navigate(item.path, item.state ? { state: item.state } : undefined); setMenuOpen(false); }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer', textAlign: 'left', background: isActive ? '#4f46e5' : 'transparent', color: isActive ? '#fff' : '#94a3b8', fontWeight: 600, fontSize: '14px', transition: 'all 0.15s', width: '100%' }}
                onMouseOver={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
                onMouseOut={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; } }}
              >
                {item.icon} {item.label}
              </button>
            );
          })}
        </nav>

        {/* Removed Upgrade to Pro banner */}
      </div>
    </>
  );
}
