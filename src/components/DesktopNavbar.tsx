"use client"
import ModeToggole from "@/components/ModeToggole";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { BellIcon, House, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getUserByClerkId } from "@/actions/user.actions";

const DesktopNavbar = () => {
  const {user} = useUser();
  const [dbUser,setDbUser] = useState([]);
  useEffect(() => {
    if (!user?.id) return; // wait until user exists

    const fetchDbUser = async () => {
      const fetchedUser = await getUserByClerkId(user.id);
      // console.log("Fetched dbUser:", fetchedUser);
      if (fetchedUser) setDbUser(fetchedUser);
    };

    fetchDbUser();
  }, [user?.id]);


  return (
    <div className="hidden lg:flex gap-10 items-center ">
      <ModeToggole></ModeToggole>
      <Link href="/">
        <div className="flex items-center transition-all duration-200 gap-1 text-sm hover:text-blue-600 ">
          <House className="w-4" />
          <span>Home</span>
        </div>
      </Link>
      
      {/* If signed In then notification and profile will be show */}
      <SignedIn>
        <Link href="/notifications">
          <div className="flex items-center transition-all duration-200 gap-1 text-sm hover:text-blue-600 ">
            <BellIcon className="w-4" />
            <span>Notification</span>
          </div>
        </Link>
        <Link href={`/profile/${dbUser?.username}`}>
          <div className="flex items-center transition-all duration-200 gap-1 text-sm hover:text-blue-600 ">
            <UserIcon className="w-4" />
            <span>Profile</span>
          </div>
        </Link>
      </SignedIn>

      <div>
        <SignedOut>
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default DesktopNavbar;
