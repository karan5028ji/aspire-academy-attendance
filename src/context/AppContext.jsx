import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STUDENTS, INITIAL_ATTENDANCE, INITIAL_COURSES, TODAY_DATE, DEMO_USERS, INSTITUTION_NAME } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & Role State
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('aspire_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
    // Default to student mode so user side is primary for students
    return { role: 'student', name: 'Student Guest' };
  });

  // Students state with localStorage
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('aspire_students');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse students from localStorage', e);
      }
    }
    return INITIAL_STUDENTS;
  });

  // Attendance records state with localStorage
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('aspire_attendance');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse attendance from localStorage', e);
      }
    }
    return INITIAL_ATTENDANCE;
  });

  // UI state
  const [activeTab, setActiveTab] = useState(() => {
    const savedUser = localStorage.getItem('aspire_user');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      return u.role === 'admin' || u.role === 'teacher' ? 'dashboard' : 'student-portal';
    }
    return 'student-portal';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All Courses');
  const [selectedDate, setSelectedDate] = useState(TODAY_DATE);
  
  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem('aspire_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('aspire_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('aspire_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Actions
  const login = (email, password) => {
    const matchedUser = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      setCurrentUser(matchedUser);
      setActiveTab('dashboard');
      setIsLoginModalOpen(false);
      showToast(`Welcome back, ${matchedUser.name}! (Admin Access Granted)`, 'success');
      return true;
    } else {
      showToast('Invalid credentials! Try demo: admin@aspire.edu / admin123', 'danger');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser({ role: 'student', name: 'Student Guest' });
    setActiveTab('student-portal');
    showToast('Logged out of Admin Panel. Switched to Student Portal mode.', 'info');
  };

  // Student Actions
  const addStudent = (studentData) => {
    const newId = `STU-${1000 + students.length + 1}`;
    const newStudent = {
      ...studentData,
      id: newId,
      joinDate: new Date().toISOString().split('T')[0],
      pendingAmount: studentData.feeStatus === 'Paid' ? 0 : Number(studentData.pendingAmount || 1000)
    };
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Student ${newStudent.name} (${newStudent.id}) added successfully!`, 'success');
  };

  const updateStudent = (id, updatedFields) => {
    setStudents((prev) =>
      prev.map((stu) => (stu.id === id ? { ...stu, ...updatedFields } : stu))
    );
    showToast(`Updated details for student ID ${id}`, 'success');
  };

  const deleteStudent = (id) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    if (viewingStudent && viewingStudent.id === id) {
      setViewingStudent(null);
    }
    showToast(`Removed student ${student ? student.name : id} from directory`, 'warning');
  };

  // Attendance Actions
  const saveAttendanceRecord = (date, dayRecords) => {
    setAttendance((prev) => ({
      ...prev,
      [date]: {
        ...(prev[date] || {}),
        ...dayRecords
      }
    }));
    showToast(`Attendance saved for ${date}!`, 'success');
  };

  // Student Self-Marking Action
  const markStudentSelfAttendance = (studentId, status = 'Present', note = 'Marked by student self-check-in') => {
    const today = TODAY_DATE;
    setAttendance((prev) => ({
      ...prev,
      [today]: {
        ...(prev[today] || {}),
        [studentId]: { status, note, timestamp: new Date().toLocaleTimeString() }
      }
    }));
    const student = students.find((s) => s.id === studentId || s.rollNo === studentId);
    showToast(`Attendance marked as ${status} for ${student ? student.name : studentId}!`, 'success');
  };

  // Calculations
  const getAttendanceForDate = (date) => {
    return attendance[date] || {};
  };

  const getStudentStats = (studentId) => {
    let totalDays = 0;
    let presentDays = 0;
    let absentDays = 0;
    let lateDays = 0;

    Object.keys(attendance).forEach((date) => {
      const dayRec = attendance[date][studentId];
      if (dayRec) {
        totalDays++;
        if (dayRec.status === 'Present') presentDays++;
        else if (dayRec.status === 'Absent') absentDays++;
        else if (dayRec.status === 'Late') lateDays++;
      }
    });

    const percentage = totalDays > 0 ? Math.round(((presentDays + lateDays) / totalDays) * 100) : 100;

    return {
      totalDays,
      presentDays,
      absentDays,
      lateDays,
      percentage
    };
  };

  const getOverallStats = (date = TODAY_DATE, courseFilter = 'All Courses') => {
    let filtered = students;
    if (courseFilter !== 'All Courses') {
      filtered = students.filter((s) => s.course === courseFilter);
    }

    const dayAttendance = attendance[date] || {};
    let present = 0;
    let absent = 0;
    let late = 0;
    let unmarked = 0;

    filtered.forEach((stu) => {
      const rec = dayAttendance[stu.id];
      if (!rec) {
        unmarked++;
      } else if (rec.status === 'Present') {
        present++;
      } else if (rec.status === 'Absent') {
        absent++;
      } else if (rec.status === 'Late') {
        late++;
      }
    });

    const total = filtered.length;
    const markedTotal = present + absent + late;
    const percentage = markedTotal > 0 ? Math.round(((present + late) / total) * 100) : 0;

    return {
      total,
      present,
      absent,
      late,
      unmarked,
      percentage
    };
  };

  // CSV Export
  const exportStudentsCSV = () => {
    const headers = ['Student ID', 'Full Name', 'Roll Number', 'Course', 'Batch', 'Phone', 'Email', 'Fee Status', 'Pending Amount', 'Join Date'];
    const rows = students.map((s) => [
      s.id,
      `"${s.name}"`,
      s.rollNo,
      `"${s.course}"`,
      s.batch,
      s.phone,
      s.email,
      s.feeStatus,
      s.pendingAmount,
      s.joinDate
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AspireAcademy_Students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported student directory to CSV!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        institutionName: INSTITUTION_NAME,
        currentUser,
        login,
        logout,
        students,
        courses: INITIAL_COURSES,
        attendance,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCourseFilter,
        setSelectedCourseFilter,
        selectedDate,
        setSelectedDate,
        isStudentModalOpen,
        setIsStudentModalOpen,
        editingStudent,
        setEditingStudent,
        viewingStudent,
        setViewingStudent,
        isLoginModalOpen,
        setIsLoginModalOpen,
        toasts,
        showToast,
        removeToast,
        addStudent,
        updateStudent,
        deleteStudent,
        saveAttendanceRecord,
        markStudentSelfAttendance,
        getAttendanceForDate,
        getStudentStats,
        getOverallStats,
        exportStudentsCSV
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
