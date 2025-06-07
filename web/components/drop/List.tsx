import { useMutation } from '@apollo/client'
import { ADD_LIST, GET_LIST_ITEMS } from '../../lib/apollo/queries'
import { AddButton } from '../AddCard'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect } from 'react'
import useUserInDrop from '../../lib/hooks/userInDrop'
import useGetMe from '../../lib/hooks/getMe'
import { Drop, GearList } from '../../__generated__/graphql'
import AddIcon from '../ui/icons/AddIcon'
import Button from '../elements/Button'
import { capitalize } from '../../lib/utils'
import ListEntry from './ListEntry'

const DropListInfo = ({
	drop,
	category,
	listEntries,
	setDeleteModalOpen,
	setListToDelete,
}: {
	drop: Drop
	category: string
	listEntries?: GearList[]
	setDeleteModalOpen: Dispatch<SetStateAction<boolean>>
	setListToDelete: React.Dispatch<React.SetStateAction<GearList>>
}) => {
	const router = useRouter()
	const userInDrop = useUserInDrop(drop)

	const me = useGetMe()

	const [addList, { data, loading }] = useMutation(ADD_LIST, {
		onCompleted: (data) => {
			router.push(`/list/${data.addList.id}`)
		},
	})

	const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		addList({
			variables: {
				category,
				drop: drop.id,
			},
		})
	}

	const canEdit = userInDrop && me

	return (
		<div className="flex relative flex-col gap-4">
			<div className="flex w-full justify-center gap-2">
				{canEdit || listEntries.length ? (
					<h3 className="font-bold text-lg">
						{capitalize(category.toLowerCase())}
					</h3>
				) : null}

				{canEdit && listEntries.length ? (
					<Button
						onClick={handleAdd}
						className="flex items-center p-1"
						variant="outline"
					>
						<AddIcon width={16} height={16} />
					</Button>
				) : null}
			</div>
			{!!listEntries?.length ? (
				listEntries.map((listEntry) => (
					<ListEntry
						key={listEntry.id}
						listEntry={listEntry}
						category={category}
						userInDrop={userInDrop}
						setListToDelete={setListToDelete}
						setDeleteModalOpen={setDeleteModalOpen}
					/>
				))
			) : canEdit && !listEntries.length ? (
				<AddButton
					title={`Create list`}
					onClick={handleAdd}
					loading={loading || data}
				/>
			) : null}
		</div>
	)
}

export default DropListInfo
