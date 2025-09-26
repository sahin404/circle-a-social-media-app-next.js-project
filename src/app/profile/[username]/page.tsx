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
        {/* Header */}
        <div className="relative">
          <div>
            <CoverPhoto CI={userProfile.coverImage}></CoverPhoto>
          </div>
          <div className="absolute top-64 left-12">
            <ProfilePhoto PI={userProfile.profileImage}></ProfilePhoto>
          </div>
        </div>
        {/* Content */}
        <div className="mt-28 p-6 grid gap-6 lg:grid-cols-12">
          {/*Left  */}
          <div className="hidden lg:block lg:col-span-4">
            <Card>Hello From Bangladesh</Card>
          </div>
          {/* Right */}
          <div className="lg:col-span-8">
            <Card className="p-6 space-y-6">
            {
              userProfile.posts.map(post=><PostCard post={post}></PostCard>)
            }  
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
