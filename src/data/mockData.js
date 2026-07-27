// Mock Data for Aspire Academy Institute Management System

export const INSTITUTION_NAME = 'Aspire Academy';

export const DEMO_USERS = {
  admin: {
    email: 'admin@aspire.edu.in',
    password: 'admin123',
    name: 'Prof. Rajesh Sharma',
    role: 'admin',
    designation: 'Head of Department'
  },
  teacher: {
    email: 'teacher@aspire.edu.in',
    password: 'teacher123',
    name: 'Dr. Sunita Rao',
    role: 'teacher',
    designation: 'Senior Faculty'
  }
};

export const INITIAL_COURSES = [
  'Computer Science & Engineering',
  'Business Administration (BBA)',
  'Data Science & AI',
  'Web Development & DevOps',
  'UI/UX & Graphic Design'
];

export const INITIAL_STUDENTS = [
  {
    id: 'STU-1001',
    name: 'Aarav Sharma',
    rollNo: '2026-CSE-001',
    course: 'Computer Science & Engineering',
    batch: 'CSE-2026-A',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    gender: 'Male',
    feeStatus: 'Paid',
    feeAmount: 45000,
    pendingAmount: 0,
    joinDate: '2025-08-01',
    emergencyContact: '+91 98111 22334'
  },
  {
    id: 'STU-1002',
    name: 'Ananya Iyer',
    rollNo: '2026-CSE-002',
    course: 'Computer Science & Engineering',
    batch: 'CSE-2026-A',
    phone: '+91 91234 56789',
    email: 'ananya.iyer@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    gender: 'Female',
    feeStatus: 'Paid',
    feeAmount: 45000,
    pendingAmount: 0,
    joinDate: '2025-08-01',
    emergencyContact: '+91 98222 33445'
  },
  {
    id: 'STU-1003',
    name: 'Rohan Verma',
    rollNo: '2026-DS-001',
    course: 'Data Science & AI',
    batch: 'DS-2026-B',
    phone: '+91 99887 76655',
    email: 'rohan.verma@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    gender: 'Male',
    feeStatus: 'Pending',
    feeAmount: 50000,
    pendingAmount: 15000,
    joinDate: '2025-08-05',
    emergencyContact: '+91 98333 44556'
  },
  {
    id: 'STU-1004',
    name: 'Priya Patel',
    rollNo: '2026-BBA-001',
    course: 'Business Administration (BBA)',
    batch: 'BBA-2026-A',
    phone: '+91 97654 32109',
    email: 'priya.patel@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    gender: 'Female',
    feeStatus: 'Paid',
    feeAmount: 40000,
    pendingAmount: 0,
    joinDate: '2025-08-02',
    emergencyContact: '+91 98444 55667'
  },
  {
    id: 'STU-1005',
    name: 'Kabir Mehta',
    rollNo: '2026-DEV-001',
    course: 'Web Development & DevOps',
    batch: 'DEV-2026-A',
    phone: '+91 96543 21098',
    email: 'kabir.mehta@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    gender: 'Male',
    feeStatus: 'Overdue',
    feeAmount: 42000,
    pendingAmount: 21000,
    joinDate: '2025-08-10',
    emergencyContact: '+91 98555 66778'
  },
  {
    id: 'STU-1006',
    name: 'Diya Malhotra',
    rollNo: '2026-DES-001',
    course: 'UI/UX & Graphic Design',
    batch: 'DES-2026-A',
    phone: '+91 95432 10987',
    email: 'diya.m@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    gender: 'Female',
    feeStatus: 'Paid',
    feeAmount: 38000,
    pendingAmount: 0,
    joinDate: '2025-08-03',
    emergencyContact: '+91 98666 77889'
  },
  {
    id: 'STU-1007',
    name: 'Ishaan Kapoor',
    rollNo: '2026-CSE-003',
    course: 'Computer Science & Engineering',
    batch: 'CSE-2026-A',
    phone: '+91 94321 09876',
    email: 'ishaan.k@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250',
    gender: 'Male',
    feeStatus: 'Pending',
    feeAmount: 45000,
    pendingAmount: 15000,
    joinDate: '2025-08-01',
    emergencyContact: '+91 98777 88990'
  },
  {
    id: 'STU-1008',
    name: 'Neha Reddy',
    rollNo: '2026-DS-002',
    course: 'Data Science & AI',
    batch: 'DS-2026-B',
    phone: '+91 93210 98765',
    email: 'neha.reddy@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    gender: 'Female',
    feeStatus: 'Paid',
    feeAmount: 50000,
    pendingAmount: 0,
    joinDate: '2025-08-05',
    emergencyContact: '+91 98888 99001'
  },
  {
    id: 'STU-1009',
    name: 'Devansh Joshi',
    rollNo: '2026-DEV-002',
    course: 'Web Development & DevOps',
    batch: 'DEV-2026-A',
    phone: '+91 92109 87654',
    email: 'devansh.j@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    gender: 'Male',
    feeStatus: 'Paid',
    feeAmount: 42000,
    pendingAmount: 0,
    joinDate: '2025-08-12',
    emergencyContact: '+91 98999 00112'
  },
  {
    id: 'STU-1010',
    name: 'Sanjana Gupta',
    rollNo: '2026-BBA-002',
    course: 'Business Administration (BBA)',
    batch: 'BBA-2026-A',
    phone: '+91 91098 76543',
    email: 'sanjana.g@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250',
    gender: 'Female',
    feeStatus: 'Overdue',
    feeAmount: 40000,
    pendingAmount: 20000,
    joinDate: '2025-08-02',
    emergencyContact: '+91 98000 11223'
  },
  {
    id: 'STU-1011',
    name: 'Siddharth Saxena',
    rollNo: '2026-CSE-004',
    course: 'Computer Science & Engineering',
    batch: 'CSE-2026-A',
    phone: '+91 90987 65432',
    email: 'siddharth.s@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    gender: 'Male',
    feeStatus: 'Paid',
    feeAmount: 45000,
    pendingAmount: 0,
    joinDate: '2025-08-01',
    emergencyContact: '+91 98111 33445'
  },
  {
    id: 'STU-1012',
    name: 'Kavya Menon',
    rollNo: '2026-DES-002',
    course: 'UI/UX & Graphic Design',
    batch: 'DES-2026-A',
    phone: '+91 98987 65431',
    email: 'kavya.menon@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=250',
    gender: 'Female',
    feeStatus: 'Pending',
    feeAmount: 38000,
    pendingAmount: 12000,
    joinDate: '2025-08-03',
    emergencyContact: '+91 98222 44556'
  },
  {
    id: 'STU-1013',
    name: 'Aditya Nair',
    rollNo: '2026-DS-003',
    course: 'Data Science & AI',
    batch: 'DS-2026-B',
    phone: '+91 97876 54321',
    email: 'aditya.nair@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    gender: 'Male',
    feeStatus: 'Paid',
    feeAmount: 50000,
    pendingAmount: 0,
    joinDate: '2025-08-05',
    emergencyContact: '+91 98333 55667'
  },
  {
    id: 'STU-1014',
    name: 'Tanvi Deshmukh',
    rollNo: '2026-BBA-003',
    course: 'Business Administration (BBA)',
    batch: 'BBA-2026-A',
    phone: '+91 96765 43210',
    email: 'tanvi.d@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    gender: 'Female',
    feeStatus: 'Paid',
    feeAmount: 40000,
    pendingAmount: 0,
    joinDate: '2025-08-02',
    emergencyContact: '+91 98444 66778'
  },
  {
    id: 'STU-1015',
    name: 'Arjun Singhania',
    rollNo: '2026-DEV-003',
    course: 'Web Development & DevOps',
    batch: 'DEV-2026-A',
    phone: '+91 95654 32109',
    email: 'arjun.s@aspire.edu.in',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=250',
    gender: 'Male',
    feeStatus: 'Pending',
    feeAmount: 42000,
    pendingAmount: 14000,
    joinDate: '2025-08-12',
    emergencyContact: '+91 98555 77889'
  }
];

export const getFormattedDate = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const TODAY_DATE = getFormattedDate(0);
export const YESTERDAY_DATE = getFormattedDate(-1);
export const TWO_DAYS_AGO = getFormattedDate(-2);
export const THREE_DAYS_AGO = getFormattedDate(-3);

export const INITIAL_ATTENDANCE = {
  [TODAY_DATE]: {
    'STU-1001': { status: 'Present', note: 'Arrived on time' },
    'STU-1002': { status: 'Present', note: '' },
    'STU-1003': { status: 'Absent', note: 'Medical leave' },
    'STU-1004': { status: 'Present', note: '' },
    'STU-1005': { status: 'Late', note: '15 mins late - traffic' },
    'STU-1006': { status: 'Present', note: '' },
    'STU-1007': { status: 'Present', note: '' },
    'STU-1008': { status: 'Present', note: '' },
    'STU-1009': { status: 'Present', note: '' },
    'STU-1010': { status: 'Absent', note: 'Uninformed absence' },
    'STU-1011': { status: 'Present', note: '' },
    'STU-1012': { status: 'Late', note: 'Bus delay' },
    'STU-1013': { status: 'Present', note: '' },
    'STU-1014': { status: 'Present', note: '' },
    'STU-1015': { status: 'Present', note: '' }
  },
  [YESTERDAY_DATE]: {
    'STU-1001': { status: 'Present', note: '' },
    'STU-1002': { status: 'Present', note: '' },
    'STU-1003': { status: 'Present', note: '' },
    'STU-1004': { status: 'Present', note: '' },
    'STU-1005': { status: 'Absent', note: '' },
    'STU-1006': { status: 'Present', note: '' },
    'STU-1007': { status: 'Present', note: '' },
    'STU-1008': { status: 'Late', note: '' },
    'STU-1009': { status: 'Present', note: '' },
    'STU-1010': { status: 'Present', note: '' },
    'STU-1011': { status: 'Present', note: '' },
    'STU-1012': { status: 'Present', note: '' },
    'STU-1013': { status: 'Present', note: '' },
    'STU-1014': { status: 'Absent', note: '' },
    'STU-1015': { status: 'Present', note: '' }
  }
};
