import Image from "next/image";

const ProfilePhoto = ({ CI }: { CI: string }) => {
  return (
    <div className="relative h-40 w-40 rounded-full border-4 border-white overflow-hidden shadow-lg">
      <Image
        src={CI || "/avatar.jpg"}
        alt="Profile Photo"
        fill
        style={{ objectFit: "cover" }}
      />
      Md. Sahin 
    </div>
  );
};

export default ProfilePhoto;
