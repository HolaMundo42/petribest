import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube, faDiscord, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import React, { useState, useEffect } from "react";


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isScrolled
          ? 'backdrop-blur-sm bg-gray-800/60 hover:bg-gray-800/75 text-slate-200 fixed py-3 w-full z-10 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
          : 'bg-[#05090c] text-slate-200 transition-all py-2 duration-300 shadow-none'
      }`}
    >
      <div className={`${
        isScrolled
        ? 'absolute bottom-0 left-0 w-full h-[1px] bg-gray-500/40 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
        : 'transition-all duration-300 shadow-none'}`}></div>

      <nav className="flex items-center justify-between text-base xl:text-lg top-0 font-normal relative">
        <div className="mx-4 flex items-center">
          <img
            src="/favicon.ico"
            alt="PetriLab Logo"
            className="h-8 w-8 mr-2"
          />
          <a href="#" className="font-bold text-lg">
            PetriLab
          </a>
        </div>
        <div className="mx-4 flex-grow text-center"></div>
        <div className="mx-4 border-2 border-gray rounded-[0.25rem] hover:bg-[#f1f0ee] hover:text-black">
          <Link href="/login" className="font-semibold text-base p-3 pb-1">
            Log In
          </Link>
        </div>
        <div className="mx-4 bg-black border-2 border-zinc-900 rounded-[0.25rem] hover:bg-gray-800">
          <Link href="/signup" className="font-semibold text-orange-50 p-2 pb-1 text-base">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

const Sections: React.FC = () => {
  return (
    <div className="">
      <section
        className="flex-1 pt-[5rem] pb-24 flex items-center justify-center"
        style={{
          backgroundImage: "url('/fondo home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto text-center ">
          <div className="w-full md:w-1/2 bg-[#303030]/50 rounded-lg p-8 m-auto text-slate-200">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-200">Welcome to PetriLab</h1>
            <p className="mb-4 text-slate-200">
              Unlock the secrets of science in the comfort of your lab.
            </p>
            <Link href="/scan">
              <button className="mt-4 px-8 py-4 bg-slate-800 text-white rounded hover:bg-slate-700 transition duration-300 shadow-md">
                Scan Now
              </button>
            </Link>
            <p className="mt-6 text-slate-200 text-sm">
              Start your journey with PetriLab and explore and analyze your dishes.
            </p>
          </div>
        </div>
      </section>

      <section
        className="flex-1 text-center pb-8 mx-auto"
        style={{
          background: "#17191C",
        }}
      >
        <h2 className="text-4xl font-semibold py-8 text-slate-200">Features</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="ml-10 bg-[#05090c] text-white p-6 rounded shadow-md hover:shadow-lg transition duration-300 transform hover:translate-y-[-5px] md:w-1/3">
            <h3 className="text-xl font-semibold p b-2">Responsive Design</h3>
            <p className="text-slate-300">
              Our web page is fully responsive, ensuring it looks great on all devices.
            </p>
          </div>
          <div className="mx-10 bg-[#05090c] text-white p-6 rounded shadow-md hover:shadow-lg transition duration-300 transform hover:translate-y-[-5px] md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Simple and Minimalistic</h3>
            <p className="text-slate-300">
              We believe in the beauty of simplicity, making the user experience smooth and clutter-free.
            </p>
          </div>
          <div className="mr-10 bg-[#05090c] text-white p-6 rounded shadow-md hover:shadow-lg transition duration-300 transform hover:translate-y-[-5px] md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Built with Modern Tools</h3>
            <p className="text-slate-300">
              This landing page is powered by Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer: React.FC = () => {
return (
<footer className="bg-[#05090c] py-6">
  <div className="container mx-auto text-center flex flex-col items-center sm:flex-row sm:justify-between">
      <div className="mb-4 sm:mb-0 flex items-center">
      <Link href="/terms-of-service" className="text-slate-300 hover:text-white">
          Terms of Service
      </Link>
      <span className="text-slate-300 mx-2">•</span>
      <Link href="/contact" className="text-slate-300 hover:text-white">
          Contact
      </Link>
      </div>
      <div className="flex items-center space-x-2">
      <span className="text-slate-300 hidden sm:inline">Follow Us</span>
      <span className="text-slate-300 hidden sm:inline">•</span>
      <button
        id="instagram"
        className="bg-slate-950 border-2 hover:border-0 border-pink-500 bg-gradient-to-b text-2xl hover:from-indigo-600 hover:via-pink-600 hover:to-yellow-500 hover:text-white text-pink-600 w-10 h-10 transform hover:-translate-y-3 rounded-full duration-500 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faInstagram} className="w-[1.50rem]" />
      </button>
      <button
        id="youtube"
        className="bg-slate-950 transform hover:-translate-y-3 border-2 w-10 h-10 rounded-full duration-500 text-red-500 border-red-500 hover:bg-red-500 hover:text-white text-2xl flex items-center justify-center"      >
        <FontAwesomeIcon icon={faYoutube} className="w-[1.75rem]"/>
      </button>

      <button
        id="discord"
        className="bg-slate-950 transform hover:-translate-y-3 border-2 w-10 h-10 rounded-full duration-500 text-indigo-500 border-indigo-500 hover:bg-indigo-500 hover:text-white text-2xl flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faDiscord} className="w-[1.9rem]"/>
      </button>

      <Link
      href = "https://www.linkedin.com/company/petrilab-proyecto"
        id="linkedin"
        className="bg-slate-900 transform hover:-translate-y-3 border-2 w-10 h-10 rounded-full duration-500 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white text-2xl flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faLinkedinIn} className="w-[1.35rem]"/>
      </Link>

      </div>
  </div>
  </footer>
);
};

const LandingPage: React.FC = () => {
  return (
  <div className="flex flex-col min-h-screen min-w-screen">      
      <Navbar/>
      <Sections/>
      <Footer/>
  </div>
);
};

export default LandingPage;