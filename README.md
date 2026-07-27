# Aspire Academy - Student Attendance & Management System

A web app built for Aspire Academy to let students mark their daily attendance and help teachers manage student records and tuition fees.

Live Demo: https://aspire-academy-attendance.vercel.app/

---

## Features

### For Students
- **Self Check-in**: Select your name or roll number to mark attendance (Present, Late, or Absent) for today.
- **Privacy First**: Sensitive student details like fee status and payment balances are completely hidden from the student view.
- **Mobile Friendly**: Designed to work smoothly on smartphones and touchscreens.

### For Teachers & Admins
- **Secure Login**: Access the admin panel to manage classes and student records.
- **Fee Management**: Track tuition payment status (Paid, Pending, Overdue) with fee amounts in ₹.
- **Attendance Tracker**: View class-wise attendance, toggle statuses, and add notes or reasons for absences.
- **Reports**: See students with attendance below 75% and download directory reports as CSV.

---

## Demo Login Credentials

You can test the teacher admin panel using these demo accounts:

- **Admin Account**: `admin@aspire.edu.in` / `admin123`
- **Teacher Account**: `teacher@aspire.edu.in` / `teacher123`

---

## Tech Stack

- React 19
- Vite
- Vanilla CSS
- Lucide React (Icons)
- LocalStorage (for data persistence without needing a backend server setup)

---

## Local Setup

If you want to run this project locally on your machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/karan5028ji/aspire-academy-attendance.git
   cd aspire-academy-attendance
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173/` in your browser. To open on your mobile phone on the same Wi-Fi, use the Network IP address printed in your terminal.
