import { getUserIdFromDb } from "@/actions/user.actions";
import CustomUnauthorized from "@/components/CustomUnauthorized";
import NotificationsClient from "@/components/NotificationsClient";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata:Metadata={
  title:'Circle | Notifications'
}

const page = async() => {
  const dbUser  = await getUserIdFromDb();
  if(!dbUser) return <CustomUnauthorized></CustomUnauthorized>
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="hidden lg:block lg:col-span-3">
        <Sidebar></Sidebar>
      </div>
      <div className="lg:col-span-7">
        <NotificationsClient></NotificationsClient>
      </div>
    </div>
  );
};

export default page;
