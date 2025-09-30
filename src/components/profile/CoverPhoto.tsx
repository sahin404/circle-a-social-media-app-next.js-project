"use client";
import { ImageUp, Loader2, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { uploadCoverPicture } from "@/actions/uploads.actions";

const CoverPhoto = ({ CI, id }: { CI: string, id:string }) => {
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showButton, setShowButton] = useState<boolean | null>(false);
 const [loadingButton, setLoadingButton] = useState<boolean | null>(false);

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

    // Save to Cloudinary and Database
  const handleSave = async () => {
    const image = uploadRef.current?.files?.[0];
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
        const res = await uploadCoverPicture(data.url, id);
        if (res) toast.success("Updated Cover Picture Successfully!");
        else {
          toast.error("Something went wront!");
        }
      } else {
        toast.error("Something went wront!");
      }
      setPreview(data.url);
    } 
    catch (err) {
      console.error(err);
      toast.error("Something went wront!");
    } 
    finally {
      setLoadingButton(false);
      setShowButton(false);
    }
  };

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
               <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                {
                  loadingButton? <div> <Loader2Icon className="animate-spin"></Loader2Icon> </div>:<div>Save</div>
                }
               </Button>
            </div>
          ) : (
            <div>
              <button
                onClick={handleButtonClick}
                className="flex gap-1 items-center text-[11px] sm:text-xs md:text-sm"
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
