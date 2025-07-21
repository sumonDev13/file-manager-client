'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null; // Or loading spinner

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Profile</h1>
        <div className="space-y-4">
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          {user.avatar && (
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="h-20 w-20 rounded-full"
            />
          )}
          <button
            onClick={logout}
            className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sign Out
          </button>
          <Link href="/" className="block text-center text-blue-500">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}