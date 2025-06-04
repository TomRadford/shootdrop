const info = (...params: any[]) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(...params)
	}
}

const error = (...params: any[]) => {
	if (process.env.NODE_ENV) {
		console.error(...params)
	}
}

export default { info, error }
