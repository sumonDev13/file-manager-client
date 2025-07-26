import { File } from '@/types';
import { deleteFile } from '@/lib/store/slices/fileSlice';
import { useDispatch } from 'react-redux';

interface FileItemProps {
  file: File;
}

export default function FileItem({ file }: FileItemProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFile(file._id));
    // Call API to delete file
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">{file.name}</h3>
          <p className="text-sm text-gray-500">{file.type}</p>
        </div>
        <button onClick={handleDelete} className="text-red-500">
          Delete
        </button>
      </div>
      {/* Add preview for images/videos */}
    </div>
  );
}