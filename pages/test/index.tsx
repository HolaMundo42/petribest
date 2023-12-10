import React, { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';

const Scan: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);
  const [colonies, setColonies] = useState<number | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadToCloudinary = async () => {
    if (selectedFile) {
      try {
        // Cloudinary configuration
        const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dso4vg1hw/upload';
        const cloudinaryPreset = 'qprloqah';

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', cloudinaryPreset);

        // Upload to Cloudinary
        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Image uploaded to Cloudinary:', result);

          // Set the Cloudinary URL in state
          setCloudinaryUrl(result.secure_url);

          // Make a fetch request to the petrilabapi.onrender.com API
          const petriLabApiResponse = await fetch('https://petrilabapi.onrender.com/process_image/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': 'True',
              'Access-Control-Allow-Methods': '*',
            },
            body: JSON.stringify({
              image_url: result.secure_url,
            }),
          });

          if (petriLabApiResponse.ok) {
            const petrinum = await petriLabApiResponse.json();
            const petrinum_final = petrinum["predicted_count"];
            console.log(petrinum_final);
            setColonies(petrinum_final);
          } else {
            console.log(JSON.stringify(petriLabApiResponse));
            console.error('Error in Fetch POST:', petriLabApiResponse.statusText);
          }
        } else {
          console.error('Error uploading image to Cloudinary:', response.statusText);
        }
      } catch (error) {
        console.error('Error during image upload:', error);
      }
    }
  };

  const submitValuesToHistory = async () => {
    try {
      const response = await fetch('https://petrilab.vercel.app/api/registers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: "petrichat",
          date: "",
          colonies: colonies || 0,
          img: cloudinaryUrl, //<-- imagen
          info: "",
        }),
      });
      
      if (response.ok) {
        console.log('Fetch POST to history successful');
        Router.push("/history");
      } else {
        console.error('Error in Fetch POST to history:', response.statusText);
        alert("Error during POST to history");
      }
    } catch (error) {
      console.error('Error during file upload to history:', error);
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

      {/* Button to trigger image upload to Cloudinary */}
      {selectedFile && (
        <div>
          <button onClick={uploadToCloudinary}>Upload to Cloudinary</button>

          {/* Display the Cloudinary URL if available */}
          {cloudinaryUrl && (
            <div>
              <h2>Cloudinary URL:</h2>
              <a href={cloudinaryUrl} target="_blank" rel="noopener noreferrer">
                {cloudinaryUrl}
              </a>
            </div>
          )}

          {/* Display the colonies count if available */}
          {colonies !== null && (
            <div>
              <h2>Colonies Count:</h2>
              {colonies}
            </div>
          )}

          {/* Button to submit values to history */}
          <button onClick={submitValuesToHistory}>Submit to History</button>
        </div>
      )}
    </div>
  );
};

export default Scan;
