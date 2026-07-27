import React from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  CreditCard,
  CheckCircle,
  Download,
  BookOpen,
  FileSpreadsheet
} from 'lucide-react';

export const ReportsView = () => {
  const { students, courses, getStudentStats, getOverallStats, exportStudentsCSV, setViewingStudent } = useApp();

  // Find students with low attendance (< 75%)
  const lowAttendanceStudents = students
    .map((stu) => {
      const stats = getStudentStats(stu.id);
      return { ...stu, stats };
    })
    .filter((stu) => stu.stats.percentage < 75);

  // Find fee defaulters
  const feeDefaulters = students.filter((s) => s.feeStatus === 'Pending' || s.feeStatus === 'Overdue');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner & Export */}
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h2 className="card-title">Institute Performance & Risk Reports</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Automated alerts for low attendance thresholds and fee collection status.
          </p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={exportStudentsCSV}>
          <FileSpreadsheet size={16} />
          <span>Export Master CSV Report</span>
        </button>
      </div>

      {/* Grid of Reports */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        {/* Low Attendance Risk Alert (<75%) */}
        <div className="card">
          <div className="card-header-flex">
            <div>
              <div className="card-title" style={{ color: 'var(--absent-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} />
                <span>Low Attendance Risk Alert (&lt; 75%)</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Students requiring academic intervention
              </div>
            </div>
            <span className="badge badge-absent">{lowAttendanceStudents.length} Students</span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Rate %</th>
                  <th>Absent Days</th>
                </tr>
              </thead>
              <tbody>
                {lowAttendanceStudents.length > 0 ? (
                  lowAttendanceStudents.map((stu) => (
                    <tr key={stu.id} style={{ cursor: 'pointer' }} onClick={() => setViewingStudent(stu)}>
                      <td>
                        <div className="student-cell">
                          <img src={stu.avatar} alt={stu.name} className="student-img" />
                          <div>
                            <div className="student-name">{stu.name}</div>
                            <div className="student-id">{stu.rollNo}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.8125rem' }}>{stu.course}</td>
                      <td>
                        <span className="badge badge-absent" style={{ fontSize: '0.8125rem', fontWeight: 700 }}>
                          {stu.stats.percentage}%
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--absent)' }}>{stu.stats.absentDays} days</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--present-text)', padding: '2rem' }}>
                      <CheckCircle size={28} style={{ marginBottom: '0.5rem' }} />
                      <div>All students are maintaining healthy attendance (&gt;= 75%)!</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Collection & Defaulters */}
        <div className="card">
          <div className="card-header-flex">
            <div>
              <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} color="var(--late)" />
                <span>Pending Fee Defaulters List</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Students with pending or overdue tuition payments
              </div>
            </div>
            <span className="badge badge-pending">{feeDefaulters.length} Pending</span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Due Balance</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {feeDefaulters.map((stu) => (
                  <tr key={stu.id} style={{ cursor: 'pointer' }} onClick={() => setViewingStudent(stu)}>
                    <td>
                      <div className="student-cell">
                        <img src={stu.avatar} alt={stu.name} className="student-img" />
                        <div>
                          <div className="student-name">{stu.name}</div>
                          <div className="student-id">{stu.rollNo}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${stu.feeStatus.toLowerCase()}`}>
                        {stu.feeStatus}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: stu.feeStatus === 'Overdue' ? 'var(--absent)' : 'var(--late-text)' }}>
                      ₹{stu.pendingAmount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ fontSize: '0.8125rem' }}>{stu.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
