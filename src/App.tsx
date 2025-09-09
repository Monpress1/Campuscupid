// src/App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/Auth';
import { FeedPage } from './pages/Feed';
import { ProfilePage } from './pages/ProfilePage';
import { supabase } from './supabase';

function AppContent() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate('/feed');
      } else {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, session]); // 'session' added to the dependency array

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={session ? <Navigate to="/feed" /> : <Navigate to="/login" />} 
      />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/feed" element={session ? <FeedPage /> : <AuthPage />} />
      <Route path="/profile" element={session ? <ProfilePage /> : <AuthPage />} />
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
