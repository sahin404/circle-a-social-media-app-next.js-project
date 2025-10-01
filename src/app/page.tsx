import { getPosts } from "@/actions/post.actions";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import YouMayFollow from "@/components/YouMayFollow";
import { CameraOff } from "lucide-react";

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="hidden lg:block lg:col-span-3">
          <Sidebar></Sidebar>
        </div>
        <div className="lg:col-span-6">
          <div className="space-y-5">
            <CreatePost />
            {/* Posts Section */}
            <div className="px-5 space-y-5 lg:px-0">
              {
                posts.length === 0? 
                <div className=" mt-8 flex flex-col gap-3 items-center justify-center">
                  <div className="text-center">
                    <CameraOff />
                  </div>
                  Not Posts Yet.
                </div> 
                : 
                <div> 
                  {
                    posts.map((post)=><PostCard key={post.id} post={post}></PostCard>)
                  }
              </div>
              
             
              }
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className="sticky top-20 lg:block hidden lg:col-span-3 ">
          <YouMayFollow />
        </div>
      </div>
    </div>
  );
}
