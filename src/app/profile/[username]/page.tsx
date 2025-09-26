import { getUserProfileInfo } from "@/actions/profile.actions";
import { getUserByClerkId } from "@/actions/user.actions";
import CoverPhoto from "@/components/profile/CoverPhoto";
import EditProfile from "@/components/profile/EditProfile";
import FollowButton from "@/components/profile/FollowButton";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ProfilePostSection from "@/components/profile/ProfilePostSection";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { Card } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async ({ params }: { params: { username: string } }) => {
  const userProfile = await getUserProfileInfo(params.username);
  if (!userProfile || !userProfile.posts) return null;
  // console.log(userProfile);
  const {userId} = await auth()
  if(!userId) return null;
  const loggedInUser = await getUserByClerkId(userId);
  if(!loggedInUser) return null;
  //Create object to send profile sidebar
  const cardContent = {
    email: userProfile.email || "",
    location: userProfile.location || "",
    website: userProfile.website || "",
    createdAt: userProfile.createdAt
      ? new Date(userProfile.createdAt).toISOString()
      : "",
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <Card>
        {/* Cover and Profile */}
        <div className="relative">
          <div>
            <CoverPhoto CI={userProfile.coverImage || ""}></CoverPhoto>
          </div>
          <div className="absolute top-44 sm:top-56 md:top-64 left-6 sm:left-12">
            <ProfilePhoto PI={userProfile.profileImage || ""}></ProfilePhoto>
          </div>
        </div>
        {/* Name, bio and button section */}
        <div>
          <div className="hidden sm:flex my-5 mt-3 md:mt-5 ml-40 md:ml-48 lg:ml-56 items-center justify-between mr-16">
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-bold">
                {userProfile?.name}
              </span>
              <span>{userProfile?.bio}</span>
            </div>
            <div>
              {loggedInUser.id===userProfile.id?<EditProfile></EditProfile>:<FollowButton></FollowButton>}
            </div>
          </div>
          {/* for small devices */}
          <div className="sm:hidden">
            <div className="flex flex-col mt-20 ml-4">
              <span className="text-lg md:text-2xl font-bold">
                {userProfile?.name}
              </span>
              <span>{userProfile?.bio}</span>
            </div>
            <div className="ml-64 -mt-[88px]">
              <button className="p-2 border">Unfollow</button>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-12 p-6 grid gap-6 lg:grid-cols-12">
          {/*Left: Card */}
          <div className="hidden lg:block lg:col-span-4">
            <Card className="p-2">
              <ProfileSidebar cardContent={cardContent || ""}></ProfileSidebar>
            </Card>
          </div>
          {/* Right: Posts */}
          <div className="lg:col-span-8">
            <Card className="p-6 space-y-6">
              <ProfilePostSection
                posts={userProfile.posts}
              ></ProfilePostSection>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
