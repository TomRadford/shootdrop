import {
	LazyQueryExecFunction,
	useLazyQuery,
	useMutation,
} from '@apollo/client'
import { ADD_LIST, GET_LIST_ITEMS } from '../../lib/apollo/queries'
import { AddButton } from '../AddCard'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect } from 'react'
import Card from '../Card'
import useUserInDrop from '../../lib/hooks/userInDrop'
import useGetMe from '../../lib/hooks/getMe'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistance } from 'date-fns'
import {
	Drop,
	GearList,
	GearListItem,
	GetListItemsQuery,
	GetListItemsQueryVariables,
} from '../../__generated__/graphql'
const DropListInfo = ({
	drop,
	category,
	listEntry,
	setDeleteModalOpen,
	setListToDelete,
}: {
	drop: Drop
	category: string
	listEntry: GearList
	setDeleteModalOpen: Dispatch<SetStateAction<boolean>>
	setListToDelete: React.Dispatch<React.SetStateAction<GearList>>
}) => {
	const router = useRouter()
	const userInDrop = useUserInDrop(drop)
	const [getListItems, { data: itemsData, loading: itemsLoading }]: [
		LazyQueryExecFunction<any, GetListItemsQueryVariables>,
		{ data: GetListItemsQuery; loading: boolean }
	] = useLazyQuery(GET_LIST_ITEMS, { fetchPolicy: 'network-only' })

	const me = useGetMe()
	const [addList, { data, loading }] = useMutation(ADD_LIST)
	const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		addList({
			variables: {
				category,
				drop: drop.id,
			},
		})
	}
	useEffect(() => {
		if (listEntry) {
			getListItems({ variables: { list: listEntry.id } })
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (data) {
		router.push(`/list/${data.addList.id}`)
	}

	return (
		<>
			{listEntry ? (
				<div className="relative mx-auto w-80 transition-transform will-change-transform hover:scale-105 active:scale-95 sm:w-96">
					<Card>
						{userInDrop && (
							<button
								onClick={(e) => {
									e.preventDefault()
									setListToDelete(listEntry)
									setDeleteModalOpen(true)
								}}
								className="absolute right-3 top-3 rounded border border-solid border-slate-600 p-2 transition-colors duration-300 hover:bg-red-900"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="h-3 w-3"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
						)}
						<Link href={`/list/${listEntry.id}`}>
							<div className="pb-13 flex flex-col gap-1 px-4 py-2 ">
								<h3 className="text-md text-left font-semibold">
									{`${category[0]}${category.slice(1).toLowerCase()}`}
								</h3>
								<p className="text-left text-sm font-light text-gray-300">
									{listEntry.comment}
								</p>
								{itemsLoading ? (
									<div className="flex -space-x-3 md:-space-x-2">
										{[...new Array(5)].map((a, i) => (
											<div
												key={i}
												className="z-10 flex h-[30px] w-[30px] animate-pulse items-center justify-center rounded-full bg-gray-800 text-[10px]"
											></div>
										))}
									</div>
								) : itemsData && itemsData.getListItems.totalDocs === 0 ? (
									<p className="mb-2 text-left text-sm font-light text-gray-300">
										No items yet
									</p>
								) : (
									itemsData && (
										<div className="flex -space-x-3 md:-space-x-2">
											{itemsData.getListItems.gearListItems.map(
												(listItem: GearListItem, i) => {
													if (i < 12) {
														return (
															<Image
																alt={listItem.gearItem.model}
																src={
																	listItem.gearItem.images[0]
																		? listItem.gearItem.images[0].url
																		: `/img/default_gear.jpg`
																}
																width="30"
																height="30"
																objectFit="cover"
																className="rounded-full"
																key={listItem.id}
															/>
														)
													} else {
														if (i === 12) {
															return (
																<div
																	key={listItem.id} //ToDo: double check this works okay on rerenders
																	className="z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-800 text-[10px]"
																>
																	+{itemsData.getListItems.totalDocs - 8}
																</div>
															)
														}
													}
												}
											)}
										</div>
									)
								)}
								<p className="text-right text-[8px] font-light">
									Last edited{' '}
									{formatDistance(new Date(listEntry.updatedAt), new Date())}{' '}
									ago
								</p>
							</div>
						</Link>
					</Card>
				</div>
			) : userInDrop && me ? (
				<AddButton
					title={category}
					onClick={handleAdd}
					loading={loading || data}
				/>
			) : null}
		</>
	)
}

export default DropListInfo
