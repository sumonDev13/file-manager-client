import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/store/store';
import { fetchFilesStart, fetchFilesSuccess, fetchFilesFailure } from '../lib/store/slices/fileSlice';
import { getFiles } from '../lib/store/api/files';

export const useFiles = (folderId: string) => {
  const dispatch = useDispatch();
  const { files, folders, loading, error } = useSelector((state: RootState) => state.files);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchFilesStart());
      try {
        const data = await getFiles(folderId);
        dispatch(fetchFilesSuccess(data));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        dispatch(fetchFilesFailure(errorMessage));
      }
    };

    fetchData();
  }, [folderId, dispatch]);

  return { files, folders, loading, error };
};