"use client";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "../ui/button";

interface ProfilePhotoProps {
  PI: string;
}

const ProfilePhoto = ({ PI }: ProfilePhotoProps) => {
  const uploadPhotoRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleIconClick = () => {
    uploadPhotoRef.current?.click();
  };

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setPreview(previewUrl);
    }
  };

  const handleDismiss = () => {
    setPreview(null);
  };

  const handleSave = () => {

  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Profile image container */}
      <div className="relative">
        <div className="relative h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full border-4 border-white overflow-hidden shadow-lg">
          {preview ? (
            <img
              src={preview}
              alt="Profile Photo"
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={PI || "/avatar.jpg"}
              alt="Profile Photo"
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        {preview ? (
          <div className=" flex gap-1  absolute right-2 bottom-3 bg-black bg-opacity-70 p-2 rounded-full hover:cursor-pointer">
            <Button onClick={handleDismiss} className="" variant="outline">
              Dismiss
            </Button>
            <Button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600"
            >
              Save
            </Button>
          </div>
        ) : (
          <div
            onClick={handleIconClick}
            className="absolute right-2 bottom-3 bg-black bg-opacity-70 p-2 rounded-full hover:cursor-pointer"
          >
            <ImageUp />
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={uploadPhotoRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handlePreview}
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;
