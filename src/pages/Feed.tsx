// src/pages/Feed.tsx
import { supabase } from '../supabase';

export function FeedPage() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-extrabold text-green-700 mb-4">Welcome to the Feed!</h1>
      <p className="text-lg text-gray-600 mb-8">You've successfully logged in.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
}
