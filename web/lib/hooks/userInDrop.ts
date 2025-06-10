import { useState, useEffect, useMemo } from 'react'
import { Drop } from '../../__generated__/graphql'
import useGetMe from './getMe'

const useUserInDrop = (drop: Drop) => {
	const me = useGetMe()

	return useMemo(() => {
		if (me && drop?.id) {
			if (drop.users.find((user) => user.id === me.id)) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}, [me, drop?.id])
}

export default useUserInDrop
