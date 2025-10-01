import { getUserProfileInfo } from "@/actions/profile.actions";
import { getUserByClerkId } from "@/actions/user.actions";
import CustomUnauthorized from "@/components/CustomUnauthorized";
import CoverPhoto from "@/components/profile/CoverPhoto";
import EditProfile from "@/components/profile/EditProfile";
import FollowButton from "@/components/profile/FollowButton";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import ProfilePostSection from "@/components/profile/ProfilePostSection";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { Card } from "@/components/ui/card";
import { Post } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { CameraOff } from "lucide-react";
import React from "react";

// metadata
export async function generateMetadata({ params }: { params: { username: string } }){
  const userProfile = await getUserProfileInfo(params.username);
  const {userId} = await auth();
  if(!userProfile || !userId){
    return{
      title:'Circle | Not Found',
      description:'This user is not Found!'
    }
  }

  return{
    title:`Circle | ${userProfile.name}`,
    openGraph:{
      title: `Circle | ${userProfile.name}`,
      images:[
        {
          url: userProfile.profileImage || "/avatar.jpg",
          width: 400,
          height: 400,
          alt: `${userProfile.name}`,
        },
      ]
    }
  }
}

type UserProfile = {
  id: string;
  name: string | null; // null allow করো
  bio?: string | null;
  profileImage?: string | null;
  coverImage?: string | null;
  email?: string | null;
  location?: string | null;
  website?: string | null;
  createdAt: Date | string;
  posts: Post[];
};

const page = async ({ params }: { params: { username: string } }) => {
  const userProfile = await getUserProfileInfo(params.username) as UserProfile;
  if (!userProfile || !userProfile.posts) return <CustomUnauthorized></CustomUnauthorized>

  const {userId} = await auth()
  if(!userId) return <CustomUnauthorized></CustomUnauthorized>
  
  const loggedInUser = await getUserByClerkId(userId);
  if(!loggedInUser) return <CustomUnauthorized></CustomUnauthorized>
  
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
            <CoverPhoto CI={userProfile.coverImage || ""} id={userProfile.id}></CoverPhoto>
          </div>
          <div className="absolute top-44 sm:top-56 md:top-64 left-6 sm:left-12">
            <ProfilePhoto id={userProfile.id}  PI={userProfile.profileImage || ""}></ProfilePhoto>
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
              {loggedInUser.id===userProfile.id?<EditProfile userProfile={userProfile}></EditProfile>:<FollowButton userProfileId = {userProfile.id || ""}></FollowButton>}
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
            <div className="ml-[355px] -mt-20">
              {loggedInUser.id===userProfile.id?<EditProfile userProfile={userProfile}></EditProfile>:<FollowButton userProfileId = {userProfile.id || ""}></FollowButton>}
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
              {
                userProfile.posts.length===0? 
                <div className=" mt-3 flex flex-col gap-3 items-center justify-center">
                  <div className="text-center">
                    <CameraOff />
                  </div>
                  Not Posts Yet.
                </div> :
                <div>
                    <ProfilePostSection
                      posts={userProfile.posts}
                    ></ProfilePostSection>
                </div>
              }
              
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default page;
