import { useMutation } from '@apollo/client'
import { GearList } from '../../__generated__/graphql'
import { EDIT_LIST } from '../../lib/apollo/queries'
import { useEffect } from 'react'
import { useState } from 'react'
import useGetMe from '../../lib/hooks/getMe'
import useUserInDrop from '../../lib/hooks/userInDrop'
import { UPDATE_TIMEOUT } from '../../lib/config'
import { capitalize } from '../../lib/utils'

export const ListTitle = ({ list }: { list: GearList }) => {
	const [editList, editListResult] = useMutation(EDIT_LIST)
	const [title, setTitle] = useState(list ? (list.title ? list.title : '') : '')
	const me = useGetMe()
	const userInDrop = useUserInDrop(list.drop)

	useEffect(() => {
		//If !gearItem.description, only update to description/"" if logged in
		if (list.title !== title) {
			const timeout = setTimeout(() => {
				console.log('updating list comment')
				editList({
					variables: {
						id: list.id,
						title,
					},
				})
			}, UPDATE_TIMEOUT)
			return () => clearTimeout(timeout)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [title])

	return me && userInDrop ? (
		<input
			placeholder={`Enter a title for this list`}
			type="text"
			value={title}
			onChange={(e) => setTitle(e.target.value)}
			disabled={!me || !userInDrop}
			className="flex bg-transparent text-left"
		/>
	) : (
		<h3 className="text-lg font-semibold capitalize">
			{title ? title : `${capitalize(list.category.toLowerCase())} list`}
		</h3>
	)
}
