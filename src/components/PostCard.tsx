"use client";
import { Comment, Post } from "@/generated/prisma";
import { Card } from "./ui/card";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Divide, Heart, MessageCircle, Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { useState } from "react";
type PostWithAuthor = Post & {
  author: {
    name: string;
    username: string;
    image: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
  comments: Comment[];
};

const PostCard = ({ post }: { post: PostWithAuthor }) => {
  const [openComments, setOpenComments] = useState(false);
  return (
    <div>
      <Card>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between">
            {/* Author */}
            <div className="flex gap-3">
              <Image
                className="rounded-full"
                alt="Profile Picture"
                src={post.author.image}
                height={40}
                width={40}
              ></Image>
              <span>{post.author.name}</span>
              <span className="text-gray-500 text-sm ">
                @{post.author.username}
              </span>
              <span className="text-gray-500 text-sm">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            {/* Delete Button */}
            <div className="text-gray-500">
              <Trash height={18} />
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Text */}
            <div className="px-2 py-5">
              <span>{post.content}</span>
            </div>
            {/* TODO: Image */}
            <div></div>
          </div>

          {/* Footer */}
          <div className="flex  gap-5">
            <div className="flex items-center gap-1">
              <Heart height={18} />
              <span>{post._count.likes}</span>
            </div>

            <div>
              <button
                className="flex items-center gap-1"
                onClick={() => setOpenComments(!openComments)}
              >
                <MessageCircle height={18} />
                <span>{post._count.comments}</span>
              </button>
            </div>
          </div>

          {openComments && (
            <div>
              {/* Comment Section */}
              <div className="my-5">
                <Separator></Separator>
              </div>
              <div>
                {/* Fetching Comment */}
                <div>
                  {post.comments.map((comment) => (
                    <div></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PostCard;
