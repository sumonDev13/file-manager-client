import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
  currentFolder: string | null;
  files: any[];
  folders: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FileState = {
  currentFolder: null,
  files: [],
  folders: [],
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setCurrentFolder(state, action: PayloadAction<string>) {
      state.currentFolder = action.payload;
    },
    fetchFilesStart(state) {
      state.loading = true;
    },
    fetchFilesSuccess(state, action: PayloadAction<{ files: any[]; folders: any[] }>) {
      state.files = action.payload.files;
      state.folders = action.payload.folders;
      state.loading = false;
    },
    fetchFilesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addFile(state, action: PayloadAction<any>) {
      state.files.push(action.payload);
    },
    deleteFile(state, action: PayloadAction<string>) {
      state.files = state.files.filter((file) => file._id !== action.payload);
    },
  },
});

export const {
  setCurrentFolder,
  fetchFilesStart,
  fetchFilesSuccess,
  fetchFilesFailure,
  addFile,
  deleteFile,
} = fileSlice.actions;
export default fileSlice.reducer;