import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Plus,
  Download,
  Filter,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  UserX
} from 'lucide-react';

export const StudentsView = () => {
  const {
    students,
    courses,
    searchQuery,
    setSearchQuery,
    selectedCourseFilter,
    setSelectedCourseFilter,
    setIsStudentModalOpen,
    setEditingStudent,
    setViewingStudent,
    deleteStudent,
    exportStudentsCSV
  } = useApp();

  const [feeStatusFilter, setFeeStatusFilter] = useState('All');

  // Filter students based on search and dropdown filters
  const filteredStudents = students.filter((stu) => {
    const matchesSearch =
      stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stu.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stu.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stu.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse =
      selectedCourseFilter === 'All Courses' || stu.course === selectedCourseFilter;

    const matchesFee =
      feeStatusFilter === 'All' || stu.feeStatus === feeStatusFilter;

    return matchesSearch && matchesCourse && matchesFee;
  });

  const handleAddNew = () => {
    setEditingStudent(null);
    setIsStudentModalOpen(true);
  };

  const handleEdit = (stu, e) => {
    e.stopPropagation();
    setEditingStudent(stu);
    setIsStudentModalOpen(true);
  };

  const handleDelete = (id, name, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove ${name} from the student directory?`)) {
      deleteStudent(id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Action & Filter Controls Bar */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '240px', flex: 1 }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-light)'
              }}
            />
            <input
              type="text"
              className="form-input"
              style={{ width: '100%', paddingLeft: '2.25rem' }}
              placeholder="Search by name, roll ID, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Course Filter Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              className="form-select"
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
            >
              <option value="All Courses">All Courses</option>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Fee Status Dropdown */}
          <select
            className="form-select"
            value={feeStatusFilter}
            onChange={(e) => setFeeStatusFilter(e.target.value)}
          >
            <option value="All">All Fee Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary btn-sm" onClick={exportStudentsCSV}>
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleAddNew}>
              <Plus size={16} />
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Photo & Name</th>
              <th>Roll / Student ID</th>
              <th>Course / Class</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Fees Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((stu) => (
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
                        <div className="student-id">{stu.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{stu.rollNo}</td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-card-subtle)',
                        fontSize: '0.8125rem',
                        fontWeight: 500
                      }}
                    >
                      {stu.course}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem' }}>
                      <Phone size={13} color="var(--text-light)" />
                      <span>{stu.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem' }}>
                      <Mail size={13} color="var(--text-light)" />
                      <span>{stu.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${stu.feeStatus.toLowerCase()}`}>
                      {stu.feeStatus}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        gap: '0.375rem'
                      }}
                    >
                      <button
                        className="btn btn-secondary btn-sm"
                        title="View Profile"
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewingStudent(stu);
                        }}
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        title="Edit Details"
                        onClick={(e) => handleEdit(stu, e)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        title="Delete Student"
                        onClick={(e) => handleDelete(stu.id, stu.name, e)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                    <UserX size={40} color="var(--text-light)" />
                    <div style={{ fontSize: '1rem', fontWeight: 600 }}>No students found</div>
                    <div style={{ fontSize: '0.875rem' }}>
                      Try adjusting your search criteria or add a new student.
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={handleAddNew} style={{ marginTop: '0.5rem' }}>
                      <Plus size={16} />
                      <span>Add New Student</span>
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
