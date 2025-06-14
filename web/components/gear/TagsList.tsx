import useGetMe from '../../lib/hooks/getMe'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_GEAR_ITEM, ALL_TAGS } from '../../lib/apollo/queries'
import { useGearQueryParams } from '../../lib/hooks/queryParams'
import { GearItem } from '../../__generated__/graphql'

// Takes either GearItem (GearEditor) or setQuery & query (GearBrowser)
const GearTags = ({
	gearItem,
	setTagsModalOpen,
	title = 'Tags',
	subtitle = 'tap to remove',
}: {
	gearItem?: GearItem
	setTagsModalOpen: (open: boolean) => void
	title?: string
	subtitle?: string
}) => {
	const me = useGetMe()
	const [query, setQuery] = useGearQueryParams()

	const {
		data: allTagsData,
		loading: allTagsLoading,
		refetch: refetchTags,
	} = useQuery(ALL_TAGS, {
		variables: { tags: query.tags ? query.tags : [] },
	})

	const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
	let tags = []
	if (gearItem) {
		tags = gearItem.tags
	} else {
		//Get tag names from query.tags id's
		if (allTagsData) {
			tags = [...allTagsData.allTags]
		}
	}

	return (
		<div className="flex flex-col gap-1 px-4 pb-4">
			<div className="mb-2 flex items-baseline gap-2">
				<h3 className="text-left font-semibold">{title}</h3>
				{(me || !gearItem) && (
					<p className="text-xs font-light text-gray-300">{subtitle}</p>
				)}
			</div>
			<div className="flex flex-wrap gap-2">
				{allTagsLoading ? (
					// Sekelon loader for tags while pulling in ALL_TAGS query for tag.name
					<>
						{query.tags &&
							query.tags.map((tagId) => (
								<button
									key={tagId}
									className="flex h-7 w-20 animate-pulse items-center rounded bg-teal-600 px-2 py-1 text-sm opacity-70"
								></button>
							))}
					</>
				) : (
					tags.map((tag) => (
						<div key={tag.id}>
							<button
								onClick={(e) => {
									e.preventDefault()
									gearItem
										? editGearItem({
												variables: {
													id: gearItem.id,
													tags: gearItem.tags
														.filter((itemTag) => itemTag.id !== tag.id)
														.map((tag) => tag.name),
												},
										  })
										: setQuery({
												//remove this tag from queryParams
												tags: query.tags.filter(
													(filterTag) => filterTag !== tag.id
												),
										  })
								}}
								disabled={!me && !!gearItem}
								className={`flex items-center rounded bg-teal-600 px-2 py-1 text-sm transition-colors duration-300 ${
									(me || !gearItem) && `hover:bg-red-500`
								}`}
								key={tag.id}
							>
								<div>{tag.name}</div>
							</button>
						</div>
					))
				)}
				{(me || !gearItem) && (
					<button
						onClick={(e) => {
							e.preventDefault()
							setTagsModalOpen(true)
						}}
						className="flex items-center rounded bg-teal-600 px-2 py-1 text-sm "
					>
						<div>+</div>
					</button>
				)}
			</div>
		</div>
	)
}

export default GearTags
