import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadFile = async (file: File, folderId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folderId', folderId);

  const response = await axios.post(`${API_URL}/api/files/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return response.data;
};

export const getFiles = async (folderId: string) => {
  const response = await axios.get(`${API_URL}/api/files/${folderId}`, {
    withCredentials: true,
  });
  return response.data;
};