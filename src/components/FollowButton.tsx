"use client";

import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { toggoleFollow } from "@/actions/user.actions";
import toast from "react-hot-toast";

const FollowButton = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowButton = async()=>{
    setIsLoading(true);
    try{
        await toggoleFollow(userId);
        toast.success("Followed Successfully!")
    }
    catch(err){
        console.log("An error occured to giving follow", err);
        toast.error("An Error Occured to Follow this User.")
    }
    finally{
        setIsLoading(false);
    }

  }
  return (
    <div>
      <Button
        variant="secondary"
        disabled={isLoading}
        onClick={handleFollowButton}
      >
        {isLoading ? (
          <Loader2Icon className="size-4 animate-spin"></Loader2Icon>
        ) : (
          "Follow"
        )}
      </Button>
    </div>
  );
};

export default FollowButton;
