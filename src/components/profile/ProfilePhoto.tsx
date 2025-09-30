"use client";
import { ImageUp } from "lucide-react";
import Image from "next/image";

const ProfilePhoto = ({ PI }: { PI: string }) => {
  return (
    <div className="relative">
      <div className="relative h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full border-4 border-white overflow-hidden shadow-lg">
        <Image
          src={PI || "/avatar.jpg"}
          alt="Profile Photo"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      
      <div className="absolute right-2 bottom-3 bg-black bg-opacity-70 p-2 rounded-full">
        <ImageUp></ImageUp>
      </div>
    </div>
  );
};

export default ProfilePhoto;
