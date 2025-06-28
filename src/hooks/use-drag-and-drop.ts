import { useState } from "react";

interface UseDragAndDropProps {
  onFileUpload: (file: File) => void;
}

export const useDragAndDrop = ({ onFileUpload }: UseDragAndDropProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return {
    isDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
