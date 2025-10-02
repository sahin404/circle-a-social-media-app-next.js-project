import { getUserIdFromDb } from "@/actions/user.actions";
import CustomUnauthorized from "@/components/CustomUnauthorized";
import NotificationsClient from "@/components/NotificationsClient";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Circle | Notifications",
};

const page = async () => {
  const dbUserId = await getUserIdFromDb();
  if (!dbUserId) return <CustomUnauthorized></CustomUnauthorized>;
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden lg:block lg:col-span-3">
          <Sidebar></Sidebar>
        </div>
        <div className="lg:col-span-7">
          <NotificationsClient></NotificationsClient>
        </div>
      </div>
    </div>
  );
};

export default page;
