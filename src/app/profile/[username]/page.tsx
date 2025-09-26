import { getUserProfileInfo } from "@/actions/profile.actions";
import PostCard from "@/components/PostCard";
import { Card } from "@/components/ui/card";
import React from "react";

const page = async ({ params }: { params: { username: string } }) => {
  const userProfile = await getUserProfileInfo(params.username);
  if(!userProfile) return null;
  console.log(userProfile?.posts);
  return (
    <div className="max-w-[1000px] mx-auto">
      <Card>
        
      </Card>
    </div>
  );
};

export default page;
