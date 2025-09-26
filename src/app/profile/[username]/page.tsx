import { getUserProfileInfo } from "@/actions/profile.actions";
import { Card } from "@/components/ui/card";
import React from "react";

const page = async ({ params }: { params: { username: string } }) => {
  const userProfile = await getUserProfileInfo(params.username);
  console.log(userProfile);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Card>{params.username}</Card>
    </div>
  );
};

export default page;
