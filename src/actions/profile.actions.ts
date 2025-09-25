"use server";

import prisma from "@/lib/prisma";

export const getUserProfileInfo = async (username: string) => {
  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return userProfile;
  } catch (err) {
    console.log("An error occure to get user profile info!", err);
    return null;
  }
};
