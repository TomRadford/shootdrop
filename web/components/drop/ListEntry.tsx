import Card from '../Card'
import { GearListItem, GearList } from '../../__generated__/graphql'

import Link from 'next/link'
import Image from 'next/legacy/image'
import { formatDistance } from 'date-fns'
import { useQuery } from '@apollo/client'
import { GET_LIST_ITEMS } from '../../lib/apollo/queries'
import { capitalize } from '../../lib/utils'

const ListEntry = ({
	listEntry,
	category,
	userInDrop,
	setListToDelete,
	setDeleteModalOpen,
}: {
	listEntry: GearList
	category: string
	userInDrop: boolean
	setListToDelete: (listEntry: GearList) => void
	setDeleteModalOpen: (open: boolean) => void
}) => {
	const { data: itemsData, loading: itemsLoading } = useQuery(GET_LIST_ITEMS, {
		fetchPolicy: 'cache-and-network',
		variables: { list: listEntry.id },
	})

	return (
		<div className="relative mx-auto w-80 sm:w-96" key={listEntry.id}>
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
							{listEntry.title
								? listEntry.title
								: `${capitalize(listEntry.category.toLowerCase())} list`}
						</h3>
						<p className="text-left text-sm font-light text-gray-300">
							{listEntry.comment}
						</p>
						{itemsLoading && !itemsData ? (
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
										(listItem: GearListItem, i: number) => {
											if (i < 12) {
												return (
													<Image
														alt={listItem.gearItem.model}
														src={
															listItem.gearItem.images[0]
																? listItem.gearItem.images[0].url
																: `/img/default_gear.jpg`
														}
														width={30}
														height={30}
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
							{formatDistance(new Date(listEntry.updatedAt), new Date())} ago
						</p>
					</div>
				</Link>
			</Card>
		</div>
	)
}

export default ListEntry
