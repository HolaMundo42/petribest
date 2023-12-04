import React, { useEffect, ChangeEvent } from 'react';
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react'; 
import Image from 'next/image';
import Router from 'next/router';


const backgroundImageUrl = "/scan_page_backround.gif"; // Replace with the URL of your background image

interface ScanProps {}

const Scan: React.FC<ScanProps> = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(0); // 0 no 1 loggeado 2 annon
  const [namePetridish, setName] = useState<string>('');
  const [infoPetridish, setInformation] = useState<string>('');
  const [coloniesPetridish, setColonies] = useState<number>(42);
  const [noFileSelectedError, setFileError] = useState(false);

  const { data: session } = useSession();

  const handleOpenPopup = async ( inputFileRef: React.RefObject<HTMLInputElement>) => {


    const body = 
    {
      "image_url":"https://res.cloudinary.com/dso4vg1hw/image/upload/f_auto,q_auto/fknm0eyvz0lzhrrykdwy"
      }	

     //procesamiento de imagen acá
     
     const response = await fetch('https://petrilabapi.onrender.com/process_image/', {
      method: 'POST',
      mode:'no-cors',
      headers: {
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify({ 
        image_url : "https://res.cloudinary.com/dso4vg1hw/image/upload/f_auto,q_auto/fknm0eyvz0lzhrrykdwy"      }),
    });
    
    if (response.ok) {
      console.log(response);
    } else {
      console.error('Error in Fetch POST:', response.statusText);
    }
     

    if(inputFileRef.current && inputFileRef.current.value === ''){
      setShowPopup(0);
      setFileError(true);
    }
    else if(session)
    {
      setShowPopup(1);
      setFileError(false);
    }else{
      setShowPopup(2);
      setFileError(true);
    }
  }

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

    if(namePetridish === "" || infoPetridish === "")
    {
      console.log("completar campos")
      return;
    }

    try {
      if (!inputFileRef.current?.files) {
        throw new Error('No file selected');
      }

      const file = inputFileRef.current.files[0];

      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/avatar/upload',
      });


      
      const provDate = new Date();
      const currentDate = provDate.toString()

      // Fetch POST after upload
      const response = await fetch('http://localhost:3000/api/registers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: namePetridish,
          date: currentDate,
          colonies:coloniesPetridish,
          img: newBlob, //<--- url de descarga
          info: infoPetridish,
        }),
      });
      
      if (response.ok) {
        console.log('Fetch POST successful');
        setBlob(newBlob);
        console.log("new blob!");
        Router.push("/history");
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
        <button type="button" onClick={() => handleOpenPopup(inputFileRef)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-20 mt-3 rounded text-md">Upload Photo</button>
        
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
          {noFileSelectedError && selectedFileName == null && (
          <p className="mt-1 text-red-600 text-sm italic">Please select a file first</p>
          )}

      {showPopup === 1 && (

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-md relative">
          <button type="button" className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={() => setShowPopup(0)}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
          >
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
              />
          </svg>
          </button>
          <div className="text-black">
          <h2>You Petri Dish is Ready</h2>
          <label className="block mt-4">
              Name:
              <input className="mt-1 p-2 w-full text-black border rounded" type="text" value={namePetridish} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block mt-4">
              Information:
              <input className="mt-1 p-2 w-full text-black border rounded" type="text" value={infoPetridish} onChange={(e) => setInformation(e.target.value)} />
          </label>
          <Image 
              src={"/bacteria_wp.jpg"} //poner img blob cuando entienda como
              width={250} 
              height={250} 
              alt="PL"
              className="mt-4"
          />
          Colonies: {coloniesPetridish} {/*habriauqe llamar a la funcion de la ia q me de las colonias*/}
          <div className="mt-4 flex justify-end"> 
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Submit
              </button>
          </div>
          </div>
      </div>
      </div>
      )
      }

      {showPopup === 2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-80 shadow-md relative text-black">
            <button type="button" className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={() => setShowPopup(0)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            </button>

            <h2>Login to save changes</h2>
            <Image 
              src={"/bacteria_wp.jpg"} //poner img blob cuando entienda como
              width={250} 
              height={250} 
              alt="PL"
              className="mt-4"
          />
          Colonies: {coloniesPetridish} {/*habriauqe llamar a la funcion de la ia q me de las colonias*/}
            </div>
            </div>
      )}

      </form>


        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full" style={overlayStyle}></div>
    </div>
  );
};

export default Scan;
