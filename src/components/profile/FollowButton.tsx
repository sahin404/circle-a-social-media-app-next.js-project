"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { checkFollowExistance } from "@/actions/profile.actions";
import { toggoleFollow } from "@/actions/user.actions";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

const FollowButton = ({ userProfileId }: { userProfileId: string }) => {
  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const isFollowed = async () => {
      const result = await checkFollowExistance(userProfileId);
      setIsAlreadyFollowed(!!result?.find);
    };
    isFollowed();
  }, [userProfileId]);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await toggoleFollow(userProfileId);

      setIsAlreadyFollowed((prev) => !prev);
      if (!isAlreadyFollowed) toast.success("Followed Successfully!");
      if (isAlreadyFollowed) toast.success("Unfollowed Successfully!");
    } catch (err) {
      console.log("error occu", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button disabled={isLoading} onClick={handleFollow} variant={"secondary"}>
        {isAlreadyFollowed ? (
          <div>
            {isLoading ? (
              <Loader2Icon className="animate-spin"></Loader2Icon>
            ) : (
              "Unfollow"
            )}
          </div>
        ) : (
          <div>
            {isLoading ? (
              <Loader2Icon className="animate-spin"></Loader2Icon>
            ) : (
              "Follow"
            )}
          </div>
        )}
      </Button>
    </div>
  );
};

export default FollowButton;
