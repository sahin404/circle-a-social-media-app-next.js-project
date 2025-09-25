"use client";

import { getNotifications } from "@/actions/notification.actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

type NotificationType = {
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

  if (loading) return <p>Loading...</p>;
  console.log(notifications);
  return (
    <div>
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
          {/* {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))} */}
        </div>
      </ScrollArea>
    </div>
  );
};

export default page;
