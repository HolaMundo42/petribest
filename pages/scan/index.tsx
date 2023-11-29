import React, { useEffect, ChangeEvent } from 'react';
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

const backgroundImageUrl = "/scan_page_backround.gif"; // Replace with the URL of your background image

interface ScanProps {}

const Scan: React.FC<ScanProps> = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = () => {
    const file = inputFileRef.current?.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
  };

  const divStyle: React.CSSProperties = {
    height: "100vh",
    margin: 0,
    padding: 0,
  };

  const overlayStyle: React.CSSProperties = {
    backgroundImage: `url(${backgroundImageUrl})`,
    filter: "blur(3px) brightness(0.7)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    zIndex: -1,
    transform: "scale(1.1)",
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <div className="" style={divStyle}>
      <nav className="p-4 text-gray-200"></nav>

      <div className="text-white text-center relative z-10">
        <h3 className="text-5xl mt-16">Start Scanning <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-200 text-transparent bg-clip-text bg-300% animate-gradient"> now</span></h3>

        <div className="border-white p-4 rounded-3xl mt-[8rem] mx-auto border-dashed border-2" style={{ maxWidth: "400px" }}>
          <p className="mb-5 text-xl">Click the button to upload your Petri Dish photo or drag it inside the box</p>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }

          const file = inputFileRef.current.files[0];

          const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/avatar/upload',
          });

          setBlob(newBlob);
        }}
      >
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-20 mt-3 rounded text-md">Upload Photo</button>
        
        <label className="mt-4 inline-block bg-gray-800 px-4 py-2 text-white rounded cursor-pointer border border-gray-700 hover:bg-gray-700">
          Choose File
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            required
          />
        </label>
          {selectedFileName && (
          <p className="mt-1 text-slate-200 text-sm italic">Selected File: {selectedFileName}</p>
          )}


      </form>
      {blob && (<></>)}


        </div>
      </div>


      <div className="absolute top-0 left-0 w-full h-full" style={overlayStyle}></div>
    </div>
  );
};

export default Scan;
