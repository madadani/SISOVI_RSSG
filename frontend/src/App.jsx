import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './shared/layouts/MainLayout';
import DashboardLayout from './shared/layouts/DashboardLayout';
import HomePage from './features/home/presentation/HomePage';
import ScreeningForm from './features/screening/presentation/ScreeningForm';
import CertificatePage from './features/certificate/presentation/CertificatePage';
import UploadDocumentPage from './features/document/presentation/UploadDocumentPage';
import LoginPage from './features/auth/presentation/LoginPage';
import DashboardPage from './features/dashboard/presentation/DashboardPage';
import PatientManagementPage from './features/dashboard/presentation/pages/PatientManagementPage';
import VaccineManagementPage from './features/dashboard/presentation/pages/VaccineManagementPage';
import QueueManagementPage from './features/dashboard/presentation/pages/QueueManagementPage';
import CertificateManagementPage from './features/dashboard/presentation/pages/CertificateManagementPage';
import { ThemeProvider } from './core/contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/screening" element={<MainLayout><ScreeningForm /></MainLayout>} />
        <Route path="/certificate" element={<MainLayout><CertificatePage /></MainLayout>} />
        <Route path="/upload-document" element={<MainLayout><UploadDocumentPage /></MainLayout>} />
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        
        {/* Admin Routes with DashboardLayout */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/dashboard/patients" element={<DashboardLayout><PatientManagementPage /></DashboardLayout>} />
        <Route path="/dashboard/vaccines" element={<DashboardLayout><VaccineManagementPage /></DashboardLayout>} />
        <Route path="/dashboard/queues" element={<DashboardLayout><QueueManagementPage /></DashboardLayout>} />
        <Route path="/dashboard/certificates" element={<DashboardLayout><CertificateManagementPage /></DashboardLayout>} />
      </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
