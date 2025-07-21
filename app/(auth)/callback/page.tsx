'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'universal-cookie';
// import { toast } from 'react-hot-toast';

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const cookies = new Cookies();

  useEffect(() => {
    const handleAuth = async () => {
      const token = params.get('token');
      const error = params.get('error');

      if (error) {
        // toast.error(`Authentication failed: ${error}`);
        router.push('/auth/login');
        return;
      }

      if (!token) {
        // toast.error('Missing authentication token');
        router.push('/auth/login');
        return;
      }

      try {
        // Store token
        cookies.set('jwt', token, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60,
        });

        // Verify token by fetching user
        const res = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Token verification failed');

        // Redirect to profile or original destination
        const returnTo = cookies.get('returnTo') || '/protected/profile';
        cookies.remove('returnTo');
        router.push(returnTo);
        
      } catch (err) {
        cookies.remove('jwt');
        // toast.error('Authentication failed. Please try again.');
        router.push('/auth/login');
      }
    };

    handleAuth();
  }, [params, router, cookies]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <h2 className="text-xl font-medium">Completing authentication...</h2>
      <p className="text-gray-500 mt-2">You'll be redirected automatically</p>
    </div>
  );
}