import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="bg-gray-main">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
