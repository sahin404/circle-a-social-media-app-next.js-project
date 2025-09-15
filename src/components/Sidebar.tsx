import { getUserByClerkId } from "@/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";


const Sidebar = async () => {
  const user = await currentUser();
  if (!user) return <UnAuthenticatedSidebar />;

  const dbUser = await getUserByClerkId(user.id);

  if (!dbUser) return <UnAuthenticatedSidebar />;
  console.log(dbUser);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Sidebar;
