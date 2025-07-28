
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface FileItem {
  _id: string;
  name: string;
  path: string;
  mimetype: string;
  size: number;
  owner: string;
  parentFolder?: string;
  createdAt: string;
  updatedAt: string;
}

interface FileState {
  files: FileItem[];
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;
}

const initialState: FileState = {
  files: [],
  isLoading: false,
  error: null,
  uploadProgress: 0,
};

export const uploadFile = createAsyncThunk(
  'files/uploadFile',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/files/upload`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action: PayloadAction<FileItem>) => {
        state.isLoading = false;
        state.files.push(action.payload);
        state.uploadProgress = 0;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.uploadProgress = 0;
      });
  },
});

export const { clearError, setUploadProgress } = fileSlice.actions;
export default fileSlice.reducer;
