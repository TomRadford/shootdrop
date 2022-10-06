import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const NavLink = ({ label, link, setShowNav }) => (
  <li className="py-2 font-bold">
    <Link href={link}>
      <a>
        <button onClick={() => setShowNav(false)}>{label}</button>
      </a>
    </Link>
  </li>
)

const User = ({}) => (
  <div className="mx-auto flex flex-row items-center justify-center gap-4 py-5 md:fixed md:bottom-2 md:left-24">
    <span className="text-sm font-light">User</span>
    <Image
      src="/img/download.jfif"
      width="30px"
      height="30px"
      className="rounded-full bg-white"
      objectFit="cover"
    />
  </div>
)

const NavBar = () => {
  const [showNav, setShowNav] = useState(false)
  return (
    <nav className="bg-gray-secondary top:0 fixed w-screen py-2 text-center text-white md:left-0 md:h-screen md:w-64 md:py-10">
      <div className="px-3">
        <h1 className="mx-auto inline-block justify-center text-2xl font-semibold">
          ShootDrop
        </h1>
        <button
          className="fixed right-0 pt-1 pr-4 md:hidden"
          onClick={() => setShowNav(!showNav)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          !showNav && "hidden"
        } md:mx-16 md:block md:pt-3 md:text-left`}
      >
        <div className={`pt-6`}>
          <p className="text-md font-light">Drops</p>
          <ul>
            <NavLink label="Create" link="/drops/create" setShowNav />
            <NavLink label="Browse" link="/drops" setShowNav />
          </ul>
        </div>
        <div className={`pt-6`}>
          <p className="text-md font-light">Gear</p>
          <ul>
            <NavLink label="Add" link="/gear/add" setShowNav />
            <NavLink label="Browse" link="/gear" setShowNav />
          </ul>
        </div>
        <User />
      </div>
    </nav>
  )
}
export default NavBar
