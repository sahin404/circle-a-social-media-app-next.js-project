"use client";
import { Loader } from "@/components/ui/loader";
import Image from "next/image";
import whiteImage from "@/assests/white.png";
import blackImage from "@/assests/black.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Loading() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; //wait until client mounts

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <Loader variant="magnetic-dots" />
      {theme === "dark" ? (
        <Image src={whiteImage} alt="Loader" height={75} width={75} />
      ) : (
        <Image src={blackImage} alt="Loader" height={75} width={75} />
      )}
    </div>
  );
}
