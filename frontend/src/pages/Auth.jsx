import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck, ChevronLeft, Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save actual user info to localStorage
    const displayName = isLogin
      ? (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1))
      : (name.trim() || email.split('@')[0]);
    localStorage.setItem('user_email', email);
    localStorage.setItem('user_name', displayName);
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* Back Button */}
      <div style={{ padding: '20px 24px' }}>
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
        >
          <ChevronLeft size={18} /> Back
        </button>
      </div>

      {/* Center Card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', fontWeight: 800, fontSize: '22px', marginBottom: '32px' }}>
          <FileCheck size={28} /> Smart Resume
        </div>

        {/* Card */}
        <div style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '440px',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          
          {/* Tab Switch */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1, padding: '18px', fontSize: '14px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: isLogin ? '2px solid #4f46e5' : '2px solid transparent',
                color: isLogin ? '#4f46e5' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1, padding: '18px', fontSize: '14px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: !isLogin ? '2px solid #4f46e5' : '2px solid transparent',
                color: !isLogin ? '#4f46e5' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              Sign Up
            </button>
          </div>

          <div style={{ padding: '36px' }}>
            {/* Heading */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                {isLogin ? 'Welcome Back! 👋' : 'Create Account! 🚀'}
              </h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                {isLogin ? 'Login to continue to your account' : 'Sign up to get started for free'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0',
                      background: '#f8fafc', fontSize: '14px', color: '#0f172a', outline: 'none',
                      boxSizing: 'border-box', transition: 'border 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#4f46e5'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0',
                    background: '#f8fafc', fontSize: '14px', color: '#0f172a', outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = '#4f46e5'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '12px 48px 12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0',
                      background: '#f8fafc', fontSize: '14px', color: '#0f172a', outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={e => e.target.style.borderColor = '#4f46e5'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {isLogin && (
                  <div style={{ textAlign: 'right', marginTop: '8px' }}>
                    <a href="#" style={{ fontSize: '12px', fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}>Forgot Password?</a>
                  </div>
                )}
              </div>

              <button
                type="submit"
                style={{
                  width: '100%', padding: '14px', background: '#4f46e5', color: '#ffffff', borderRadius: '12px',
                  border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(79,70,229,0.25)', transition: 'background 0.2s', marginTop: '4px'
                }}
                onMouseOver={e => e.target.style.background = '#4338ca'}
                onMouseOut={e => e.target.style.background = '#4f46e5'}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            </div>

            {/* Social Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '11px', border: '1.5px solid #e2e8f0', borderRadius: '12px',
                background: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', color: '#374151'
              }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" style={{ width: '16px', height: '16px' }} alt="Google" />
                Google
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '11px', border: '1.5px solid #e2e8f0', borderRadius: '12px',
                background: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', color: '#0077b5'
              }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" style={{ width: '16px', height: '16px' }} alt="LinkedIn" />
                LinkedIn
              </button>
            </div>

            {/* Switch tab */}
            <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', marginTop: '24px' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                style={{ fontWeight: 700, color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
