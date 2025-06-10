const AddIcon = ({
	width = 24,
	height = 24,
}: {
	width?: number
	height?: number
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M6 12H12M12 12H18M12 12V18M12 12V6"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

export default AddIcon
