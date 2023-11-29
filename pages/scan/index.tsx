import React, { useEffect, ChangeEvent } from 'react';

const backgroundImageUrl = "/scan_page_backround.gif"; // Replace with the URL of your background image

interface ScanProps {}

const Scan: React.FC<ScanProps> = () => {
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

  const handleUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    // Do something with the uploaded file, for example, log its details
    if (uploadedFile) {
      console.log("Uploaded File:", uploadedFile);
      // You can also perform additional actions, such as uploading the file to a server
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <div className="" style={divStyle}>
      <nav className="p-4 text-gray-200">
        {/* ... (previous code) */}
      </nav>

      <div className="text-white text-center relative z-10">
        <h3 className="text-5xl mt-16">Start Scanning <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-200 text-transparent bg-clip-text bg-300% animate-gradient"> now</span></h3>

        <div className="border-white p-4 rounded-3xl mt-[8rem] mx-auto border-dashed border-2" style={{ maxWidth: "400px" }}>
          <p className="mb-5 text-xl">Click the button to upload your Petri Dish photo or drag it inside the box</p>
          <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleUploadPhoto} />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-20 mt-3 rounded text-md">Upload Photo</button>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full" style={overlayStyle}></div>
    </div>
  );
};

export default Scan;
