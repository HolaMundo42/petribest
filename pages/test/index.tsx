import React, { useState } from 'react';
import Image from 'next/image';

const Scan: React.FC = () => {
  const [fileData, setFileData] = useState<Array<File | null>>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setFileData([...fileData, file]); // Add the selected file to the array
    }
  };

  const sendFileToBackend = async () => {
    try {
      const formData = new FormData();

      // Append all files in the array to the FormData
      fileData.forEach((file, index) => {
        if (file) {
          formData.append(`image${index}`, file, file.name);
        }
      });

      // Replace 'YOUR_BACKEND_ENDPOINT' with the actual backend endpoint
      const response = await fetch('http://localhost:3000/api/cloudinary', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Files uploaded successfully to the backend.');
        // Optionally, you can clear the selected file and fileData array after successful upload
        setSelectedFile(null);
        setFileData([]);
      } else {
        console.error('Error uploading files to the backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  return (
    <div>
      <h1>Scan Page</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleChangeFile}
      />

      {selectedFile && (
        <div>
          <h2>Selected Image:</h2>
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="Selected Image"
            width={300}
            height={200}
          />
        </div>
      )}

      {/* Button to trigger file upload to the backend */}
      {fileData.length > 0 && (
        <button onClick={sendFileToBackend}>Upload to Backend</button>
      )}
    </div>
  );
};

export default Scan;
