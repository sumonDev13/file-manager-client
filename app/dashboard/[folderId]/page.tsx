'use client';

import { useParams } from 'next/navigation';
import { useFiles } from '@/hooks/useFiles';
import FileItem from '@/components/FileItem';
import FolderItem from '@/components/FolderItem';
import UploadModal from '@/components/UploadModal';

export default function FileExplorer() {
  const { folderId } = useParams();
  const { files, folders, loading, error } = useFiles(folderId as string);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Files</h1>
        <UploadModal currentFolder={folderId as string} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <FolderItem key={folder._id} folder={folder} />
        ))}
        {files.map((file) => (
          <FileItem key={file._id} file={file} />
        ))}
      </div>
    </div>
  );
}