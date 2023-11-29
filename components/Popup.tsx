import React, { useState } from 'react';
import Image from 'next/image';

interface PopupProps {
onClose: () => void;
onSubmit: (name: string, information: string) => void;
}

const Popup: React.FC<PopupProps> = ({ onClose, onSubmit }) => {
const [name, setName] = useState('');
const [imageUrl, setImageUrl] = useState('/bacteria_wp.jpg');
const [information, setInformation] = useState('');
const [colonies, setColonies] = useState(0);


return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-80 shadow-md relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={onClose}>
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
        <h2>You Petri Dish is Served</h2>
        <label className="block mt-4">
            Name:
            <input className="mt-1 p-2 w-full text-black border rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block mt-4">
            Information:
            <input className="mt-1 p-2 w-full text-black border rounded" type="text" value={information} onChange={(e) => setInformation(e.target.value)} />
        </label>
        <Image 
            src={imageUrl}
            width={250} 
            height={250} 
            alt="PL"
            className="mt-4"
        />
        Colonies: {colonies}
        <div className="mt-4 flex justify-end"> {/* Adjust justify-end for right alignment */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => onSubmit(name, information)}>
            Submit
            </button>
        </div>
        {/* Alternatively, for middle alignment, use: */}
        {/* <div className="mt-4 flex justify-center"> */}
        {/*   <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => onSubmit(name, information, imageUrl)}> */}
        {/*     Submit */}
        {/*   </button> */}
        {/* </div> */}
        </div>
    </div>
    </div>
);



};

export default Popup;
