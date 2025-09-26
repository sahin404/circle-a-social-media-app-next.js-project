import { Mail, MapPin, Globe, Calendar } from "lucide-react";
import { format } from "date-fns";
const ProfileSidebar = ({
  cardContent,
}: {
  cardContent: {
    email: string;
    location: string;
    website: string;
    createdAt: string;
  };
}) => {
  return (
    <div className="rounded-2xl p-4 space-y-4">
      {/* Email */}
      <div className="flex items-center gap-3">
        <Mail className="w-5 h-5 " />
        <span>{cardContent.email || "Not provided"}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-3">
        <MapPin className="w-5 h-5 " />
        <span>{cardContent.location || "No location set"}</span>
      </div>

      {/* Website */}
      <div className="flex items-center gap-3">
        <Globe className="w-5 h-5" />
        <a
          href={cardContent.website || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {cardContent.website || "No website"}
        </a>
      </div>

      {/* Join Date */}
      <div className="flex items-center gap-3 ">
        <Calendar className="w-5 h-5" />
        <span>
          Joined {format(new Date(cardContent.createdAt), "MMMM yyyy")}
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
