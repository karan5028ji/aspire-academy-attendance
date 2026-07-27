import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Lock, Mail, ShieldCheck, UserCheck, Key, ArrowRight, User } from 'lucide-react';
import { DEMO_USERS } from '../data/mockData';

export const LoginPage = () => {
  const { login, setActiveTab, institutionName } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const success = login(email, password);
    if (!success) {
      setErrorMsg('Invalid email or password. Use demo credentials below.');
    }
  };

  const handleFillDemo = (type) => {
    const cred = DEMO_USERS[type];
    if (cred) {
      setEmail(cred.email);
      setPassword(cred.password);
      setErrorMsg('');
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2.25rem',
          boxShadow: 'var(--shadow-lg)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            className="brand-icon-wrapper"
            style={{ width: '56px', height: '56px', margin: '0 auto 1rem auto', borderRadius: 'var(--radius-lg)' }}
          >
            <GraduationCap size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            {institutionName}
          </h2>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Faculty & Admin Portal Login
          </div>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--absent-light)',
              color: 'var(--absent-text)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              marginBottom: '1.25rem',
              border: '1px solid var(--absent-border)'
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Teacher / Admin Email</label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)'
                }}
              />
              <input
                type="email"
                className="form-input"
                style={{ width: '100%', paddingLeft: '2.5rem' }}
                required
                placeholder="admin@aspire.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)'
                }}
              />
              <input
                type="password"
                className="form-input"
                style={{ width: '100%', paddingLeft: '2.5rem' }}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem', marginTop: '0.5rem', fontWeight: 700 }}>
            <ShieldCheck size={18} />
            <span>Login to Teacher Panel</span>
          </button>
        </form>

        {/* Demo Login Shortcuts */}
        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', textAlign: 'center' }}>
            QUICK DEMO CREDENTIALS
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleFillDemo('admin')}
              style={{ fontSize: '0.75rem', justifyContent: 'flex-start' }}
            >
              <Key size={13} color="var(--primary)" />
              <span>Fill Admin (Sarah)</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleFillDemo('teacher')}
              style={{ fontSize: '0.75rem', justifyContent: 'flex-start' }}
            >
              <Key size={13} color="var(--primary)" />
              <span>Fill Teacher (Robert)</span>
            </button>
          </div>
        </div>

        {/* Switch to Student Portal */}
        <div
          style={{
            marginTop: '1.5rem',
            padding: '0.875rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card-subtle)',
            textAlign: 'center',
            fontSize: '0.8125rem'
          }}
        >
          <div style={{ color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
            Are you a student checking daily attendance?
          </div>
          <button
            onClick={() => setActiveTab('student-portal')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
          >
            <User size={15} />
            <span>Go to Student Self-Check-in Portal</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
