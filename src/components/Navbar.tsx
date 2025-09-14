"use client";

import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import Image from "next/image";
import white from "@/assests/white.png";
import black from "@/assests/black.png";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* logo */}
          <Link href="/">
            <Image
              src={theme === "dark" ? white : black}
              width={120}
              height={40}
              alt="Circle Logo"
            ></Image>
          </Link>

          <DesktopNavbar></DesktopNavbar>
          <MobileNavbar></MobileNavbar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
