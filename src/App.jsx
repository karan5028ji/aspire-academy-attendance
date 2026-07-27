import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer';
import { StudentFormModal } from './components/StudentFormModal';
import { StudentProfileModal } from './components/StudentProfileModal';

import { DashboardView } from './views/DashboardView';
import { StudentsView } from './views/StudentsView';
import { AttendanceView } from './views/AttendanceView';
import { ReportsView } from './views/ReportsView';
import { StudentPortalView } from './views/StudentPortalView';
import { LoginPage } from './views/LoginPage';

const MainContent = () => {
  const { activeTab, currentUser } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'teacher');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'student-portal':
        return <StudentPortalView />;
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return isAdmin ? <DashboardView /> : <LoginPage />;
      case 'students':
        return isAdmin ? <StudentsView /> : <LoginPage />;
      case 'attendance':
        return isAdmin ? <AttendanceView /> : <LoginPage />;
      case 'reports':
        return isAdmin ? <ReportsView /> : <LoginPage />;
      default:
        return <StudentPortalView />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="main-wrapper">
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
        <main className="content-area">{renderActiveView()}</main>
      </div>

      <StudentFormModal />
      <StudentProfileModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
