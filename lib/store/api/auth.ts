import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/api/auth/google`;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/api/auth/me`, {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
};