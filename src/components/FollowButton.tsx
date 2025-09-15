"use client";

import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const FollowButton = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowButton = ()=>{
    setIsLoading(true);
    try{

    }
    catch(err){

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
