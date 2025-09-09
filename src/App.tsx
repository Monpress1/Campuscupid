// src/App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthPage } from './pages/Auth';
import { FeedPage } from './pages/Feed';
import { ProfilePage } from './pages/ProfilePage'; // New import
import { supabase } from './supabase';

// This component manages the session and routing.
function AppContent() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for an existing session on app load.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes in the authentication state.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate('/feed');
      } else {
        navigate('/login');
      }
    });

    // Clean up the subscription when the component unmounts.
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/feed" element={session ? <FeedPage /> : <AuthPage />} />
      <Route path="/profile" element={session ? <ProfilePage /> : <AuthPage />} />
    </Routes>
  );
}

// You'll need to wrap your app in the Router.
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
