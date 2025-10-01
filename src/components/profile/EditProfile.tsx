"use client";

import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { updateProfile } from "@/actions/user.actions";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";

type userProfile = {
  id: string;
  name: string;
  bio: string;
  website: string;
  location: string;
};

const EditProfile = ({ userProfile }: { userProfile: userProfile }) => {
  const [formData, setFormData] = useState({
    name: userProfile?.name || "",
    bio: userProfile?.bio || "",
    website: userProfile?.website || "",
    location: userProfile?.location || "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await updateProfile(formData, userProfile.id);
      if (res.success) {
        toast.success("Successfully Updated the information.");
      }
      setOpen(false);
    } catch (err) {
      console.log("An error occured to information update", err);
      toast.error("Something went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {};
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={handleEdit} variant={"outline"}>
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Edit Profile</DialogTitle>
            <DialogDescription className="text-center">
              Update Your Profile Information Below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            {/* name */}
            <div className="space-y-2">
              <label>Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Write Your Name"
              ></Input>
            </div>
            {/* bio */}
            <div className="space-y-2">
              <label>Bio</label>
              <Input
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write Your Biodata"
              ></Input>
            </div>
            {/* website */}
            <div className="space-y-2">
              <label>Website</label>
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Write Your Website Link"
              ></Input>
            </div>
            {/* Location */}
            <div className="space-y-2">
              <label>Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Write Your location address"
              ></Input>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              type="submit"
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Submitting...{" "}
                  <Loader2Icon className="animate-spin"></Loader2Icon>{" "}
                </div>
              ) : (
                <div>Submit</div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfile;
