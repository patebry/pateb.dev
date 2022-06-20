import Layout from '../../components/Layout'
import Link from 'next/link'
import ArrowIcon from '../../components/ArrowIcon'
import { getTagPostsData, tagFilePaths } from '../../utils/mdx-utils'
import SEO from '../../components/SEO'
import capitalize from '../../utils/capitalize'
import { MDXRemote } from 'next-mdx-remote'
import CustomLink from '../../components/CustomLink'
import Head from 'next/head'

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
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
              style={{ backdropFilter: 'blur(2px)' }}
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              >
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.data.date}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                  {post.data.description && (
                    <p className="mt-3 text-lg opacity-60">
                      {post.data.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
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
