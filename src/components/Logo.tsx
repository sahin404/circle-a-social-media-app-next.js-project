"use client";
import Link from "next/link";
import Image from "next/image";
import white from "@/assests/white.png";
import black from "@/assests/black.png";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <div>
      <Link href="/">
        <Image
          src={theme === "dark" ? white : black}
          width={120}
          height={40}
          alt="Circle Logo"
        ></Image>
      </Link>
    </div>
  );
};

export default Logo;
