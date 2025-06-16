import { useQuery, NetworkStatus } from '@apollo/client'
import { ALL_GEAR_ITEMS, GET_LIST_ITEMS } from '../../lib/apollo/queries'
import Link from 'next/link'
import { InView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import TagsModal from './TagsModal'
import GearFilter from './Filter'
import { useGearQueryParams } from '../../lib/hooks/queryParams'
import GearItem from './Item'
import ItemModal from '../list/ItemModal'
import useUserInDrop from '../../lib/hooks/userInDrop'
import { GearList } from '../../__generated__/graphql'

const GearListSkeleton = ({ length = 20 }) => (
	<>
		{[...Array(length)].map((a, i) => (
			<div
				key={i}
				className="h-[330px] w-[300px] animate-pulse overflow-hidden rounded-xl bg-gray-500 shadow-lg"
			></div>
		))}
	</>
)

//GearBrowser to be used on /gear, /list/[id] and /list/[id]/add routes
const GearBrowser = ({
	listToAdd,
	list,
}: {
	listToAdd?: GearList
	list?: GearList
}) => {
	const [query, setQuery] = useGearQueryParams()
	const [tagsModalOpen, setTagsModalOpen] = useState(false)
	const userInDrop = useUserInDrop(list ? list.drop : null)

	const {
		data: allGearData,
		refetch,
		fetchMore: fetchMoreGear,
		networkStatus,
	} = useQuery(list ? GET_LIST_ITEMS : ALL_GEAR_ITEMS, {
		variables: list
			? { ...query, list: list.id }
			: listToAdd
			? { ...query, category: listToAdd.category }
			: query,
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
	})

	/**
	 * This also includes refetch since we wanna also show skeleton when the gear query params change
	 *
	 * Note that we also refetch when the window is refocussed,
	 * which will trigger this to be true (thus showing skelly)
	 * but I think that's gucci tbh
	 */
	const isInitialLoading =
		networkStatus === NetworkStatus.loading ||
		networkStatus === NetworkStatus.refetch

	const fetchingMore = networkStatus === NetworkStatus.fetchMore

	useEffect(() => {
		// refetch when url query params change from filter
		refetch()
		// ToDo: find a better way to reactively re-call query on query params change,
		// for some reason useQuery from apollo client doesn't re-call automatically when
		// the query when the query params change

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])

	const handleInView = (inView, entry) => {
		if (isInitialLoading || fetchingMore || !allGearData) {
			return
		}

		if (
			inView &&
			(list
				? allGearData.getListItems.gearListItems.length <
				  allGearData.getListItems.totalDocs
				: allGearData.allGearItems.gearItems.length <
				  allGearData.allGearItems.totalDocs)
		) {
			fetchMoreGear({
				variables: {
					offset: list
						? allGearData.getListItems.gearListItems.length
						: allGearData.allGearItems.gearItems.length,
				},
			})
		}
	}

	return (
		<div className="flex h-full min-h-screen">
			<div className="mb-10 w-full pt-0 text-center md:mx-0 md:mb-20 md:pt-0">
				<TagsModal
					tagsModalOpen={tagsModalOpen}
					listCategory={
						list ? list.category : listToAdd ? listToAdd.category : null
					}
					setTagsModalOpen={setTagsModalOpen}
				/>
				<ItemModal list={listToAdd} />

				<GearFilter
					refetch={refetch}
					setTagsModalOpen={setTagsModalOpen}
					list={list}
					listToAdd={listToAdd}
				/>

				<div className="mb-10">
					{isInitialLoading ? (
						<div className="mx-2 ">
							<div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
								<GearListSkeleton />
							</div>
						</div>
					) : (
						<div className="mx-2 ">
							<div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
								{list ? (
									allGearData &&
									allGearData.getListItems.gearListItems.length > 0 ? (
										allGearData.getListItems.gearListItems.map(
											(gearListItem) => (
												<GearItem
													key={gearListItem.id}
													data={gearListItem}
													list={list}
												/>
											)
										)
									) : (
										<h3 className="font-light text-gray-300">
											{userInDrop ? (
												<>
													No items yet,
													<Link
														href={`/list/${list.id}/add`}
														className="font-bold"
													>
														&nbsp;add something!
													</Link>
												</>
											) : (
												<>No items yet.</>
											)}
										</h3>
									)
								) : null}
								{!list ? (
									allGearData &&
									allGearData.allGearItems.gearItems.length > 0 ? (
										allGearData.allGearItems.gearItems.map((gearItem) => (
											<GearItem
												key={gearItem.id}
												data={gearItem}
												listToAdd={listToAdd}
											/>
										))
									) : (
										<>
											<h3 className="font-light text-gray-300">
												No results :(
											</h3>
										</>
									)
								) : null}

								{fetchingMore && <GearListSkeleton length={4} />}
							</div>
							{/* To trigger fetchMore */}
							<InView as="div" onChange={handleInView} />
						</div>
					)}
				</div>
				{list || listToAdd ? (
					<div className="fixed left-0 bottom-0 flex w-full justify-center bg-gradient-to-t from-black px-10 md:pl-64">
						<div className="flex w-full max-w-4xl justify-between py-16 px-4 pb-4 md:pb-10">
							<div>
								{list ? (
									<Link href={`/drops/${list.drop.id}`} className="flex gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="h-6 w-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
											/>
										</svg>
										Back to Drop
									</Link>
								) : (
									<Link href={`/list/${listToAdd.id}`} className="flex gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="h-6 w-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
											/>
										</svg>
										Back to List
									</Link>
								)}
							</div>
							{list && userInDrop ? (
								<div>
									<Link href={`/list/${list.id}/add`} className="flex gap-2">
										Add Items +
									</Link>
								</div>
							) : null}
						</div>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default GearBrowser
