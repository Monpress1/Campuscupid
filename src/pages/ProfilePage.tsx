// src/pages/ProfilePage.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select(`full_name, avatar_url, bio, interests, is_premium, boosted_until`)
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error.message);
        } else {
          setProfile(data);
        }
      }
      setLoading(false);
    }

    getProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">No profile found.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{profile.full_name || 'Anonymous User'}</h1>
        <div className="flex items-center mb-4">
          <img src={profile.avatar_url || 'https://via.placeholder.com/150'} alt="Profile" className="w-24 h-24 rounded-full mr-4 object-cover" />
          <div>
            <p className="text-lg text-gray-700">{profile.bio}</p>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {profile.interests && profile.interests.map((interest, index) => (
              <span key={index} className="bg-blue-200 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{interest}</span>
            ))}
          </div>
        </div>
        {profile.is_premium && (
          <p className="text-green-600 font-bold">⭐ Premium User</p>
        )}
      </div>
    </div>
  );
}
