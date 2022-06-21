import PostCard from './PostCard'

const PostList = ({ posts }) => {
  return (
    <ul className="w-full">
      {posts.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </ul>
  )
}

export default PostList
