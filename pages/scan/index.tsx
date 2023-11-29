import React, { useEffect, ChangeEvent } from 'react';
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react'; 
import Popup from '@/components/Popup';

const backgroundImageUrl = "/scan_page_backround.gif"; // Replace with the URL of your background image

interface ScanProps {}

const Scan: React.FC<ScanProps> = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  
  const { data: session } = useSession();
  
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

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!inputFileRef.current?.files) {
        throw new Error('No file selected');
      }

      const file = inputFileRef.current.files[0];

      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/avatar/upload',
      });

      setBlob(newBlob);
      console.log("new blob!");

      const provDate = new Date();
      const currentDate = provDate.toString()

      // Fetch POST after upload
      const response = await fetch('http://localhost:3000/api/registers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: "huevo",
          date: currentDate,
          colonies: 69,
          img: newBlob,
          info: "very interestining",
        }),
      });

      if (response.ok) {
        console.log('Fetch POST successful');
      } else {
        console.error('Error in Fetch POST:', response.statusText);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  return (
    <div className="overflow-hidden" style={divStyle}>
      <nav className="p-4 text-gray-200"></nav>

      <div className="text-white text-center relative z-10">
        <h3 className="text-5xl mt-16">
          Start Scanning
      
      <span
        className="gradient-text"
        style={{
          backgroundClip: 'text',
          color: 'transparent',
          animation: 'moveGradient 4s linear infinite',
          backgroundSize: '300% 100%',
          backgroundImage: 'linear-gradient(45deg, #93c5fd, #3b82f6, #bfdbfe )',
          marginLeft: "0.35em",
        }}
      >
        now
      </span>
      <style>
        {`
          @keyframes moveGradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
      </h3>

        <div className="border-white p-4 rounded-3xl mt-[8rem] mx-auto border-dashed border-2" style={{ maxWidth: "400px" }}>
          <p className="mb-5 text-xl">Click the button to upload your Petri Dish photo or drag it inside the box</p>

      <form onSubmit={handleUpload}>
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
          <p className="mt-1 text-slate-200 text-sm italic">Selected File: <span className="font-semibold">{selectedFileName}</span></p>
          )}
      </form>


        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full" style={overlayStyle}></div>
    </div>
  );
};

export default Scan;
