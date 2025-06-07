import { useEffect, useState } from 'react'
import GearTags from './TagsList'
import {
	GearQueryParams,
	useGearQueryParams,
} from '../../lib/hooks/queryParams'
import Link from 'next/link'
import ListComment from '../list/Comment'
import { UPDATE_TIMEOUT } from '../../lib/config'

// Debounced query params used for search state
const GearFilter = ({ refetch, setTagsModalOpen, list, listToAdd }) => {
	const [query, setQuery] = useGearQueryParams()
	// const [refetchGearData, ] = useLazyQuery(ALL_GEAR_ITEMS, { variables: query })
	const [debouncedManufacturer, setDebouncedManufacturer] = useState('')
	const [debouncedModel, setDebouncedModel] = useState('')

	//set debouce values on history navigate / page load
	useEffect(() => {
		if (query.manufacturer !== undefined) {
			if (query.manufacturer === '') {
				setQuery(() => ({ manufacturer: null }))
				setDebouncedManufacturer('')
			} else {
				setDebouncedManufacturer(query.manufacturer)
			}
		}
		if (query.model !== undefined) {
			if (query.model === '') {
				setQuery(() => ({ model: null }))
				setDebouncedModel('')
			} else {
				setDebouncedModel(query.model)
			}
		}
	}, [query])

	useEffect(() => {
		if (
			query.manufacturer !== debouncedManufacturer ||
			query.model !== debouncedModel
		) {
			console.log('updating query params')
			// setRefetching(true)
			let newParams: GearQueryParams = {}
			if (debouncedManufacturer.length > 0) {
				newParams.manufacturer = debouncedManufacturer
			}
			if (debouncedModel.length > 0) {
				newParams.model = debouncedModel
			}
			//prevent any tags / category from being reset
			newParams.tags = query.tags
			newParams.category = query.category
			const timeout = setTimeout(() => {
				//resets previous values with push over default pushIn
				setQuery(newParams, 'push')
			}, UPDATE_TIMEOUT)
			return () => clearTimeout(timeout)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedModel, debouncedManufacturer])

	const handleCategoryChange = (e, newCategory) => {
		e.preventDefault()
		if (newCategory === 'All categories') {
			setQuery({
				category: null,
			})
		} else {
			setQuery({
				category: newCategory.toUpperCase(),
			})
		}
	}

	return (
		<form className="flex w-full flex-wrap items-center justify-center gap-8 bg-gradient-to-b from-[#121212] to-transparent pb-8 pt-16 md:pt-8">
			<div className="flex flex-col gap-1 px-3 xl:flex-row">
				{!list && !listToAdd ? (
					<div className="relative z-10 mb-14 flex w-full select-none justify-center sm:justify-start xl:mr-40">
						<div className="group absolute rounded-xl bg-[#191f29]">
							<div className="w-32 cursor-pointer py-1 px-2 ">
								{query.category
									? `${query.category[0]}${query.category
											.slice(1)
											.toLowerCase()}`
									: `All categories`}
							</div>
							<div className="hidden flex-col justify-center gap-1  group-hover:flex">
								{['All categories', 'Camera', 'Grips', 'Lighting', 'Sound'].map(
									(categoryOption) =>
										query.category
											? categoryOption.toUpperCase() !== query.category && (
													<button
														key={categoryOption}
														className="border-t-[1px] border-gray-400 px-2"
														onClick={(e) =>
															handleCategoryChange(e, categoryOption)
														}
													>
														{categoryOption}
													</button>
											  )
											: categoryOption !== 'All categories' && (
													<button
														key={categoryOption}
														className="border-t-[1px] border-gray-400 px-2"
														onClick={(e) =>
															handleCategoryChange(e, categoryOption)
														}
													>
														{categoryOption}
													</button>
											  )
								)}
							</div>
						</div>
					</div>
				) : list ? (
					<div className="flex flex-col text-left">
						<h2 className="text-lg font-semibold capitalize">
							{list.category.toLowerCase()} gear
						</h2>
						<Link href={`/drops/${list.drop.id}`}>
							<h4 className="text-sm">
								for <span className="font-medium">{list.drop.project}</span>
							</h4>
						</Link>
					</div>
				) : (
					<div className="mr-4 mb-4 flex flex-col text-left">
						<h2 className="text-lg capitalize">
							Add{' '}
							<Link href={`/list/${listToAdd.id}`} className="font-semibold">
								{listToAdd.category.toLowerCase()} gear
							</Link>
						</h2>
						<Link href={`/drops/${listToAdd.drop.id}`}>
							<h4 className="text-sm">
								for{' '}
								<span className="font-medium">{listToAdd.drop.project}</span>
							</h4>
						</Link>
					</div>
				)}
				{list && <ListComment list={list} />}
				{!list ? (
					<div className="flex flex-col gap-1">
						<input
							placeholder="Manufacturer"
							type="search"
							className=" bg-gray-800 bg-opacity-40 py-1 px-2 xl:w-96"
							value={debouncedManufacturer}
							onChange={({ target }) => setDebouncedManufacturer(target.value)}
						/>
						<input
							placeholder="Model"
							type="search"
							className=" bg-gray-800 bg-opacity-40 py-1 px-2 xl:w-96"
							value={debouncedModel}
							onChange={({ target }) => setDebouncedModel(target.value)}
						/>
					</div>
				) : null}
			</div>
			<div className="w-64 lg:w-96">
				<div className="rounded-3xl bg-gray-800 bg-opacity-40 py-4 px-4">
					<GearTags setTagsModalOpen={setTagsModalOpen} />
				</div>
			</div>
		</form>
	)
}

export default GearFilter
