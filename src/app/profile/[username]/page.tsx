import { getUserProfileInfo } from "@/actions/profile.actions";
import PostCard from "@/components/PostCard";
import CoverPhoto from "@/components/profile/CoverPhoto";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import { Card } from "@/components/ui/card";
import React from "react";

const page = async ({ params }: { params: { username: string } }) => {
  const userProfile = await getUserProfileInfo(params.username);
  if (!userProfile) return null;
  console.log(userProfile);
  return (
    <div className="max-w-[1000px] mx-auto">
      <Card>
        <div className="relative">
          <div>
            <CoverPhoto CI={userProfile.coverImage}></CoverPhoto>
          </div>
          <div className="absolute top-64 left-12">
            <ProfilePhoto PI={userProfile.profileImage}></ProfilePhoto>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
