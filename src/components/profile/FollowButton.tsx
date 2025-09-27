"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { checkFollowExistance } from "@/actions/profile.actions";

const FollowButton = ({userProfileId}:{userProfileId:string}) => {
  
  const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false);

  useEffect(()=>{
    const isFollowed = async()=>{
        const result = await checkFollowExistance(userProfileId);
        if(result?.find){
          setIsAlreadyFollowed(true);
        }
    }
    isFollowed();

  },[userProfileId])

  const handleFollow = ( ) =>{

  }

  return (
    <div>
      <Button onClick={handleFollow} variant={"secondary"}>
        {isAlreadyFollowed?'Unfollow':'Follow'}
      </Button>
    </div>
  )
}

export default FollowButton