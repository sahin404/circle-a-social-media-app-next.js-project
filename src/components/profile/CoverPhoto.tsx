"use client"
import Image from "next/image";

const CoverPhoto = ({ CI }: { CI: string }) => {
  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[315px] overflow-hidden rounded-lg shadow-md">
      {/* Cover Image */}
      <Image
        src={CI || "/avatar.jpg"}
        alt="Cover Photo"
        fill
        style={{ objectFit: "cover" }}
      />

    </div>
  );
};

export default CoverPhoto;
