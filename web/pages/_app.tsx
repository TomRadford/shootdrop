import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/apollo/client'
import '../styles/globals.css'
import { NextAdapter } from 'next-query-params'
import { QueryParamProvider } from 'use-query-params'
import NextProgress from 'next-progress'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import Button from '../components/elements/Button'
import { useEffect, useState } from 'react'
import LoadingSpinner from '../components/elements/LoadingSpinner'
import { Analytics } from '@vercel/analytics/react'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	const [showError, setShowError] = useState<boolean>(false)
	// Show spinner and then error after 3s
	// ToDo: implement useErrorHandler() for Apollo Client
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowError(true)
		}, 3000)
		return () => clearTimeout(timeout)
	}, [showError])
	return (
		<main className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
			{showError ? (
				<>
					<div className="text-sm text-gray-500">{error.message}</div>
					<Button onClick={resetErrorBoundary}>Try Again</Button>
				</>
			) : (
				<LoadingSpinner />
			)}
		</main>
	)
}

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<ApolloProvider client={client}>
				<QueryParamProvider adapter={NextAdapter}>
					<NextProgress
						// delay={0} setting higher than 0 triggers endless loader indication on Router.push
						color="#364667"
						//
						customGlobalCss={
							`
				#nprogress {
					pointer-events: none;
				}
				#nprogress .bar {
					background: #364667;
					position: fixed;
					z-index: 0;
					top: 48px;
					left: 0;
					width: 100%;
					height: 2px;
				}
				@media (min-width: 768px) {
					#nprogress .bar {
						top: 0;
					}
				}
				/* Fancy blur effect */
				#nprogress .peg {
					display: block;
					position: absolute;
					right: 0px;
					width: 100px;
					height: 100%;
					box-shadow: 0 0 10px #364667, 0 0 5px #364667;
					opacity: 1.0;
					-webkit-transform: rotate(3deg) translate(0px, -4px);
							-ms-transform: rotate(3deg) translate(0px, -4px);
									transform: rotate(3deg) translate(0px, -4px);
				}
		
				` as unknown as string
						}
						// Waiting for patch on NextProgress
						options={{
							minimum: 0.3,
						}}
					/>
					<Component {...pageProps} />
					<Analytics debug={false} />
				</QueryParamProvider>
			</ApolloProvider>
		</ErrorBoundary>
	)
}

export default App
