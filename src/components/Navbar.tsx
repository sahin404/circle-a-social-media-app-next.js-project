import DesktopNavbar from "./DesktopNavbar";
import Logo from "@/components/Logo";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId, syncUser } from "@/actions/user.actions";


const Navbar = async() => {
  const user = await currentUser();
  if(user){
    await syncUser();
  }
  if(!user) return null;
  const dbUser = await getUserByClerkId(user.id);
  if (!dbUser) return null;
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* logo */}
          <Logo></Logo>

          <DesktopNavbar user={dbUser}></DesktopNavbar>
          <MobileNavbar user={dbUser}></MobileNavbar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
