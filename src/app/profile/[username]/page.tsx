import { getUserProfileInfo } from "@/actions/profile.actions";
import React from "react";

const page = async ({ params }: { params: { username: string } }) => {
  
  const userProfile = await getUserProfileInfo(params.username);
  console.log(userProfile);

  return <div>{params.username}</div>;
};

export default page;
