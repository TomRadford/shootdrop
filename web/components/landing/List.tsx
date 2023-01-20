import { formatDistance } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { GearListWithItems } from '../../lib/types'
import Card from '../Card'

// Cant use DropListInfo due to data fetching done during build (SSG) for lading

const LandingList = ({ list }: { list: GearListWithItems }) => (
	<Link href={`/list/${list.id}`}>
		<a>
			<div className="mx-auto w-80 transition-transform will-change-transform hover:scale-105 active:scale-95 sm:w-96">
				<Card>
					<div className="pb-13 flex flex-col gap-1 px-4 py-2 ">
						<h3 className="text-md text-left font-semibold">
							{`${list.category[0]}${list.category.slice(1).toLowerCase()}`}
						</h3>
						<p className="text-left text-sm font-light text-gray-300">
							{list.comment}
						</p>
						{list.itemCount === 0 ? (
							<p className="mb-2 text-left text-sm font-light text-gray-300">
								No items yet
							</p>
						) : (
							list.items && (
								<div className="flex -space-x-3 md:-space-x-2">
									{list.items.map((listItem, i) => {
										if (i < 12) {
											return (
												<Image
													alt={listItem.gearItem.model}
													src={
														listItem.gearItem.images[0]
															? listItem.gearItem.images[0].url
															: `/img/default_gear.jpg`
													}
													width="30px"
													height="30px"
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
														+{list.itemCount - 8}
													</div>
												)
											}
										}
									})}
								</div>
							)
						)}
						<p className="text-right text-[8px] font-light">
							Last edited {formatDistance(new Date(list.updatedAt), new Date())}{' '}
							ago
						</p>
					</div>
				</Card>
			</div>
		</a>
	</Link>
)

export default LandingList
