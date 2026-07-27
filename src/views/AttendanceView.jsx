import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  CheckCheck,
  RotateCcw,
  Search,
  MessageSquare
} from 'lucide-react';
import { TODAY_DATE, getFormattedDate } from '../data/mockData';

export const AttendanceView = () => {
  const {
    students,
    courses,
    selectedDate,
    setSelectedDate,
    selectedCourseFilter,
    setSelectedCourseFilter,
    getAttendanceForDate,
    saveAttendanceRecord,
    showToast
  } = useApp();

  const [activeStatusFilter, setActiveStatusFilter] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');

  // Local state for temporary attendance entries before saving
  // Format: { [studentId]: { status: 'Present' | 'Absent' | 'Late', note: '' } }
  const [localAttendance, setLocalAttendance] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  // Load existing records for the selected date when date changes
  useEffect(() => {
    const existing = getAttendanceForDate(selectedDate);
    setLocalAttendance(existing || {});
    setIsDirty(false);
  }, [selectedDate]);

  // Filter students based on course selection & search
  const classStudents = students.filter((s) => {
    const matchesCourse =
      selectedCourseFilter === 'All Courses' || s.course === selectedCourseFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  // Calculate live stats
  const totalCount = classStudents.length;
  let presentCount = 0;
  let absentCount = 0;
  let lateCount = 0;
  let unmarkedCount = 0;

  classStudents.forEach((stu) => {
    const rec = localAttendance[stu.id];
    if (!rec || !rec.status) {
      unmarkedCount++;
    } else if (rec.status === 'Present') {
      presentCount++;
    } else if (rec.status === 'Absent') {
      absentCount++;
    } else if (rec.status === 'Late') {
      lateCount++;
    }
  });

  const markedCount = presentCount + absentCount + lateCount;
  const attendanceRate = totalCount > 0 ? Math.round(((presentCount + lateCount) / totalCount) * 100) : 0;

  // Filter list by status tab if selected
  const displayedStudents = classStudents.filter((stu) => {
    if (activeStatusFilter === 'All') return true;
    const rec = localAttendance[stu.id];
    const status = rec ? rec.status : 'Unmarked';
    return status === activeStatusFilter;
  });

  const setStudentStatus = (studentId, status) => {
    setLocalAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        status
      }
    }));
    setIsDirty(true);
  };

  const setStudentNote = (studentId, note) => {
    setLocalAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { status: 'Present' }),
        note
      }
    }));
    setIsDirty(true);
  };

  // Bulk Actions
  const handleMarkAll = (status) => {
    const nextMap = { ...localAttendance };
    classStudents.forEach((stu) => {
      nextMap[stu.id] = {
        ...(nextMap[stu.id] || {}),
        status
      };
    });
    setLocalAttendance(nextMap);
    setIsDirty(true);
    showToast(`Marked all ${classStudents.length} students as ${status}`, 'info');
  };

  const handleResetAll = () => {
    const nextMap = { ...localAttendance };
    classStudents.forEach((stu) => {
      delete nextMap[stu.id];
    });
    setLocalAttendance(nextMap);
    setIsDirty(true);
    showToast(`Cleared attendance entries for selected batch`, 'warning');
  };

  const handleDateChange = (offset) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + offset);
    const newDateStr = current.toISOString().split('T')[0];
    setSelectedDate(newDateStr);
  };

  const handleSave = () => {
    saveAttendanceRecord(selectedDate, localAttendance);
    setIsDirty(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '5rem' }}>
      {/* Date & Class Controls Bar */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Date Picker Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleDateChange(-1)}
              title="Previous Day"
            >
              <ChevronLeft size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CalendarIcon size={18} color="var(--primary)" />
              <input
                type="date"
                className="form-input"
                style={{ fontWeight: 600, padding: '0.4rem 0.75rem' }}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleDateChange(1)}
              title="Next Day"
            >
              <ChevronRight size={18} />
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setSelectedDate(TODAY_DATE)}
              style={{ fontWeight: 600 }}
            >
              Today
            </button>
          </div>

          {/* Course / Batch Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Filter size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Course Batch:</span>
            <select
              className="form-select"
              style={{ minWidth: '200px' }}
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
            >
              <option value="All Courses">All Courses ({students.length})</option>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Live Attendance Stats Counter */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem'
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Batch Total
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{totalCount}</div>
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>
            {attendanceRate}% Present
          </div>
        </div>

        <div
          style={{
            background: 'var(--present-light)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--present-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <CheckCircle2 size={24} color="var(--present-text)" />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--present-text)', fontWeight: 600 }}>
              Present
            </div>
            <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--present-text)' }}>
              {presentCount}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'var(--absent-light)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--absent-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <XCircle size={24} color="var(--absent-text)" />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--absent-text)', fontWeight: 600 }}>
              Absent
            </div>
            <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--absent-text)' }}>
              {absentCount}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'var(--late-light)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--late-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <Clock size={24} color="var(--late-text)" />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--late-text)', fontWeight: 600 }}>
              Late Arrival
            </div>
            <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--late-text)' }}>
              {lateCount}
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions & Quick Filter Toolbar */}
      <div
        className="card"
        style={{
          padding: '1rem 1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleMarkAll('Present')}
            style={{ color: 'var(--present-text)', borderColor: 'var(--present-border)' }}
          >
            <CheckCheck size={16} />
            <span>Mark All Present</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleMarkAll('Absent')}
            style={{ color: 'var(--absent-text)', borderColor: 'var(--absent-border)' }}
          >
            <XCircle size={16} />
            <span>Mark All Absent</span>
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleResetAll}>
            <RotateCcw size={14} />
            <span>Reset All</span>
          </button>
        </div>

        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input
            type="text"
            className="form-input"
            style={{ width: '100%', paddingLeft: '2rem', padding: '0.35rem 0.5rem 0.35rem 2rem', fontSize: '0.8125rem' }}
            placeholder="Search class list..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Attendance Marking Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name & Photo</th>
              <th>Roll ID</th>
              <th>Course / Class</th>
              <th>Attendance Status Toggle</th>
              <th>Note / Reason (Optional)</th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.length > 0 ? (
              displayedStudents.map((stu) => {
                const rec = localAttendance[stu.id] || {};
                const currentStatus = rec.status || '';

                return (
                  <tr key={stu.id}>
                    <td>
                      <div className="student-cell">
                        <img src={stu.avatar} alt={stu.name} className="student-img" />
                        <div>
                          <div className="student-name">{stu.name}</div>
                          <div className="student-id">{stu.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{stu.rollNo}</td>
                    <td>{stu.course}</td>
                    <td>
                      <div className="attendance-toggle-group">
                        <button
                          type="button"
                          className={`toggle-btn ${currentStatus === 'Present' ? 'active-present' : ''}`}
                          onClick={() => setStudentStatus(stu.id, 'Present')}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          className={`toggle-btn ${currentStatus === 'Absent' ? 'active-absent' : ''}`}
                          onClick={() => setStudentStatus(stu.id, 'Absent')}
                        >
                          Absent
                        </button>
                        <button
                          type="button"
                          className={`toggle-btn ${currentStatus === 'Late' ? 'active-late' : ''}`}
                          onClick={() => setStudentStatus(stu.id, 'Late')}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        style={{ fontSize: '0.8125rem', padding: '0.35rem 0.6rem', width: '100%', maxWidth: '240px' }}
                        placeholder="Add remark..."
                        value={rec.note || ''}
                        onChange={(e) => setStudentNote(stu.id, e.target.value)}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                  No students in this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sticky Save Attendance Bar */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
          padding: '0.75rem 1.75rem',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          zIndex: 35
        }}
      >
        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
          Date: <span style={{ color: 'var(--primary)' }}>{selectedDate}</span> | Marked:{' '}
          <strong>
            {markedCount}/{totalCount}
          </strong>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleSave}
          style={{
            borderRadius: 'var(--radius-full)',
            padding: '0.625rem 1.75rem',
            boxShadow: isDirty ? '0 4px 14px rgba(79, 70, 229, 0.4)' : 'none'
          }}
        >
          <Save size={18} />
          <span>Save Attendance Record</span>
        </button>
      </div>
    </div>
  );
};
