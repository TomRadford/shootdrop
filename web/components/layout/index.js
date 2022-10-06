import NavBar from "./nav"

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className="bg-gray-main min-h-screen">{children}</main>
    </div>
  )
}

export default Layout
