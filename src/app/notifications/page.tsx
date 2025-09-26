import NotificationsClient from "@/components/NotificationsClient";
import Sidebar from "@/components/Sidebar";

const page = () => {
  
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
