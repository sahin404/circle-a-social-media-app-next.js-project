import { Post } from "@/generated/prisma";
import { Card } from "./ui/card";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Trash } from "lucide-react";
type PostWithAuthor = Post & {
  author: {
    name: string;
    username: string;
    image: string;
  };
};

const PostCard = ({ post }: { post: PostWithAuthor }) => {
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
              <span className="text-gray-600">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            {/* Delete Button */}
            <div className="text-gray-400">
              <Trash height={18} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostCard;
