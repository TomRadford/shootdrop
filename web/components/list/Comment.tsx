import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import useGetMe from '../../lib/hooks/getMe'
import { useMutation } from '@apollo/client'
import { EDIT_LIST } from '../../lib/apollo/queries'
import { useEffect } from 'react'
import useUserInDrop from '../../lib/hooks/userInDrop'
import { UPDATE_TIMEOUT } from '../../lib/config'
import { GearList } from '../../__generated__/graphql'

const ListComment = ({ list }: { list: GearList }) => {
	const [comment, setComment] = useState(
		list ? (list.comment ? list.comment : '') : ''
	)
	const me = useGetMe()
	const userInDrop = useUserInDrop(list.drop)

	const [editList, editListResult] = useMutation(EDIT_LIST)

	useEffect(() => {
		setComment(list && list.comment ? list.comment : '')
	}, [list.comment])

	useEffect(() => {
		//If !gearItem.description, only update to description/"" if logged in
		if (list.comment !== comment) {
			const timeout = setTimeout(() => {
				console.log('updating list comment')
				editList({
					variables: {
						id: list.id,
						comment,
					},
				})
			}, UPDATE_TIMEOUT)
			return () => clearTimeout(timeout)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [comment])

	return (
		<TextareaAutosize
			name="Comment"
			className="w-full resize-none whitespace-pre-wrap bg-transparent text-left text-sm font-light text-gray-200 md:text-sm"
			placeholder="Short description of this list, ideally making any important notes on the gear selection."
			autoComplete="off"
			data-gramm="false"
			data-gramm_editor="false"
			data-enable-grammarly="false"
			value={comment}
			onChange={({ target }) => setComment(target.value)}
			disabled={!me || !userInDrop}
		/>
	)
}

export default ListComment
