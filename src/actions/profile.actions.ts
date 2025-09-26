"use server";

import prisma from "@/lib/prisma";

export const getUserProfileInfo = async (username: string) => {
  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            author: {
              select: {
                id: true,
                profileImage: true,
                name: true,
                username: true,
              },
            },
            likes: {
              select: {
                authorId: true,
              },
            },
            comments: {
              include: {
                author: {
                  select: {
                    name: true,
                    username: true,
                    profileImage: true,
                  },
                },
              },
              orderBy: {
                createdAt: "asc",
              },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },
      },
    });

    return userProfile;
  } catch (err) {
    console.log("An error occure to get user profile info!", err);
    return null;
  }
};
