import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../lib/store/slices/authSlice';
import { getCurrentUser } from '@/lib/store/api/auth';

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        dispatch(loginSuccess(user));
      } catch (error) {
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);
};