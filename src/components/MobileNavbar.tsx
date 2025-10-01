"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import ModeToggole from "@/components/ModeToggole";
import Link from "next/link";
import { getUserByClerkId } from "@/actions/user.actions";

type dbUser = {
  username: string | null;
  profileImage: string | null;
};

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useUser();
  const [dbUser, setDbUser] = useState<dbUser | null>(null);
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
    <div className="flex lg:hidden items-center space-x-2">
      <ModeToggole></ModeToggole>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href={`/profile/${dbUser?.username}`}>
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start w-full"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
