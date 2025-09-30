"use client";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const ProfilePhoto = ({ PI }: { PI: string }) => {
  const uploadPhotoRef = useRef<HTMLInputElement | null>(null);
  const [preview,setPreview] = useState<string | null>(null);

  const handleIconClick = () =>{
    uploadPhotoRef.current?.click();
  }

  const handleUpload = (e:any)=>{
      const image  = e.target.files?.[0];
      if(image){
        const imageUrl = URL.createObjectURL(image);
        setPreview(imageUrl);
      }
  }
  return (
    <div className="relative">
      <div className="relative h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full border-4 border-white overflow-hidden shadow-lg">
        
        {
          preview? 
            <img 
            src={preview} 
            alt="Profile Photo"
            className="h-full w-full object-cover"
            />:
          <Image
            src={PI || '/avatar.jpg' }
            alt="Profile Photo"
            fill
            style={{ objectFit: "cover" }}
          />
        }
        
      </div>

      <div onClick={handleIconClick}  className="hover:cursor-pointer absolute right-2 bottom-3 bg-black bg-opacity-70 p-2 rounded-full">
        <ImageUp></ImageUp>
      </div>
      {/* choosen file component */}
      <div>
        <input 
        ref={uploadPhotoRef} 
        className="hidden" 
        type="file" 
        accept="image/*"
        onChange={handleUpload}
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;
