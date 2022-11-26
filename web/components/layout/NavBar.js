import { useState } from "react"
import { useQuery } from "@apollo/client"
import Link from "next/link"
import Image from "next/image"
import ClientOnly from "../ClientOnly"
import { ME } from "../../lib/apollo/queries"
import useCheckAuth from "../../lib/hooks/checkAuth"
import useGetMe from "../../lib/hooks/getMe"

const NavLink = ({ label, link, setShowNav }) => (
  <li className="py-2 font-bold">
    <Link href={link}>
      <a>
        <button onClick={() => setShowNav(false)}>{label}</button>
      </a>
    </Link>
  </li>
)

const User = ({ me }) => {
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className="mx-auto flex flex-1 flex-row items-center justify-center gap-4 py-5">
      {me ? (
        <>
          <button onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>

          <Link href="/me">
            <button className="flex items-center gap-3">
              <span className="text-sm font-light">
                {me.fullName ? me.fullName : me.username}
              </span>

              <Image
                src={
                  me.profilePicture
                    ? me.profilePicture
                    : `/img/default_user.png`
                }
                width="30px"
                height="30px"
                className="rounded-full"
                objectFit="cover"
                alt={me.fullName}
              />
            </button>
          </Link>
        </>
      ) : (
        <Link href="/login">
          <button className="text-sm font-light">Login</button>
        </Link>
      )}
    </div>
  )
}

const NavBar = () => {
  const [showNav, setShowNav] = useState(false)
  const me = useGetMe()
  return (
    <nav
      className="bg-gray-secondary top:0 fixed z-50 flex w-full flex-col py-2 text-center text-white md:left-0 md:h-screen md:w-64 md:py-10"
      onMouseLeave={() => setShowNav(false)}
    >
      <div className="px-3">
        <Link href="/">
          <a>
            <button className="mx-auto inline-block justify-center text-2xl font-semibold">
              ShootDrop
            </button>
          </a>
        </Link>
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
            <NavLink
              label="Add"
              link={me ? `/drops/add` : `login`}
              setShowNav={setShowNav}
            />
            <NavLink
              label="Browse"
              link={me ? `/drops` : `login`}
              setShowNav={setShowNav}
            />
          </ul>
        </div>
        <div className={`pt-6`}>
          <p className="text-md font-light">Gear</p>
          <ul>
            <NavLink
              label="Add"
              link={me ? `/gear/add` : `login`}
              setShowNav={setShowNav}
            />
            <NavLink label="Browse" link="/gear" setShowNav={setShowNav} />
          </ul>
        </div>
      </div>
      <div className={`${!showNav && "hidden"} mt-auto md:block`}>
        <ClientOnly>
          <User me={me} />
        </ClientOnly>
      </div>
    </nav>
  )
}
export default NavBar
