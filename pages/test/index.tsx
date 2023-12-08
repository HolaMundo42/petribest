import React, { useState } from 'react';
import Image from 'next/image';

const Scan: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
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
    </div>
  );
};

export default Scan;
