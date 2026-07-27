import React from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';
import { Mail, Phone, Calendar, BookOpen, AlertTriangle, Edit, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';

export const StudentProfileModal = () => {
  const {
    viewingStudent,
    setViewingStudent,
    getStudentStats,
    setEditingStudent,
    setIsStudentModalOpen,
    deleteStudent,
    attendance
  } = useApp();

  if (!viewingStudent) return null;

  const stats = getStudentStats(viewingStudent.id);

  const handleEdit = () => {
    setEditingStudent(viewingStudent);
    setViewingStudent(null);
    setIsStudentModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${viewingStudent.name}?`)) {
      deleteStudent(viewingStudent.id);
      setViewingStudent(null);
    }
  };

  // Recent attendance entries for this student
  const recentLogs = Object.keys(attendance)
    .sort((a, b) => new Date(b) - new Date(a))
    .slice(0, 7)
    .map((date) => {
      const rec = attendance[date][viewingStudent.id];
      return { date, record: rec };
    });

  return (
    <Modal
      isOpen={!!viewingStudent}
      onClose={() => setViewingStudent(null)}
      title="Student Profile & Attendance History"
      maxWidth="650px"
      footer={
        <>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleEdit}>
            <Edit size={14} />
            <span>Edit Details</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setViewingStudent(null)}>
            Close
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Profile Card Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-color)'
          }}
        >
          <img
            src={viewingStudent.avatar}
            alt={viewingStudent.name}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--primary)'
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {viewingStudent.name}
              </h2>
              <span className={`badge badge-${viewingStudent.feeStatus.toLowerCase()}`}>
                Fee: {viewingStudent.feeStatus}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              ID: <strong>{viewingStudent.rollNo}</strong> | Course: {viewingStudent.course} ({viewingStudent.batch})
            </div>
          </div>
        </div>

        {/* Attendance Stats Cards */}
        <div>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Overall Attendance Performance
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            <div
              style={{
                padding: '0.875rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-light)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                {stats.percentage}%
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-hover)' }}>
                Attendance Rate
              </div>
            </div>

            <div
              style={{
                padding: '0.875rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--present-light)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--present-text)' }}>
                {stats.presentDays}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--present-text)' }}>
                Present Days
              </div>
            </div>

            <div
              style={{
                padding: '0.875rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--late-light)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--late-text)' }}>
                {stats.lateDays}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--late-text)' }}>
                Late Days
              </div>
            </div>

            <div
              style={{
                padding: '0.875rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--absent-light)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--absent-text)' }}>
                {stats.absentDays}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--absent-text)' }}>
                Absent Days
              </div>
            </div>
          </div>
        </div>

        {/* Recent Attendance Logs */}
        <div>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Recent Attendance Log
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {recentLogs.map(({ date, record }) => {
              const status = record ? record.status : 'Unmarked';
              const note = record ? record.note : '';
              return (
                <div
                  key={date}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.625rem 0.875rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <Calendar size={16} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{date}</span>
                    {note && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', italic: 'true' }}>
                        "{note}"
                      </span>
                    )}
                  </div>
                  <span className={`badge badge-${status.toLowerCase()}`}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Details & Fee Status */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}
          >
            <h5 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              CONTACT INFORMATION
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.875rem' }}>
              <div><Phone size={14} style={{ display: 'inline', marginRight: '6px' }} /> {viewingStudent.phone}</div>
              <div><Mail size={14} style={{ display: 'inline', marginRight: '6px' }} /> {viewingStudent.email}</div>
              {viewingStudent.emergencyContact && (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
                  Emergency: {viewingStudent.emergencyContact}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}
          >
            <h5 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              FEES BREAKDOWN
            </h5>
            <div style={{ fontSize: '0.875rem' }}>
              <div>Total Course Fee: <strong>₹{(viewingStudent.feeAmount || 45000).toLocaleString('en-IN')}</strong></div>
              <div>Status: <span className={`badge badge-${viewingStudent.feeStatus.toLowerCase()}`}>{viewingStudent.feeStatus}</span></div>
              {viewingStudent.pendingAmount > 0 && (
                <div style={{ color: 'var(--absent-text)', fontWeight: 600, marginTop: '4px' }}>
                  Due Balance: ₹{viewingStudent.pendingAmount.toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
