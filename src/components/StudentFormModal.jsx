import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';
import { User, Phone, Mail, BookOpen, CreditCard, ShieldAlert, Image } from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'
];

export const StudentFormModal = () => {
  const {
    isStudentModalOpen,
    setIsStudentModalOpen,
    editingStudent,
    setEditingStudent,
    courses,
    addStudent,
    updateStudent
  } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    course: courses[0] || 'Computer Science',
    batch: '',
    phone: '',
    email: '',
    avatar: PRESET_AVATARS[0],
    gender: 'Male',
    feeStatus: 'Paid',
    pendingAmount: 0,
    emergencyContact: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        rollNo: editingStudent.rollNo || '',
        course: editingStudent.course || courses[0],
        batch: editingStudent.batch || '',
        phone: editingStudent.phone || '',
        email: editingStudent.email || '',
        avatar: editingStudent.avatar || PRESET_AVATARS[0],
        gender: editingStudent.gender || 'Male',
        feeStatus: editingStudent.feeStatus || 'Paid',
        pendingAmount: editingStudent.pendingAmount || 0,
        emergencyContact: editingStudent.emergencyContact || ''
      });
    } else {
      setFormData({
        name: '',
        rollNo: `2026-${courses[0].slice(0, 2).toUpperCase()}-099`,
        course: courses[0] || 'Computer Science',
        batch: `${courses[0].slice(0, 2).toUpperCase()}-2026-A`,
        phone: '',
        email: '',
        avatar: PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)],
        gender: 'Male',
        feeStatus: 'Paid',
        pendingAmount: 0,
        emergencyContact: ''
      });
    }
  }, [editingStudent, isStudentModalOpen, courses]);

  const handleClose = () => {
    setIsStudentModalOpen(false);
    setEditingStudent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent(formData);
    }
    handleClose();
  };

  return (
    <Modal
      isOpen={isStudentModalOpen}
      onClose={handleClose}
      title={editingStudent ? `Edit Student Details` : `Add New Student`}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            {editingStudent ? 'Save Changes' : 'Add Student'}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group full-width">
          <label className="form-label">Student Photo Avatar</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
            <img
              src={formData.avatar}
              alt="Avatar Preview"
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1 }}>
              {PRESET_AVATARS.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Preset ${i}`}
                  onClick={() => setFormData({ ...formData, avatar: url })}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: formData.avatar === url ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    opacity: formData.avatar === url ? 1 : 0.6
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="form-group full-width">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-input"
            required
            placeholder="e.g. Jane Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Roll / Student ID *</label>
          <input
            type="text"
            className="form-input"
            required
            placeholder="e.g. 2026-CS-001"
            value={formData.rollNo}
            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Course / Class *</label>
          <select
            className="form-select"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          >
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Batch Code</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. CS-2026-A"
            value={formData.batch}
            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Contact Number *</label>
          <input
            type="tel"
            className="form-input"
            required
            placeholder="e.g. +1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            className="form-input"
            required
            placeholder="e.g. jane@edupulse.edu"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Fee Status</label>
          <select
            className="form-select"
            value={formData.feeStatus}
            onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        {formData.feeStatus !== 'Paid' && (
          <div className="form-group">
            <label className="form-label">Pending Amount (₹)</label>
            <input
              type="number"
              className="form-input"
              placeholder="15000"
              value={formData.pendingAmount}
              onChange={(e) => setFormData({ ...formData, pendingAmount: Number(e.target.value) })}
            />
          </div>
        )}

        <div className="form-group full-width">
          <label className="form-label">Emergency Contact Phone</label>
          <input
            type="tel"
            className="form-input"
            placeholder="e.g. +1 (555) 999-8888"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
          />
        </div>
      </form>
    </Modal>
  );
};
