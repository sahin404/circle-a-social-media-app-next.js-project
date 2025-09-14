"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export const syncUser = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) return;

    //existance checking
    const isExist = await prisma.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });

    if (isExist) return isExist;

    //save to dataabase
    const dbUser = prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username: `${
          user.username
            ? user.username
            : user.emailAddresses[0].emailAddress.split("@")[0]
        }`,
        image: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return dbUser;
  } catch(err) {
    console.log("Error in syncUser: ", err);
  }
};
