import Image from 'next/image'
import Link from 'next/link'
import pbLogo from '../pb.png'

export default function Header({ name }) {
  return (
    <header className="p-2">
      <div className="flex items-center">
        <Image
          src={pbLogo}
          alt="pb"
          className="dark:invert cursor-pointer"
          width="80"
          height="80"
          onClick={() => (window.location.href = '/')}
        />
      </div>
    </header>
  )
}
