"use server";
import prisma from "@/lib/prisma";
import {getUserByClerkId, getUserIdFromDb } from "./user.actions";
import { auth } from "@clerk/nextjs/server";

export const postContent = async (content: string, Image: string) => {
  try {
    const authorId = await getUserIdFromDb();
    if (!authorId) return null;
    const post = await prisma.post.create({
      data: {
        content,
        Image,
        authorId,
      },
    });
    return {success:true, post};
  } catch(err) {
    console.log("Error occured to do post. ", err);
    return {success:false};
  }
};



export const getPosts = async()=>{
  const {userId} = await auth();
  if(!userId) return [];
  const dbUser = await getUserByClerkId(userId);
  if(!dbUser) return [];

  try{

  }
  catch(err){
    console.log('An error occured to fetching posts. ', err);
    return [];
  }
}
