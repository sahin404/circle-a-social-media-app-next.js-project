"use server";
import prisma from "@/lib/prisma";
import { getUserByClerkId, getUserIdFromDb } from "./user.actions";
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




