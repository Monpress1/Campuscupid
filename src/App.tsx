// src/App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/Auth';
import { FeedPage } from './pages/Feed';
import { ProfilePage } from './pages/ProfilePage';
import { supabase } from './supabase';

function AppContent() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={session ? <Navigate to="/feed" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/feed" element={session ? <FeedPage /> : <Navigate to="/login" />} />
      <Route path="/profile" element={session ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
