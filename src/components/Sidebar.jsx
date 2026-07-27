import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  BarChart3,
  GraduationCap,
  X,
  UserCheck,
  LogOut,
  LogIn,
  ShieldCheck
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const {
    activeTab,
    setActiveTab,
    students,
    currentUser,
    logout,
    institutionName
  } = useApp();

  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'teacher');

  const navItems = isAdmin
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'students', label: 'Student Directory (Fees)', icon: Users, badge: students.length },
        { id: 'attendance', label: 'Attendance Tracker', icon: CalendarCheck },
        { id: 'reports', label: 'Analytics & Reports', icon: BarChart3 },
        { id: 'student-portal', label: 'Student Portal View', icon: UserCheck }
      ]
    : [
        { id: 'student-portal', label: 'Student Self Check-in', icon: UserCheck },
        { id: 'login', label: 'Teacher / Admin Login', icon: LogIn }
      ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            zIndex: 35
          }}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          <div className="sidebar-header">
            <div className="brand-icon-wrapper">
              <GraduationCap size={24} />
            </div>
            <div>
              <div className="brand-title">{institutionName}</div>
              <div className="brand-subtitle">
                {isAdmin ? 'Teacher Admin Panel' : 'Student Portal'}
              </div>
            </div>
            {isOpen && (
              <button
                onClick={onClose}
                style={{
                  marginLeft: 'auto',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        backgroundColor: isActive
                          ? 'rgba(255, 255, 255, 0.25)'
                          : 'var(--bg-card-subtle)',
                        color: isActive ? '#ffffff' : 'var(--text-muted)'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile-badge" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="user-avatar" style={{ backgroundColor: isAdmin ? 'var(--primary-light)' : 'var(--present-light)', color: isAdmin ? 'var(--primary)' : 'var(--present-text)' }}>
                {isAdmin ? 'FC' : 'ST'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {isAdmin ? 'Teacher / Admin' : 'Student Mode'}
                </div>
              </div>
            </div>

            {isAdmin ? (
              <button
                className="btn btn-secondary btn-sm"
                onClick={logout}
                style={{ width: '100%', fontSize: '0.75rem' }}
              >
                <LogOut size={13} />
                <span>Logout (Admin Mode)</span>
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setActiveTab('login')}
                style={{ width: '100%', fontSize: '0.75rem' }}
              >
                <ShieldCheck size={13} />
                <span>Teacher Login</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
