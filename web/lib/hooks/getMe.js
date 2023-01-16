import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ME } from '../apollo/queries'

const useGetMe = () => {
	const { loading, data } = useQuery(ME)
	if (loading) return null
	const { me } = data
	return me
}

export default useGetMe
