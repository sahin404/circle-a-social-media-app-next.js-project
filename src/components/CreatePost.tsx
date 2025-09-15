"use client";
import Image from "next/image";
import { Card } from "./ui/card";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ImageIcon, Send } from "lucide-react";
import { useState } from "react";

const CreatePost = () => {
  const { user } = useUser();

  const [content, setContent] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  return (
    <div>
      <Card>
        {/* Avatar and TextArea Section */}
        <div className="flex gap-2 p-4 w-full">
          <div>
            <Image
              className="rounded-full"
              width={30}
              height={30}
              src={user?.imageUrl || "/avatar.jpg"}
              alt="avatar"
            ></Image>
          </div>
          <div className="w-full">
            <Textarea
              className="min-h-[100px] resize-none p-0 border-none text-base focus-visible:ring-0"
              placeholder="What's on your mind?"
            />
          </div>
        </div>

        <Separator></Separator>
        {/* Image and Button Section */}
        <div className="py-4 px-2 flex items-center justify-between">
          {/* Left Button */}
          <div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
              onClick={() => setShowImageUpload(!showImageUpload)}
              disabled={isPosting}
            >
              <ImageIcon className="size-4 mr-2" />
              Photo
            </Button>
          </div>
          {/* Right Button */}
          <div>
            <Button variant="secondary">
              <div className="flex items-center gap-2">
                <Send />
                Post
              </div>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreatePost;
