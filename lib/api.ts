// lib/api.ts
import axios from 'axios';
import { IUser } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // This is crucial for sending cookies
});

export const fetchCurrentUser = async (): Promise<IUser> => {
  const { data } = await api.get('/api/auth/me');
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post('/api/auth/logout');
  return data;
};