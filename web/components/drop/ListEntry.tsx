import Card from '../Card'
import { GearListItem, GearList, Drop } from '../../__generated__/graphql'

import Link from 'next/link'
import Image from 'next/legacy/image'
import { formatDistance } from 'date-fns'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_DROPS, COPY_LISTS, GET_LIST_ITEMS } from '../../lib/apollo/queries'
import { capitalize, cn } from '../../lib/utils'
import RubbishIcon from '../elements/icons/RubbishIcon'
import Button from '../elements/Button'
import DuplicateIcon from '../elements/icons/DuplicateIcon'

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

	const [copyList, { loading: copyListLoading }] = useMutation(COPY_LISTS, {
		update: (cache, response) => {
			cache.updateQuery(
				{ query: ALL_DROPS, variables: { drop: listEntry.drop.id } },
				(data: { allDrops: Drop[] } | null) => {
					if (!data) return null

					return {
						allDrops: data.allDrops.map((drop) =>
							drop.id === listEntry.drop.id
								? {
										...drop,
										lists: [...drop.lists, ...response.data.copyLists],
								  }
								: drop
						),
					}
				}
			)
		},
	})

	return (
		<div
			className={cn(
				'relative mx-auto w-80 sm:w-96',
				copyListLoading && 'animate-pulse pointer-events-none'
			)}
			key={listEntry.id}
		>
			<Card>
				{userInDrop && (
					<>
						<Button
							onClick={(e) => {
								e.preventDefault()
								setListToDelete(listEntry)
								setDeleteModalOpen(true)
							}}
							variant="outline"
							className="absolute right-3 top-3 rounded border border-solid border-slate-600 p-2 transition-colors duration-300 hover:bg-red-900"
						>
							<RubbishIcon width={12} height={12} />
						</Button>
						<Button
							onClick={(e) => {
								e.preventDefault()
								copyList({
									variables: {
										lists: [listEntry.id],
										targetDrop: listEntry.drop.id,
									},
								})
							}}
							variant="outline"
							className="absolute right-12 top-3 rounded border border-solid border-slate-600 p-2 transition-colors duration-300 hover:bg-blue-900"
						>
							<DuplicateIcon width={12} height={12} />
						</Button>
					</>
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
