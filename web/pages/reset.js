import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Card from '../components/Card'
import Layout from '../components/layout'
import Loading from '../components/Loading'
import LoadingSpinner from '../components/elements/LoadingSpinner'
import Notification from '../components/Notification'
const { useQuery, useMutation } = require('@apollo/client')
const { ME, PASSWORD_RESET } = require('../lib/apollo/queries')

const ResetCard = () => {
	const [username, setUsername] = useState('')
	const router = useRouter()
	const [messageData, setMessageData] = useState({ message: '', type: '' })
	const [passwordReset, result] = useMutation(PASSWORD_RESET, {
		onError: (e) =>
			setMessageData({ message: e.graphQLErrors[0].message, type: 'error' }),
	})

	const handleReset = (e) => {
		e.preventDefault()
		passwordReset({
			variables: {
				username,
			},
		})
	}

	return (
		<div className="w-[17rem]">
			<div className="mb-4">
				<h2 className="mb-3 text-xl font-semibold">Reset password</h2>
				{!result.data && (
					<p className="font-light">
						Enter your email below to recieve a reset email.
					</p>
				)}
			</div>
			{result.data ? (
				<Card>
					<div>
						<h1 className="mb-2 font-bold">Reset email sent!</h1>
						<p className="text-sm">
							Please check your spam folder. Note that the reset link is only
							valid for 10 minutes.
						</p>
					</div>
				</Card>
			) : (
				<Card>
					{result.loading ? (
						<div className="flex h-64 flex-col items-center justify-center gap-1">
							<LoadingSpinner />
						</div>
					) : (
						<form onSubmit={handleReset} className="flex flex-col gap-1">
							<input
								className="bg-transparent lowercase"
								placeholder="Email"
								type="email"
								value={username}
								autoComplete="email"
								onChange={({ target }) => setUsername(target.value)}
								required
							/>

							<Notification
								messageData={messageData}
								setMessageData={setMessageData}
							/>

							<button type="submit" className="mt-4">
								Reset
							</button>
							<div id="registerCaptchaContainer"></div>
						</form>
					)}
				</Card>
			)}
		</div>
	)
}

const PasswordResetPage = () => {
	const me = useQuery(ME)

	if (me.loading) return <Loading />
	if (!me.loading) {
		if (me.data.me) {
			//replace used instead of push
			//to prevent /login from being
			//added to history stack
			router.replace('/drops')
		}
	}
	return (
		<>
			<Head>
				<title>Reset Password | ShootDrop</title>
			</Head>
			<Layout>
				<div className="flex h-screen ">
					<div className="m-auto text-center">
						<ResetCard />
					</div>
				</div>
			</Layout>
		</>
	)
}

export default PasswordResetPage
