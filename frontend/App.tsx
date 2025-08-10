import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import SplashScreens from './components/SplashScreens';
import Dashboard from './components/Dashboard';
import TicketPayment from './components/TicketPayment';
import SpeakerSystem from './components/SpeakerSystem';
import Schedule from './components/Schedule';
import Profile from './components/Profile';
import SocialNetworking from './components/SocialNetworking';
import PhotoSharing from './components/PhotoSharing';
import AttendeeGuide from './components/AttendeeGuide';
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

function AppInner() {
  const [showSplash, setShowSplash] = React.useState(true);

  if (showSplash) {
    return <SplashScreens onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketPayment />} />
          <Route path="/speakers" element={<SpeakerSystem />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/networking" element={<SocialNetworking />} />
          <Route path="/photos" element={<PhotoSharing />} />
          <Route path="/guide" element={<AttendeeGuide />} />
        </Routes>
        <Navigation />
        <Toaster />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
