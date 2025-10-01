"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { updateProfile } from "@/actions/user.actions";

type UserProfile = {
  id: string;
  name: string;
  bio: string;
  website: string;
  location: string;
};

const EditProfile = ({ userProfile }: { userProfile: UserProfile }) => {
  const [formData, setFormData] = useState({
    name: userProfile?.name || "",
    bio: userProfile?.bio || "",
    website: userProfile?.website || "",
    location: userProfile?.location || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await updateProfile(formData, userProfile.id);
      if (res.success) {
        toast.success("Profile updated successfully!");
        setOpen(false); // Auto close modal
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>
          <Button variant="outline">Edit Profile</Button>
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label>Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Write Your Name"
            />
          </div>

          <div>
            <label>Bio</label>
            <Input
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write Your Bio"
            />
          </div>

          <div>
            <label>Website</label>
            <Input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Write Your Website"
            />
          </div>

          <div>
            <label>Location</label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Write Your Location"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center gap-2 justify-center">
                Submitting...
                <Loader2Icon className="animate-spin w-4 h-4" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
