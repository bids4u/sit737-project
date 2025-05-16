import React from 'react';
import { useUploadImage } from '../generalApiCalls/menuHook'; // Adjust the path as needed

const ImageUploadComponent = ({ onUploadSuccess }) => {
  const { mutate: uploadImage, isLoading } = useUploadImage();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      uploadImage(selectedFile, {
        onSuccess: (url) => {
          console.log(url)
          onUploadSuccess(url);
        },
        onError: (error) => {
          console.error('Image upload failed:', error.message);
        }
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      {isLoading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUploadComponent;
