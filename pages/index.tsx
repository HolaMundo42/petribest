"use client";
import React, { useEffect, useState } from 'react';
import Menu from '../components/menu_navbar';
import LandingPage from '../components/landing_page'
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  
    if (session) {
    return (
          <div>
            <Menu />
          </div>            
        );
    }
    else {
      return(
            <LandingPage />
        );
      }
}
