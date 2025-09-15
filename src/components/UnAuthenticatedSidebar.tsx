import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
const UnAuthenticatedSidebar = () => {
  return (
    <div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>
            Login to access your profile and connect with others
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <SignInButton mode="modal">
              <Button className="" variant="destructive">
                Login{" "}
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnAuthenticatedSidebar;
