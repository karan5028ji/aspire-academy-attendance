# 🎓 Aspire Academy — Student Management & Daily Attendance System

A modern, responsive, and mobile-friendly web application for educational institutes to manage student records, track daily attendance, monitor tuition fee balances, and analyze academic performance.

👉 **Live Production Demo**: [https://aspire-academy-attendance.vercel.app/](https://aspire-academy-attendance.vercel.app/)

![App Screenshot Banner](https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200)

---

## ✨ Features

### 📱 1. Student Portal (User Side / Public Access)
- **Self Check-in**: Students can search for their Name or Roll Number and record their attendance (**Present**, **Late**, **Absent**) for today.
- **Personal Performance**: View individual attendance rate % and past record summary.
- **Confidential Data Masking**: All tuition fee statuses, pending balances, and administrative management tools are hidden from the student view.

### 🔐 2. Teacher & Admin Panel (Protected Login)
- **Secure Login**: Protected login portal for faculty members.
- **Confidential Fee Directory**: Complete student database with payment statuses (**Paid**, **Pending**, **Overdue**), total fees, and pending balances in Indian Rupees (₹).
- **Student CRUD**: Add new students, edit details, and delete student records.
- **Analytics & Risk Reports**: Automated alerts for low attendance (< 75%) and fee defaulter balance tracking.
- **CSV Export**: One-click master CSV report download.

### 📅 3. Daily Attendance Management (Teacher Side)
- **Date Picker Header**: Quickly navigate between dates or select today.
- **Course Filter**: Filter students by department/course.
- **Bulk Toggles**: "Mark All Present", "Mark All Absent", or "Reset All" buttons.
- **Live Counter**: Real-time counter of Present, Absent, Late, Unmarked, and overall percentage.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS with custom design tokens, modern glassmorphism, and mobile-first media queries.
- **Icons**: `lucide-react`
- **Data Persistence**: LocalStorage (works out of the box with zero backend setup required).

---

## 🔑 Demo Credentials

To test the **Teacher / Admin Panel**, use the demo credentials below:

- **Admin Login**: `admin@aspire.edu.in` / `admin123` (Prof. Rajesh Sharma)
- **Teacher Login**: `teacher@aspire.edu.in` / `teacher123` (Dr. Sunita Rao)

---

## 🚀 Local Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/karan5028ji/aspire-academy-attendance.git
   cd aspire-academy-attendance
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server** (accessible on local network/mobile phone):
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` on your computer or `http://<YOUR-IP>:5173/` on your phone!

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```
