"use client";
import ModeToggole from "@/components/ModeToggole";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { BellIcon, House, Loader2Icon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getUserByClerkId } from "@/actions/user.actions";
import Image from "next/image";

type dbUser = {
  username: string | null;
  profileImage: string | null;
};

const DesktopNavbar = () => {
  const { user } = useUser();
  const [dbUser, setDbUser] = useState<dbUser | null>(null);
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!user?.id) return; // wait until user exists

    const fetchDbUser = async () => {
      const fetchedUser = await getUserByClerkId(user.id);
      // console.log("Fetched dbUser:", fetchedUser);
      if (fetchedUser) setDbUser(fetchedUser);
    };

    fetchDbUser();
  }, [user?.id]);

    const handleLogout = async () => {
      try{
        setIsLoading(true);
        await signOut();
      }
      catch(err){

      }
      finally{
        setIsLoading(false);
      }
      
    };


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
          <div>
            <div className="relative">
              <button className="h-[30px] w-[30px] rounded-full overflow-hidden" onClick={() => setIsOpenLogout(!isOpenLogout)}>
                <Image
                  className="rounded-full object-cover"
                  height={30}
                  width={30}
                  src={dbUser?.profileImage || "/avatar.jpg"}
                  alt={"profile picture"}
                ></Image>
              </button>
              {/* Logout Button */}
              {isOpenLogout && (
                <div className="absolute text-sm -left-12 mt-3 bg-gray-500 px-3 py-2 rounded bg-opacity-70">
                  <button onClick={handleLogout}>
                    {isLoading? <Loader2Icon className="animate-spin"></Loader2Icon> : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default DesktopNavbar;
