"use client";
import { Comment, Post, User } from "@/generated/prisma";
import { Card } from "./ui/card";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Heart, Loader2Icon, MessageSquare, Send, Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserByClerkId } from "@/actions/user.actions";
import {
  createComment,
  deletePost,
  likePost,
  unlikePost,
} from "@/actions/post.actions";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
// TypeScript
type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
  comments: Comment[];
  likes: { authorId: string }[];
  comment: {
    content: string;
    author: User;
    createdAt: Date;
  };
};

const PostCard = ({ post }: { post: PostWithAuthor }) => {
  const [openComments, setOpenComments] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);
  const [likeFill, setLikeFill] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [commenting, setCommenting] = useState(false);

  const { user } = useUser();
  const { theme } = useTheme();

  // Fetching LoggedIn User
  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      const dbUser = await getUserByClerkId(user.id);
      if (dbUser) setLoggedInUser(dbUser);
    };
    fetchUser();
  }, [user]);

  // asignling the loggedIn user liked or not this post
  useEffect(() => {
    if (!loggedInUser) return;
    const result = post.likes.some((like) => like.authorId == loggedInUser.id);
    setLikeFill(result);
    setHasLiked(result);
  }, [loggedInUser, post.likes]);

  if (!loggedInUser) return null;

  // Handle Delete Button
  const handleDelete = async () => {
    try {
      const result = await deletePost(post.id);
      if (result.success) {
        toast.success("Successfully deleted the post!");
      } else {
        toast.error("Something Went Wrong!");
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  };

  // Handle Like
  const handleLike = async () => {
    if (hasLiked) {
      setHasLiked(!hasLiked);
      setLikeFill(!likeFill);
      setOptimisticLikes((prev) => prev - 1);
      //unlike in database
      await unlikePost(post.id, loggedInUser.id);
    } else {
      setHasLiked(!hasLiked);
      setLikeFill(!likeFill);
      setOptimisticLikes((prev) => prev + 1);
      //liked in database
      await likePost(post.id, loggedInUser.id);
    }
  };

  // Handle Comments
  const handleComment = async () => {
    if (commenting) return;
    try {
      setCommenting(true);
      await createComment(post.id, loggedInUser.id, comment);
    } catch (err) {
      console.log("An error Occured to create Comment!", err);
    } finally {
      setComment("");
      setCommenting(false);
    }
  };

  return (
    <div>
      <Card>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between">
          <div className="flex gap-3">
            {/* Image */}
            <div>
              <Image
                className="rounded-full"
                alt="Profile Picture"
                src={post.author.image}
                height={40}
                width={40}
              ></Image>
            </div>
            {/* Name, username, time */}
            <div className="flex flex-col lg:flex-row lg:gap-3">
              <span>{post.author.name}</span>
              <div className="flex gap-3">
                <span className="text-gray-500 text-sm ">
                  @{post.author.username}
                </span>

                <span className="text-gray-500 text-sm">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
            {/* Delete Button */}
            <div>
              {loggedInUser.id === post.author.id ? (
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <button>
                        <div className="text-gray-500">
                          <Trash height={18} />
                        </div>
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your post from your account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : (
                ""
              )}
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
              <button onClick={handleLike}>
                {theme === "dark" ? (
                  <Heart
                    stroke={likeFill ? "red" : "white"}
                    fill={`${likeFill ? "red" : "black"}`}
                    height={18}
                  />
                ) : (
                  <Heart
                    stroke={likeFill ? "red" : "black"}
                    fill={`${likeFill ? "red" : "white"}`}
                    height={18}
                  />
                )}
              </button>
              <span>{optimisticLikes}</span>
            </div>

            <div>
              <button
                className="flex items-center gap-1"
                onClick={() => setOpenComments(!openComments)}
              >
                <MessageSquare
                  fill={openComments ? "currentColor" : "none"}
                  height={18}
                />
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
                    <div key={comment.id}>{comment.content}</div>
                  ))}
                </div>
                {/* Create Comment */}
                <div className="flex flex-col">
                  <div className="flex space-x-3">
                    <div>
                      <Image
                        className="rounded-full"
                        height={30}
                        width={30}
                        src={loggedInUser.image || "/avatar.jpg"}
                        alt="user Image"
                      />
                    </div>
                    <div className="w-full">
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment..."
                        className="h-20 resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button
                      disabled={commenting || !comment}
                      onClick={handleComment}
                      variant="secondary"
                    >
                      {commenting ? (
                        <div className="flex gap-2">
                          <Loader2Icon className="animate-spin"></Loader2Icon>
                          Submitting..
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send size={15} />
                          Comment
                        </div>
                      )}
                    </Button>
                  </div>
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
