import Image from "next/image"
import Link from "next/link"


function Header() {
  return (
    <div className="w-full h-20 shadow-lg flex items-center justify-between px-5 md:px-12 bg-primary text-white">
        <Image
            className="w-20 md:w-[5.5rem]"
            src="/logo-best-travel.webp"
            alt="logo"
            width={400}
            height={400}
        />
        <nav>
            <ul>
                <li className="text-lg font-semibold "><Link href='/'>Home</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header
