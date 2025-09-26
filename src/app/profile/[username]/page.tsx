import { getUserProfileInfo } from "@/actions/profile.actions";
import PostCard from "@/components/PostCard";
import CoverPhoto from "@/components/profile/CoverPhoto";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { Card } from "@/components/ui/card";
import React from "react";

const page = async ({ params }: { params: { username: string } }) => {
  const userProfile = await getUserProfileInfo(params.username);
  if (!userProfile) return null;
  console.log(userProfile);

  const cardContent = {
    email: userProfile.email,
    location: userProfile.location,
    website: userProfile.location,
    createdAt: userProfile.createdAt,
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <Card>
        {/* Cover and Profile */}
        <div className="relative">
          <div>
            <CoverPhoto CI={userProfile.coverImage}></CoverPhoto>
          </div>
          <div className="absolute top-64 left-12">
            <ProfilePhoto PI={userProfile.profileImage}></ProfilePhoto>
          </div>
        </div>
        {/* Name, bio and button section */}
        <div className="my-5 mt-5 ml-56 flex items-center justify-between mr-16">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{userProfile.name}</span>
            <span>{userProfile.bio}</span>
          </div>
          <div>
            <button>Unfollow</button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-12 p-6 grid gap-6 lg:grid-cols-12">
          {/*Left: Card */}
          <div className="hidden lg:block lg:col-span-4">
            <Card className="p-2">
              <ProfileSidebar cardContent={cardContent}></ProfileSidebar>
            </Card>
          </div>
          {/* Right: Posts */}
          <div className="lg:col-span-8">
            <Card className="p-6 space-y-6">
              {userProfile.posts.map((post) => (
                <PostCard post={post}></PostCard>
              ))}
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
