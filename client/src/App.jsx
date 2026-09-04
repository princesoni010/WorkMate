import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { LocationProvider } from './context/LocationContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Loader from './components/common/Loader';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/public/LandingPage'));
const LoginPage = lazy(() => import('./pages/public/LoginPage'));
const RegisterPage = lazy(() => import('./pages/public/RegisterPage'));

// Customer Pages
const CustomerHome = lazy(() => import('./pages/customer/Home'));
const CustomerSearch = lazy(() => import('./pages/customer/Search'));
const WorkerProfile = lazy(() => import('./pages/customer/WorkerProfile'));
const BookingForm = lazy(() => import('./pages/customer/BookingForm'));
const MyBookings = lazy(() => import('./pages/customer/MyBookings'));
const PaymentPage = lazy(() => import('./pages/customer/PaymentPage'));
const CustomerProfile = lazy(() => import('./pages/customer/CustomerProfile'));

// Worker Pages
const WorkerRegister = lazy(() => import('./pages/worker/WorkerRegister'));
const WorkerHome = lazy(() => import('./pages/worker/WorkerHome'));
const Jobs = lazy(() => import('./pages/worker/Jobs'));
const Earnings = lazy(() => import('./pages/worker/Earnings'));
const WorkerProfileView = lazy(() => import('./pages/worker/WorkerProfileView'));

// Admin Pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const VerifyWorkers = lazy(() => import('./pages/admin/VerifyWorkers'));
const AdminBookings = lazy(() => import('./pages/admin/AdminBookings'));
const WelfareLedger = lazy(() => import('./pages/admin/WelfareLedger'));
const Grievances = lazy(() => import('./pages/admin/Grievances'));
const Forecast = lazy(() => import('./pages/admin/Forecast'));

const AppLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <BottomNav />
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="min-h-screen flex bg-gray-50">
    <main className="flex-grow">{children}</main>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <LocationProvider>
        <AuthProvider>
          <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader size="lg" text="Loading WorkMate..." /></div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<AppLayout><LandingPage /></AppLayout>} />
              <Route path="/login" element={<AppLayout><LoginPage /></AppLayout>} />
              <Route path="/register" element={<AppLayout><RegisterPage /></AppLayout>} />

              {/* Customer Routes */}
              <Route path="/customer/home" element={<ProtectedRoute roles={['customer']}><AppLayout><CustomerHome /></AppLayout></ProtectedRoute>} />
              <Route path="/customer/search" element={<ProtectedRoute roles={['customer']}><AppLayout><CustomerSearch /></AppLayout></ProtectedRoute>} />
              <Route path="/customer/worker/:id" element={<ProtectedRoute roles={['customer']}><AppLayout><WorkerProfile /></AppLayout></ProtectedRoute>} />
              <Route path="/customer/book" element={<ProtectedRoute roles={['customer']}><AppLayout><BookingForm /></AppLayout></ProtectedRoute>} />
              <Route path="/customer/book/:workerId" element={<ProtectedRoute roles={['customer']}><AppLayout><BookingForm /></AppLayout></ProtectedRoute>} />
              <Route path="/customer/bookings" element={<ProtectedRoute roles={['customer']}><AppLayout><MyBookings /></AppLayout></ProtectedRoute>} />
              <Route path="/customer/payment" element={<ProtectedRoute roles={['customer']}><AppLayout><PaymentPage /></AppLayout></ProtectedRoute>} />
              <Route path="/customer/payment/:bookingId" element={<ProtectedRoute roles={['customer']}><AppLayout><PaymentPage /></AppLayout></ProtectedRoute>} />
              <Route path="/customer/profile" element={<ProtectedRoute roles={['customer']}><AppLayout><CustomerProfile /></AppLayout></ProtectedRoute>} />

              {/* Worker Routes */}
              <Route path="/worker/register" element={<ProtectedRoute roles={['worker']}><AppLayout><WorkerRegister /></AppLayout></ProtectedRoute>} />
              <Route path="/worker/home" element={<ProtectedRoute roles={['worker']}><AppLayout><WorkerHome /></AppLayout></ProtectedRoute>} />
              <Route path="/worker/jobs" element={<ProtectedRoute roles={['worker']}><AppLayout><Jobs /></AppLayout></ProtectedRoute>} />
              <Route path="/worker/earnings" element={<ProtectedRoute roles={['worker']}><AppLayout><Earnings /></AppLayout></ProtectedRoute>} />
              <Route path="/worker/profile" element={<ProtectedRoute roles={['worker']}><AppLayout><WorkerProfileView /></AppLayout></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute roles={['society_admin', 'federation_admin']}><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/verify-workers" element={<ProtectedRoute roles={['society_admin', 'federation_admin']}><AdminLayout><VerifyWorkers /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/bookings" element={<ProtectedRoute roles={['society_admin', 'federation_admin']}><AdminLayout><AdminBookings /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/welfare" element={<ProtectedRoute roles={['society_admin', 'federation_admin']}><AdminLayout><WelfareLedger /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/grievances" element={<ProtectedRoute roles={['society_admin', 'federation_admin']}><AdminLayout><Grievances /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/forecast" element={<ProtectedRoute roles={['society_admin', 'federation_admin']}><AdminLayout><Forecast /></AdminLayout></ProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </LocationProvider>
    </LanguageProvider>
  );
}

export default App;
