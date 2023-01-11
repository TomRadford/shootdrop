import NavBar from './NavBar'
const Layout = ({ children }) => {
	return (
		<div className="bg-gray-main min-h-screen ">
			<NavBar />
			<main className="overflow-hidden text-white md:ml-64 md:pt-0">
				{children}
			</main>
		</div>
	)
}

export default Layout
