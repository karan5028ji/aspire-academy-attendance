import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  User,
  GraduationCap
} from 'lucide-react';
import { TODAY_DATE } from '../data/mockData';

export const StudentPortalView = () => {
  const {
    students,
    attendance,
    markStudentSelfAttendance,
    getStudentStats,
    setActiveTab,
    institutionName
  } = useApp();

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Present');
  const [note, setNote] = useState('');

  // Filter student list for selector
  const matchedStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const selectedStudent = students.find((s) => s.id === selectedStudentId);
  const studentStats = selectedStudent ? getStudentStats(selectedStudent.id) : null;
  const todayRecord = selectedStudent ? (attendance[TODAY_DATE] || {})[selectedStudent.id] : null;

  const handleSelfSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudentId) return;
    markStudentSelfAttendance(selectedStudentId, selectedStatus, note || 'Self checked-in by student');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Student Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '0.2rem 0.625rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              Smartphone Friendly Check-in
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            Daily Attendance Check-in
          </h1>
          <p style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.25rem' }}>
            Select your profile below to submit attendance for today ({TODAY_DATE}).
          </p>
        </div>

        <button
          className="btn"
          style={{ backgroundColor: '#ffffff', color: 'var(--primary)', fontWeight: 700, width: '100%', maxWidth: '220px' }}
          onClick={() => setActiveTab('login')}
        >
          <ShieldAlert size={16} />
          <span>Teacher / Admin Login</span>
        </button>
      </div>

      {/* Main Check-In Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {/* Step 1 & Step 2 Form */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Sparkles size={20} color="var(--primary)" />
            <h3 className="card-title">Mark Today's Attendance</h3>
          </div>

          <form onSubmit={handleSelfSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Search / Select Student */}
            <div className="form-group">
              <label className="form-label">Find Your Name or Roll Number</label>
              <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.25rem' }}
                  placeholder="Type name or roll number..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
              </div>

              <select
                className="form-select"
                size={5}
                style={{ width: '100%', height: '150px', fontSize: '0.9375rem' }}
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                {matchedStudents.map((s) => (
                  <option key={s.id} value={s.id} style={{ padding: '0.5rem 0.625rem' }}>
                    {s.name} ({s.rollNo}) — {s.course}
                  </option>
                ))}
              </select>
            </div>

            {/* Attendance Status Selection */}
            <div className="form-group">
              <label className="form-label">Tap Your Status for Today</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedStatus('Present')}
                  style={{
                    padding: '0.875rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedStatus === 'Present' ? '2px solid var(--present)' : '1px solid var(--border-color)',
                    backgroundColor: selectedStatus === 'Present' ? 'var(--present-light)' : '#ffffff',
                    color: selectedStatus === 'Present' ? 'var(--present-text)' : 'var(--text-main)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.375rem',
                    minHeight: '64px'
                  }}
                >
                  <CheckCircle2 size={22} />
                  <span>Present</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStatus('Late')}
                  style={{
                    padding: '0.875rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedStatus === 'Late' ? '2px solid var(--late)' : '1px solid var(--border-color)',
                    backgroundColor: selectedStatus === 'Late' ? 'var(--late-light)' : '#ffffff',
                    color: selectedStatus === 'Late' ? 'var(--late-text)' : 'var(--text-main)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.375rem',
                    minHeight: '64px'
                  }}
                >
                  <Clock size={22} />
                  <span>Late</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStatus('Absent')}
                  style={{
                    padding: '0.875rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedStatus === 'Absent' ? '2px solid var(--absent)' : '1px solid var(--border-color)',
                    backgroundColor: selectedStatus === 'Absent' ? 'var(--absent-light)' : '#ffffff',
                    color: selectedStatus === 'Absent' ? 'var(--absent-text)' : 'var(--text-main)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.375rem',
                    minHeight: '64px'
                  }}
                >
                  <XCircle size={22} />
                  <span>Absent</span>
                </button>
              </div>
            </div>

            {/* Optional Note */}
            <div className="form-group">
              <label className="form-label">Remark (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Bus delay, doctor visit"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem', fontWeight: 700, minHeight: '50px' }}>
              <UserCheck size={20} />
              <span>Submit Attendance</span>
            </button>
          </form>
        </div>

        {/* Selected Student Card & Stats */}
        {selectedStudent && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="card-title" style={{ marginBottom: '1rem' }}>
                Your Profile & Progress
              </div>

              {/* Student Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '0.875rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-card-subtle)',
                  marginBottom: '1rem'
                }}
              >
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>{selectedStudent.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    ID: {selectedStudent.rollNo} | {selectedStudent.course}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: todayRecord ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    TODAY'S RECORD ({TODAY_DATE})
                  </div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, marginTop: '0.15rem' }}>
                    {todayRecord ? todayRecord.status : 'Not Yet Checked In'}
                  </div>
                </div>
                {todayRecord && (
                  <span className={`badge badge-${todayRecord.status.toLowerCase()}`}>
                    {todayRecord.status}
                  </span>
                )}
              </div>

              {/* Attendance Performance Grid */}
              {studentStats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                  <div style={{ padding: '0.625rem 0.375rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--present-light)' }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--present-text)' }}>
                      {studentStats.percentage}%
                    </div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--present-text)' }}>
                      Attendance
                    </div>
                  </div>

                  <div style={{ padding: '0.625rem 0.375rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: 800 }}>{studentStats.presentDays}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Present</div>
                  </div>

                  <div style={{ padding: '0.625rem 0.375rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--absent-light)' }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--absent-text)' }}>{studentStats.absentDays}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--absent-text)' }}>Absent</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Note: Confidential fee records and administrative tools are restricted to teacher login.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
