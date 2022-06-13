import { useEffect } from 'react'

const PostPage = () => {
  useEffect(() => {
    window.location.href = '/'
  }, [])
  return null
}

export default PostPage
