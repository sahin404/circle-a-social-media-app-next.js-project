"use server";
import prisma from "@/lib/prisma";
import { getUserByClerkId, getUserIdFromDb } from "./user.actions";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NotificationType } from "@/generated/prisma";

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
    revalidatePath("/");
    return { success: true, post };
  } catch (err) {
    console.log("Error occured to do post. ", err);
    return { success: false };
  }
};

export const getPosts = async () => {
  const { userId } = await auth();
  if (!userId) return [];
  const dbUser = await getUserByClerkId(userId);
  if (!dbUser) return [];

  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            image: true,
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
                image: true,
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
    });
    revalidatePath("/");
    return posts;
  } catch (err) {
    console.log("An error occured to fetching posts. ", err);
    return [];
  }
};

export const deletePost = async (postId: string) => {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.log("An error occured to delete post!", err);
    return { success: false };
  }
};

export const likePost = async (postId: string, loggoedInUserId: string) => {
  try {
    if (!postId || !loggoedInUserId) return;

    //find author id
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if(!post) return;

    await prisma.$transaction([
      //create like
      prisma.like.create({
        data: {
          authorId: loggoedInUserId,
          postId: postId,
        },
      }),
      //create notification
      ...(post.authorId !== loggoedInUserId?
        [
          prisma.notification.create({
            data:{
              userId: post.authorId,
              creatorId:loggoedInUserId,
              type:NotificationType.LIKE,
              postId:postId
            }
          })
        ]:[])   
    ]);
  } catch (err) {
    console.log("An error occured to like post!", err);
  }
};

export const unlikePost = async (postId: string, loggoedInUserId: string) => {
  try {
    await prisma.like.delete({
      where: {
        authorId_postId: {
          authorId: loggoedInUserId,
          postId: postId,
        },
      },
    });
  } catch (err) {
    console.log("An error occured to unlike post!", err);
  }
};

export const createComment = async (
  postId: string,
  authorId: string,
  content: string
) => {
  try {
    // find post author
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) return;

    await prisma.$transaction([
      // create comment
      prisma.comment.create({
        data: {
          postId,
          authorId,
          content,
        },
      }),
      // create notification (if not self-comment)
      ...(post.authorId !== authorId
        ? [
            prisma.notification.create({
              data: {
                userId: post.authorId, 
                creatorId: authorId,    
                type: NotificationType.Comment,       
                postId: postId,
              },
            }),
          ]
        : []),
    ]);

    revalidatePath("/");
  } catch (err) {
    console.log("An error Occured to create Comment!", err);
  }
};