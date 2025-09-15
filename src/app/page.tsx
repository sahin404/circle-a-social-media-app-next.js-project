import CreatePost from "@/components/CreatePost";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          <div>
            <CreatePost />
            
          </div>
        </div>
        <div className="sticky top-20 lg:block hidden lg:col-span-4 ">
          to follow  section
        </div>

      </div>
      
    </div>
  );
}
