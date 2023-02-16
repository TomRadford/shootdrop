import { useState, useEffect } from 'react'
import { Drop } from '../../__generated__/graphql'
import useGetMe from './getMe'

const useUserInDrop = (drop: Drop) => {
	const me = useGetMe()
	const [userInDrop, setUserInDrop] = useState(false)
	useEffect(() => {
		if (me && drop) {
			//ToDo: evaluate if boolean return is maybe a better fit
			if (drop.users.find((user) => user.id === me.id)) {
				setUserInDrop(true)
			} else {
				setUserInDrop(false)
			}
		} else {
			setUserInDrop(false)
		}
	}, [me, drop])
	return userInDrop
}

export default useUserInDrop
