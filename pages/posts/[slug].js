import { getPostBySlug, postFilePaths } from '../../utils/mdx-utils'

import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import CustomLink from '../../components/CustomLink'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import Tags from '../../components/Tags'

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

export default function PostPage({ source, postData }) {
  return (
    <Layout>
      <SEO title={postData.title} description={postData.description} />
      <main>
        <article className="px-6 md:px-0">
          <header>
            <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
              {postData.title}
            </h1>
            {postData.description && (
              <p className="text-xl mb-4">{postData.description}</p>
            )}
            {postData.tags && <Tags tags={postData.tags} />}
          </header>
          <article className="prose dark:prose-dark">
            <MDXRemote {...source} components={components} />
          </article>
        </article>
      </main>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const { mdxSource, data } = await getPostBySlug(params.slug)

  return {
    props: {
      source: mdxSource,
      postData: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
