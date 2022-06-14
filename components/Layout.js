import classNames from 'classnames'
import { useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import styles from './Layout.module.css'
import SEO from './SEO'

// get random property from object passed in
const randP = (obj) => {
  const keys = Object.keys(obj)
  return obj[keys[(keys.length * Math.random()) << 0]]
}

export default function Layout({ children }) {
  const setAppTheme = () => {
    const darkMode = localStorage.getItem('theme') === 'dark'
    const lightMode = localStorage.getItem('theme') === 'light'

    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else if (lightMode) {
      document.documentElement.classList.remove('dark')
    }
    return
  }

  const handleSystemThemeChange = () => {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

    darkQuery.onchange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }

  useEffect(() => {
    setAppTheme()
  }, [])

  useEffect(() => {
    handleSystemThemeChange()
  }, [])

  return (
    <div
      className={classNames('relative pb-16 overflow-hidden min-h-screen', {
        [randP(styles)]: true,
      })}
    >
      <SEO title="pateb.dev" description="Pate Bryant Blog" />
      <Header name="pateb.dev" />
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {children}
      </div>
      <Footer
        copyrightText={`All Rights Reserved ${new Date().getFullYear()}`}
      />
    </div>
  )
}
