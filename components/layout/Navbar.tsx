'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import LoginButton from '../auth/LoginButton';
import UserProfile from '../auth/UserProfile';
import Spinner from '../ui/Spinner';

const Navbar = () => {
  const { user, isLoading } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          MyApp
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>
          <div className="w-48 text-right">
             {isLoading ? <Spinner /> : !user ? <LoginButton /> : <UserProfile />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;