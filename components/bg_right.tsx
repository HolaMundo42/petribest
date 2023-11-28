import React from "react";
import Image from 'next/image'

const BackgroundRight = () => {
  return (
    <div className="hidden md:block md:flex-1 relative">
      <img
        src="/fondo login y register.jpg"
        alt="petrilab_bg"
        className="object-cover w-[100%] h-full"
      />
    </div>
  );
};

export default BackgroundRight;