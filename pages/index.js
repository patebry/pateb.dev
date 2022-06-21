import { getRecentPosts } from '../utils/mdx-utils'

import Layout from '../components/Layout'
import PostList from '../components/PostList'

export default function Index({ posts }) {
  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          Most Recent Posts
        </h1>
        <PostList posts={posts} />
      </main>
    </Layout>
  )
}

export function getStaticProps() {
  const posts = getRecentPosts(5)

  return { props: { posts } }
}
