"use client";
import React, { useState } from "react";
import Link from "next/link";
import RememberMeCheckbox from "../../components/RememberMeCheckbox";
import BackgroundRight from "../../components/bg_right";
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import { fetchLOGIN } from "../../components/fetch";
import LoginBtn from "../../components/LoginBtn"
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetchLOGIN(email, password);
  };
  

  return (
    
    <div className="relative flex flex-col md:flex-row items-stretch md:h-screen overflow-hidden bg-gray-100">
      <div className="w-full h-screen md:w-96 md:flex-shrink-0 bg-bg_color rounded-md shadow-md">
        <div className="flex flex-col justify-center items-center h-[100vh] p-8 md:p-16">
          <Image
            src="/petrilab.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />
          <h1 className="text-3xl font-bold text-center text-gray-700">PetriLab</h1>
          <form className="mt-6 w-full max-w-sm" onSubmit={handleFormSubmit}>
            <EmailInput onChangeValue={setEmail}/>   
            <PasswordInput
              label="Password"
              type="password"
              showPassword={showPassword}
              handlePasswordToggle={handlePasswordToggle}
              onChangeValue={setPassword}
              showStrength={"false"}
            />
            
            <RememberMeCheckbox htmlFor="RememberMe"/>
            
            <Link href="/forgot" className="text-xs text-blue-600 hover:underline">
              Forgot Password?
            </Link>
            
            <div className="mt-2">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Login
              </button>
            </div>
            
            <p className="mt-4 text-sm text-center text-gray-700">
              No account yet?  {" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
            
            <div className="my-4 border-b border-gray-300"></div>
          </form>
          <form className="w-full max-w-sm">
          <div className="mt-6">
          <LoginBtn></LoginBtn>
            </div>
          </form>
        </div> 
      </div>
      <BackgroundRight/>      
    </div>
  );
}