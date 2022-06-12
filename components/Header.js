import Image from 'next/image'
import Link from 'next/link'
import pbLogo from '../pb.png'

export default function Header({ name }) {
  return (
    <header className="p-2">
      <div className="flex items-center">
        <div className="mr-2 w-20">
          <Image src={pbLogo} alt="pb" className="dark:invert" />
        </div>
      </div>
    </header>
  )
}
