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
    const posts=await prisma.post.findMany({
      orderBy:{
        createdAt:'desc',
      },
      include:{
        author:{
          select:{
            image:true,
            name:true,
            username:true
          }
        },
        likes:{
          select:{
            authorId:true,
          }
        },
        comments:{
          include:{
            author:{
              select:{
                name:true,
                username:true,
                image:true
              }
            }
          },
          orderBy:{
            createdAt:"asc"
          }
        },
        _count:{
          select:{
            likes:true,
            comments:true
          }
        }

      }
    });

    return posts;
  }
  catch(err){
    console.log('An error occured to fetching posts. ', err);
    return [];
  }
}
