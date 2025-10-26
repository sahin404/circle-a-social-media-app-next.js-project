"use client";
import { ImageUp, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { uploadProfilePicture } from "@/actions/uploads.actions";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

const ProfilePhoto = ({
  loggedInUserId,
  profileUserId,
  PI,
}: {
  loggedInUserId: string;
  profileUserId: string;
  PI: string;
}) => {
  const uploadPhotoRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showButton, setShowButton] = useState<boolean | null>(false);
  const [loadingButton, setLoadingButton] = useState<boolean | null>(false);
  const { theme } = useTheme();
  const handleIconClick = () => {
    uploadPhotoRef.current?.click();
  };

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setPreview(previewUrl);
      setShowButton(true);
    }
  };

  const handleDismiss = () => {
    setPreview(null);
    setShowButton(false);
  };

  // Save to Cloudinary and Database
  const handleSave = async () => {
    const image = uploadPhotoRef.current?.files?.[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);
    try {
      setLoadingButton(true);
      const res = await fetch("/api/upload/cloudinary", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        console.log("Uploaded image in coudinary URL:", data.url);
        // save to database
        const res = await uploadProfilePicture(data.url, profileUserId);
        if (res) toast.success("Updated Profile Picture Successfully!");
        else {
          toast.error("Something went wront!");
        }
      } else {
        toast.error("Something went wront!");
      }
      setPreview(data.url);
    } catch (err) {
      console.error(err);
      toast.error("Something went wront!");
    } finally {
      setLoadingButton(false);
      setShowButton(false);
    }
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
        {showButton ? (
          <div className=" flex gap-1  absolute right-2 bottom-3 bg-black bg-opacity-70 p-2 rounded-full hover:cursor-pointer">
            <Button onClick={handleDismiss} className="" variant="outline">
              Dismiss
            </Button>
            <Button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600"
            >
              {loadingButton ? (
                <div>
                  {" "}
                  <Loader2Icon className="animate-spin"></Loader2Icon>{" "}
                </div>
              ) : (
                <div>Save</div>
              )}
            </Button>
          </div>
        ) : loggedInUserId === profileUserId ? (
          <div
            onClick={handleIconClick}
            className="absolute right-1 bottom-1 md:right-2 md:bottom-3 bg-black bg-opacity-70 p-2 rounded-full hover:cursor-pointer"
          >
            {theme === "dark" ? (
              <ImageUp className="w-3 h-3 md:w-5 md:h-5" />
            ) : (
              <ImageUp className="w-3 h-3 text-white md:w-5 md:h-5" />
            )}
          </div>
        ) : (
          ""
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
