import Resizer from 'react-image-file-resizer'

const makeWEBP = (file, maxWidth, maxHeight) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			maxWidth,
			maxHeight,
			'WEBP',
			100,
			0,
			(uri) => {
				resolve(uri)
			},
			'file'
		)
	})

const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

export { makeWEBP, toBase64 }
