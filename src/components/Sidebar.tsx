import { getUserByClerkId } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";

const Sidebar = async () => {
  const user = await currentUser();
  if (!user) return <UnAuthenticatedSidebar />;

  const dbUser = await getUserByClerkId(user.id);

  if (!dbUser) return <UnAuthenticatedSidebar />;

  return <div>{dbUser.name}</div>;
};

export default Sidebar;
