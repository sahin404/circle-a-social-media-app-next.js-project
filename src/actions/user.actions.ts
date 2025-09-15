"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

//save user from clerk to database
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
  } catch (err) {
    console.log("Error in syncUser: ", err);
  }
};

//Data fetching for sidebar
export const getUserByClerkId = async (clerkId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      //joint other tables
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    if (!user) return null;
    return user;
  } catch (err) {
    console.log("Error occured to fetch user data using clerkId, ", err);
  }
};

export const getUserIdFromDb = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;
  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User Not Found!");
  return user.id;
};

// Get Random 3 user from database
export const getRandomUsers = async () => {
  try {
    const myId = await getUserIdFromDb();
    if (!myId) return [];
    const randomUsers = await prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: myId,
            },
          },
          {
            NOT: {
              followers: {
                some: {
                  followerId: myId,
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
      take: 3,
    });
    return randomUsers;
  } catch (err) {
    console.log("An error occured to get random users", err);
    return [];
  }
};


// Toggoling the follow 
export const toggoleFollow = async(targetId:string){
  try{
    const myId = await getUserIdFromDb();
    if(!myId) return null;
    
    if(myId === targetId) throw new Error("You cant follow yourself");

    const existance = await prisma.follow.findUnique({
      where:{
        followerId_followingId:{
          followerId:myId,
          followingId:targetId
        }
      }
    })
    if(!existance){
      //follow
      await prisma.$transaction([
        // create Notification
        prisma.notification.create({
          data:{
            userId:targetId,
            creatorId:myId,
            type:"FOLLOW"
          }
        }),

        //following
        prisma.follow.create({
          data:{
            followerId:myId,
            followingId:targetId
          }
        })
      ])

    }
    else{
      //unfollow
      await prisma.follow.delete({
        where:{
           followerId_followingId:{
          followerId:myId,
          followingId:targetId
        }
        }
      })
    }
  
  }
  catch(err){

  }
}