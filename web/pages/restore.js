import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Loading from '../components/Loading'
import { ME } from '../lib/apollo/queries'
import useHasMounted from '../lib/hooks/mounted'

const RestoreLoginPage = () => {
	const hasMounted = useHasMounted()
	const router = useRouter()
	//note: Apollo client error handler will redirect to /login if token has expired
	const me = useQuery(ME, {
		fetchPolicy: 'network-only',
		onError: () => {
			return router.replace('/login')
		},
	})
	if (hasMounted) {
		//dont run on server

		if (me.loading) return <Loading />

		const { token } = router.query

		localStorage.setItem('shootdrop-user-token', token)
		me.refetch() //invalidate cache
		setTimeout(() => {
			router.replace('/me?passwordreset=true')
		}, 1000)
	}
	return <Loading title={'Please enter a new password on the next page'} />
}

export default RestoreLoginPage
