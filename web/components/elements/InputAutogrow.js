import { useState, useRef, useEffect } from 'react'

const Input = ({ className, setValue, placeholder }) => {
	const [content, setContent] = useState(placeholder)
	const [width, setWidth] = useState(0)
	const span = useRef()

	useEffect(() => {
		setWidth(span.current.offsetWidth)
	}, [content])

	const changeHandler = (e) => {
		setContent(e.target.value)
		setValue(e.target.value)
	}

	return (
		<>
			<span className="opacity-1 absolute z-[-100] whitespace-pre" ref={span}>
				{content}
			</span>
			<input
				className={`min-w-0 w-[${width}] p-0 ${className}`}
				type="text"
				autoFocus
				value={content}
				onChange={changeHandler}
			/>
		</>
	)
}

export default Input
