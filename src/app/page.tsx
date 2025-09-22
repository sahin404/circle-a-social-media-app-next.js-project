import { getPosts } from "@/actions/post.actions";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import YouMayFollow from "@/components/YouMayFollow";

export default async function Home() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          <div className="space-y-5">
            <CreatePost />
            {/* Posts Section */}
            <div className="px-5 space-y-5 lg:px-0">
              {
                posts.map((post,id)=><PostCard key={id} post={post}></PostCard>)
              }
            </div>
          </div>
        </div>
        <div className="sticky top-20 lg:block hidden lg:col-span-4 ">
          <YouMayFollow />
        </div>
      </div>
    </div>
  );
}
