import Layout from '../../components/Layout'
import { getTagPostsData, tagFilePaths } from '../../utils/mdx-utils'
import SEO from '../../components/SEO'
import capitalize from '../../utils/capitalize'
import { MDXRemote } from 'next-mdx-remote'
import CustomLink from '../../components/CustomLink'
import Head from 'next/head'
import PostList from '../../components/PostList'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  Head,
}

export default function TagPage({ posts, mdxSource, slug }) {
  const title = `${capitalize(slug)} Posts`
  return (
    <Layout>
      <SEO title={title} description={mdxSource.scope.description} />
      <main>
        <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
          {title}
        </h1>
        <article className="prose dark:prose-dark">
          <MDXRemote {...mdxSource} components={components} />
        </article>
        <PostList posts={posts} />
      </main>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const tagPostData = await getTagPostsData(params.slug)

  return { props: { ...tagPostData, slug: params.slug } }
}

export const getStaticPaths = async () => {
  const paths = tagFilePaths
    // Remove file extensions for page paths
    .map((tag) => tag.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
