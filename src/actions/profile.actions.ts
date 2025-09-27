"use server";

import prisma from "@/lib/prisma";
import { getUserIdFromDb } from "./user.actions";

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

export const checkFollowExistance = async(targetUserId:string)=>{
  const loggedInUserId = await getUserIdFromDb();
  if(!loggedInUserId || !targetUserId) return null;
  try{
    const result = await prisma.follow.findUnique({
      where:{
        followerId_followingId:{
          followerId:loggedInUserId,
          followingId:targetUserId,
        }
      }
    })
    if(!result){
      return {find:false};
    }
    return {find:true}
    
  }
  catch(err){
    console.log('An error occured to check if two id following or not.', err);
    return {find:false};
  }
  
}