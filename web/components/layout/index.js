import NavBar from "./NavBar"

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-main">
      <NavBar />
      <main className="text-white md:pt-0 md:pl-64">{children}</main>
    </div>
  )
}

export default Layout
