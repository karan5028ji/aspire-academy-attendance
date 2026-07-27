import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  CreditCard,
  UserPlus,
  CalendarCheck,
  Download,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { TODAY_DATE, YESTERDAY_DATE, TWO_DAYS_AGO, THREE_DAYS_AGO } from '../data/mockData';

export const DashboardView = () => {
  const {
    students,
    courses,
    attendance,
    getOverallStats,
    setActiveTab,
    setIsStudentModalOpen,
    setEditingStudent,
    exportStudentsCSV,
    setViewingStudent
  } = useApp();

  const todayStats = getOverallStats(TODAY_DATE, 'All Courses');
  const yesterdayStats = getOverallStats(YESTERDAY_DATE, 'All Courses');

  // Fee calculation stats
  const totalFeesCount = students.length;
  const paidCount = students.filter((s) => s.feeStatus === 'Paid').length;
  const pendingCount = students.filter((s) => s.feeStatus === 'Pending').length;
  const overdueCount = students.filter((s) => s.feeStatus === 'Overdue').length;
  const totalPendingAmount = students.reduce((acc, curr) => acc + (curr.pendingAmount || 0), 0);

  // 7-day trend data
  const trendDates = [THREE_DAYS_AGO, TWO_DAYS_AGO, YESTERDAY_DATE, TODAY_DATE];
  const trendData = trendDates.map((d) => {
    const stats = getOverallStats(d, 'All Courses');
    const dayLabel = new Date(d).toLocaleDateString('en-US', { weekday: 'short' });
    return { date: d, dayLabel, percentage: stats.percentage || 0 };
  });

  // Course-wise attendance stats
  const courseStats = courses.map((course) => {
    const stats = getOverallStats(TODAY_DATE, course);
    return { course, ...stats };
  });

  const handleAddStudentClick = () => {
    setEditingStudent(null);
    setIsStudentModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Quick Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-label">Total Enrolled Students</div>
            <div className="stat-value">{students.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--present-text)', marginTop: '0.25rem', fontWeight: 600 }}>
              +3 new this month
            </div>
          </div>
          <div className="stat-icon">
            <Users size={22} />
          </div>
        </div>

        <div className="stat-card stat-present">
          <div>
            <div className="stat-label">Today's Attendance Rate</div>
            <div className="stat-value" style={{ color: 'var(--present-text)' }}>
              {todayStats.percentage}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              vs {yesterdayStats.percentage}% yesterday
            </div>
          </div>
          <div
            className="stat-icon"
            style={{ backgroundColor: 'var(--present-light)', color: 'var(--present-text)' }}
          >
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="stat-card stat-absent">
          <div>
            <div className="stat-label">Present / Absent / Late</div>
            <div className="stat-value" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--present)' }}>{todayStats.present}</span> /{' '}
              <span style={{ color: 'var(--absent)' }}>{todayStats.absent}</span> /{' '}
              <span style={{ color: 'var(--late)' }}>{todayStats.late}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {todayStats.unmarked} students unmarked
            </div>
          </div>
          <div
            className="stat-icon"
            style={{ backgroundColor: 'var(--absent-light)', color: 'var(--absent-text)' }}
          >
            <Clock size={22} />
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div>
            <div className="stat-label">Pending Fees Due</div>
            <div className="stat-value" style={{ color: 'var(--late-text)' }}>
              ₹{totalPendingAmount.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {pendingCount + overdueCount} students pending
            </div>
          </div>
          <div
            className="stat-icon"
            style={{ backgroundColor: 'var(--late-light)', color: 'var(--late-text)' }}
          >
            <CreditCard size={22} />
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 1.75rem',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-md)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            Daily Attendance Management
          </h2>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.25rem' }}>
            Mark student attendance for today ({TODAY_DATE}), view past records, or generate instant reports.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn"
            style={{ backgroundColor: '#ffffff', color: 'var(--primary)', fontWeight: 700 }}
            onClick={() => setActiveTab('attendance')}
          >
            <CalendarCheck size={18} />
            <span>Mark Attendance</span>
          </button>
          <button
            className="btn"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            onClick={handleAddStudentClick}
          >
            <UserPlus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Attendance Trend Chart */}
        <div className="card">
          <div className="card-header-flex">
            <div>
              <div className="card-title">Attendance Trend</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Daily overall attendance percentage
              </div>
            </div>
            <TrendingUp size={20} color="var(--primary)" />
          </div>

          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', padding: '1rem 0' }}>
            {trendData.map((item, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  height: '100%',
                  justifyContent: 'flex-end'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {item.percentage}%
                </div>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '40px',
                    height: `${item.percentage * 1.5}px`,
                    maxHeight: '140px',
                    background: 'linear-gradient(to top, var(--primary), #818cf8)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'all 300ms ease'
                  }}
                />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {item.dayLabel}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course-wise Breakdown */}
        <div className="card">
          <div className="card-header-flex">
            <div>
              <div className="card-title">Course Attendance Today</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Present percentage breakdown by department
              </div>
            </div>
            <BookOpen size={20} color="var(--primary)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {courseStats.map((cs) => (
              <div key={cs.course}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600 }}>{cs.course}</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{cs.percentage}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${cs.percentage}%`,
                      backgroundColor: cs.percentage > 85 ? 'var(--present)' : cs.percentage > 70 ? 'var(--late)' : 'var(--absent)',
                      borderRadius: '999px',
                      transition: 'width 400ms ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Enrolled Students Preview */}
      <div className="card">
        <div className="card-header-flex">
          <div>
            <div className="card-title">Recently Enrolled Students</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Quick view of students enrolled in EduPulse
            </div>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('students')}
          >
            <span>View All ({students.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll / ID Number</th>
                <th>Course</th>
                <th>Fee Status</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((stu) => (
                <tr
                  key={stu.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setViewingStudent(stu)}
                >
                  <td>
                    <div className="student-cell">
                      <img src={stu.avatar} alt={stu.name} className="student-img" />
                      <div>
                        <div className="student-name">{stu.name}</div>
                        <div className="student-id">{stu.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{stu.rollNo}</td>
                  <td>{stu.course}</td>
                  <td>
                    <span className={`badge badge-${stu.feeStatus.toLowerCase()}`}>
                      {stu.feeStatus}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{stu.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
