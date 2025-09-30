"use client";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "../ui/button";

const CoverPhoto = ({ CI }: { CI: string }) => {
  const uploadRef = useRef();
  const [preview, setPreview] = useState<string | null>(null);
  const [showButton, setShowButton] = useState<boolean | null>(false);

  const handleButtonClick = () => {
    uploadRef.current?.click();
  };

  const handlePreview = (e: any) => {
    const image = e.target.files?.[0];
    if (!image) return;
    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl);
    setShowButton(true);
  };

  const handleDismiss = ()=>{
    setPreview(null);
    setShowButton(false);
  }

  return (
    <div>
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[315px] overflow-hidden rounded-lg shadow-md">
        {/* Cover Image */}
        {preview ? (
          <img src={preview} alt="cover photo" />
        ) : (
          <Image
            src={CI || "/avatar.jpg"}
            alt="Cover Photo"
            fill
            style={{ objectFit: "cover" }}
          />
        )}

        <div className="font-semibold absolute right-5 bottom-5 text-black bg-white rounded-md px-4 py-2">
          {showButton ? (
            <div className="flex gap-2">
              <Button onClick={handleDismiss} className="text-white" variant={"outline"}>Dismiss</Button>
              <Button className="bg-green-500 hover:bg-green-600">Save</Button>
            </div>
          ) : (
            <div>
              <button
                onClick={handleButtonClick}
                className="flex gap-1 items-center"
              >
                <ImageUp></ImageUp>
                Edit Cover Photo
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Hidden input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={uploadRef}
        onChange={handlePreview}
      />
    </div>
  );
};

export default CoverPhoto;
