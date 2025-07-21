// app/dashboard/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Spinner from '@/components/ui/Spinner';

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user, redirect to home
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  // While loading, show a spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // If there's a user, show the dashboard content
  return user ? (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-xl">Welcome back, {user.displayName}!</p>
      <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-2xl font-semibold">Your Profile Information</h2>
        <ul className="mt-4 space-y-2">
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Google ID:</strong> {user.googleId}</li>
            <li><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  ) : null; // or a redirect message, though useEffect handles the redirect
}