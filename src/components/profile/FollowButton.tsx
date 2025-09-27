"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { checkFollowExistance } from "@/actions/profile.actions";
import { toggoleFollow } from "@/actions/user.actions";

const FollowButton = ({ userProfileId }: { userProfileId: string }) => {
  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false);

  useEffect(() => {
    const isFollowed = async () => {
      const result = await checkFollowExistance(userProfileId);
      if (result?.find) {
        setIsAlreadyFollowed(true);
      }
    };
    isFollowed();
  }, [userProfileId]);

  const handleFollow = async () => {
    try {
      await toggoleFollow(userProfileId);
      setIsAlreadyFollowed(prev => !prev);
    } catch (err) {
      console.log("error occu");
    }
  };

  return (
    <div>
      <Button onClick={handleFollow} variant={"secondary"}>
        {isAlreadyFollowed ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default FollowButton;
