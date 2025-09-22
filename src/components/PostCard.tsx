import { Post } from "@/generated/prisma"

const PostCard = ({post}:{post:Post}) => {
  return (
    <div>{post.content}</div>
  )
}

export default PostCard