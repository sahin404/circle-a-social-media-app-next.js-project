"use client";

import { getNotifications } from "@/actions/notification.actions";
import NotificationSkeleton from "@/components/NotificationSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

type NotificationType = {
  id: string,
  type:string,
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

const page = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  //fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notification = await getNotifications();
        if (notification.success) setNotifications(notification.notifications ?? []);
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
              <div className="text-sm h-56">{notification.type}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default page;
