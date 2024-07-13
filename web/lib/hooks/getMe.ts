import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { User } from '../../__generated__/graphql'
import { ME } from '../apollo/queries'

const useGetMe = (): User => {
	const { loading, data } = useQuery(ME)
	if (loading) return null
	const me: User = data?.me
	return me
}

export default useGetMe
