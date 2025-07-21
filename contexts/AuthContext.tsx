// contexts/AuthContext.tsx
'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { IUser } from '@/types';
import { fetchCurrentUser, logoutUser } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.log('No active session');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};