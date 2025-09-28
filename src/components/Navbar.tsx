'use client'
import DesktopNavbar from "./DesktopNavbar";
import Logo from "@/components/Logo";
import MobileNavbar from "./MobileNavbar";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";


const Navbar =() => {
  const { isLoaded ,user} = useUser();
  useEffect(()=>{
    if(!user) return;
    const syncUser = async() =>{
      await syncUser();
    }
  },[])

  if (!isLoaded) {
    return null;
  }


  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* logo */}
          <Logo></Logo>

          <DesktopNavbar></DesktopNavbar>
          <MobileNavbar></MobileNavbar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
