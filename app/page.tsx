
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../lib/features/hooks';
import { checkAuth } from '@/lib/features/auth/authSlice';
import Link from 'next/link';
import { FileIcon, FolderIcon, UploadIcon } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/google`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            File Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organize, manage, and access your files from anywhere. Simple, secure, and fast.
          </p>
          
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            Sign in with Google
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-blue-600 mb-4">
              <UploadIcon size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Upload</h3>
            <p className="text-gray-600">
              Drag and drop or click to upload your files instantly
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-blue-600 mb-4">
              <FolderIcon size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Organize</h3>
            <p className="text-gray-600">
              Create folders and organize your files the way you want
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-blue-600 mb-4">
              <FileIcon size={48} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Access Anywhere</h3>
            <p className="text-gray-600">
              Access your files from any device, anywhere in the world
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
