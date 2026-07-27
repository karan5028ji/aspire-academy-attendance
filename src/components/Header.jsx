import React from 'react';
import { useApp } from '../context/AppContext';
import { Menu, Search, Plus, Calendar, ShieldCheck, User, LogOut } from 'lucide-react';

export const Header = ({ onOpenMobileMenu }) => {
  const {
    activeTab,
    searchQuery,
    setSearchQuery,
    setIsStudentModalOpen,
    setEditingStudent,
    selectedDate,
    currentUser,
    logout,
    setActiveTab,
    institutionName
  } = useApp();

  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'teacher');

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Teacher Panel — Institute Overview';
      case 'students':
        return 'Teacher Panel — Confidential Student & Fee Directory';
      case 'attendance':
        return 'Teacher Panel — Daily Attendance Management';
      case 'reports':
        return 'Teacher Panel — Financial & Risk Reports';
      case 'student-portal':
        return `${institutionName} — Student Self Check-in`;
      case 'login':
        return `${institutionName} — Teacher / Admin Login`;
      default:
        return `${institutionName} System`;
    }
  };

  const handleQuickAdd = () => {
    setEditingStudent(null);
    setIsStudentModalOpen(true);
  };

  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="mobile-toggle" onClick={onOpenMobileMenu}>
          <Menu size={24} />
        </button>
        <h1 className="page-title">{getTitle()}</h1>
      </div>

      <div className="header-right">
        {isAdmin && activeTab !== 'student-portal' && activeTab !== 'login' && (
          <div className="quick-search">
            <Search />
            <input
              type="text"
              placeholder="Search students, ID, course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-card-subtle)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-muted)'
          }}
        >
          <Calendar size={15} color="var(--primary)" />
          <span>{formattedDate}</span>
        </div>

        {/* Role Badge & Quick Switch */}
        {isAdmin ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              <ShieldCheck size={14} />
              <span>Admin Mode</span>
            </span>

            <button className="btn btn-primary btn-sm" onClick={handleQuickAdd}>
              <Plus size={16} />
              <span>Add Student</span>
            </button>
          </div>
        ) : (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('login')}
            style={{ fontWeight: 600 }}
          >
            <ShieldCheck size={16} color="var(--primary)" />
            <span>Teacher Login</span>
          </button>
        )}
      </div>
    </header>
  );
};
