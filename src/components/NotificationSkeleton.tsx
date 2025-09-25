import { Skeleton } from "./ui/skeleton";

const NotificationSkeleton = () => {
  return (
    <div className="h-[100vh] w-full flex items-start  px-2 py-6">
      <div className="w-3/4 space-y-4">
        {/* multiple skeletons */}
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSkeleton;
