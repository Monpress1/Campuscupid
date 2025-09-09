// src/pages/Auth.tsx
import { useState } from 'react';
import { supabase } from '../supabase';

export function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('sign_in'); // Can be 'sign_in', 'sign_up', or 'forgot_password'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://vfbjwkfurleatfdrabdg.supabase.co/auth/v1/verify',
    });
    if (error) {
      alert(error.message);
    } else {
      alert('Password reset link sent! Check your email.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {view === 'forgot_password' ? 'Forgot Password' : 'Login or Sign Up'}
      </h1>

      {view === 'sign_in' || view === 'sign_up' ? (
        <form onSubmit={view === 'sign_in' ? handleLogin : handleSignup} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Loading...' : view === 'sign_in' ? 'Login' : 'Sign Up'}
          </button>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setView(view === 'sign_in' ? 'sign_up' : 'sign_in')}
              className="text-gray-600 hover:underline"
            >
              {view === 'sign_in' ? 'Don\'t have an account? Sign up' : 'Already have an account? Login'}
            </button>
          </div>
          <div className="mt-2 text-center">
            <button
              type="button"
              onClick={() => setView('forgot_password')}
              className="text-blue-500 hover:underline"
            >
              Forgot your password?
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handlePasswordReset} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Send reset link'}
          </button>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setView('sign_in')}
              className="text-gray-600 hover:underline"
            >
              Back to login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
