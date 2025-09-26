"use client";
import { getNotifications } from "@/actions/notification.actions";
import NotificationSkeleton from "@/components/NotificationSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type NotificationType = {
  id: string;
  type: string;
  post: {
    content: string | null;
    Image: string | null;
  } | null;
  comment: {
    content: string;
  } | null;
  creator: {
    username: string;
    name: string | null;
    image: string | null;
  };
};

const NotificationsClient = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  //fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notification = await getNotifications();
        if (notification.success)
          setNotifications(notification.notifications ?? []);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <NotificationSkeleton />;
  console.log(notifications);

  return (
    <div>
      <h4 className="mb-4 text-sm leading-none font-medium">Notifications</h4>
      <ScrollArea className="h-[100vh] w-full rounded-md border p-4">
        <div className="p-4">
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              {/* Notification Container */}
              <div className="">
                {/* Image and Name and message */}
                <div className="flex items-center">
                  {/* image */}
                  <div className="mr-2">
                    <Image
                      height={30}
                      width={30}
                      className="rounded-full"
                      src={notification.creator.image || "/avatar.jpg"}
                      alt={notification.creator.username}
                    ></Image>
                  </div>
                  {/* name */}
                  <div className="mr-1">
                    <span>{notification.creator.name}</span>
                  </div>
                  {/* Dedicated Message */}
                  <div>
                    {notification.type === "LIKE" && (
                      <span>likes your post</span>
                    )}
                    {notification.type === "FOLLOW" && (
                      <span>starting followed you.</span>
                    )}
                    {notification.type === "Comment" && (
                      <span>comment to your post.</span>
                    )}
                  </div>
                </div>
                {/* comment and post */}
                <div>
                  {/* Comment Content */}
                  {notification.type === "Comment" && notification.comment && (
                    <div className="text-sm p-2 ml-2">
                      {notification.comment.content}
                    </div>
                  )}
                  {/* Post */}
                  {(notification.type === "LIKE" ||
                    notification.type === "Comment") &&
                    notification.post && (
                      <div className="border rounded-md p-2 mb-2 bg-gray-600 ml-7">
                        {notification.post.content && (
                          <p className="text-sm text-white mb-1">
                            {notification.post.content}
                          </p>
                        )}
                        {notification.post.Image && (
                          <img
                            src={notification.post.Image}
                            alt="post image"
                            className="w-full max-h-48 object-cover rounded-md"
                          />
                        )}
                      </div>
                    )}
                </div>
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationsClient;
