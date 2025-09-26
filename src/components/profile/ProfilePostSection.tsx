"use client";

import PostCard from "../PostCard";

const ProfilePostSection = ({ posts }: { posts: any }) => {
  return (
    <div>
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ProfilePostSection;
