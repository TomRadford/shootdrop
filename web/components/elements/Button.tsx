type PropTypes = {
	onClick?: () => void | null,
	children: React.ReactNode
}

const Button = ({onClick, children}:PropTypes) => (
	<button onClick={onClick} className="bg-size-200 bg-pos-0 hover:bg-pos-100 ml-1 rounded bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 px-3 py-1 font-bold transition-all duration-500">
	{children}
	</button>
	)

export default Button