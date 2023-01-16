import { ME } from '../../lib/apollo/queries'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const useCheckAuth = () => {
	const router = useRouter()
	const { loading, data } = useQuery(ME)
	if (loading) {
		return null
	}
	if (!data.me) {
		router.push('/login')
	}
}

export default useCheckAuth
