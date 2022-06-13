import '../styles/globals.css'
import 'prismjs/themes/prism-tomorrow.css'
import { Router } from 'next/router'
import withGA from 'next-ga'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default withGA(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, Router)(MyApp)
