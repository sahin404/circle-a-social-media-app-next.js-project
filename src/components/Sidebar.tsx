import { getUserByClerkId } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Link2, MapPin } from "lucide-react";
import Link from "next/link";

const Sidebar = async () => {
  const user = await currentUser();
  if (!user) return <UnAuthenticatedSidebar />;

  const dbUser = await getUserByClerkId(user.id);

  if (!dbUser) return <UnAuthenticatedSidebar />;
  // console.log(dbUser);
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center justify-center space-y-5">
          <Link href={`/profile/${dbUser.username}`}>
          <Image
            className="rounded-full"
            width={100}
            height={100}
            src={dbUser?.image || "avatar.jpg"}
            alt="Profile Picture"
          />
          </Link>
          <div className="space-y-1 text-center">
            <CardTitle>{dbUser.name}</CardTitle>
            <CardDescription>{dbUser.username}</CardDescription>
            <CardDescription className="text-md">{dbUser.bio}</CardDescription>
          </div>
        </CardHeader>
        <div className="-mt-2">
          <Separator></Separator>
        </div>
        {/* Following and Followers */}
        <CardContent>
          <div className="flex justify-between py-4">
            <div className="flex flex-col items-center justify-center">
              <span>{dbUser._count.following}</span>
              <span>Following</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span>{dbUser._count.followers}</span>
              <span>Followers</span>
            </div>
          </div>
        </CardContent>
        <div className="-mt-2">
          <Separator></Separator>
        </div>
        {/* Location and Links */}
        <CardFooter className="mt-5 flex flex-col items-start">
          <div className="space-y-3 text-md">
            <div className="flex items-center gap-1">
              <MapPin className="h-5" />
              <span>{dbUser.location || "No Location"}</span>
            </div>
            <div className="flex items-center gap-1">
               <Link2 className="h-5" />
              <span>{dbUser.website || "No Website"}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Sidebar;
