import useGetMe from '../../lib/hooks/getMe'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useMutation } from '@apollo/client'
import {
	ADD_GEAR_ITEM,
	REMOVE_GEAR_ITEM,
	EDIT_GEAR_ITEM,
} from '../../lib/apollo/queries'
import { andFormatter } from '../../lib/text/formatter'
import useIsAddingStore from '../../lib/hooks/store/isAdding'
import { UPDATE_TIMEOUT } from '../../lib/config'
import Button from '../elements/Button'
import RubbishIcon from '../elements/icons/RubbishIcon'
import CategoriesModal from './CategoriesModal'

const GearHeader = ({ gearItem }) => {
	const [category, setCategory] = useState(gearItem ? gearItem.category : [])
	const [model, setModel] = useState(gearItem ? gearItem.model : '')
	const [manufacturer, setManufacturer] = useState(
		gearItem ? gearItem.manufacturer : ''
	)
	const [modalOpen, setModalOpen] = useState(false)
	const [addGearItem, { data: addData, loading: addLoading, error: addError }] =
		useMutation(ADD_GEAR_ITEM)
	const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
	const [removeGearItem, removeGearItemResult] = useMutation(REMOVE_GEAR_ITEM)
	const me = useGetMe()
	const router = useRouter()
	const setIsAdding = useIsAddingStore((state) => state.setIsAdding)
	const isAdmin = me?.admin

	useEffect(() => {
		setCategory(gearItem ? gearItem.category : [])
		setModel(gearItem ? gearItem.model : '')
		setManufacturer(gearItem ? gearItem.manufacturer : '')
	}, [gearItem])

	useEffect(() => {
		setIsAdding(0)
	}, [])

	useEffect(() => {
		if (!gearItem) {
			if (category.length > 0 || manufacturer.length > 0 || model.length > 0) {
				setIsAdding(1)
			} else {
				setIsAdding(0)
			}
			if (
				category.length > 0 &&
				manufacturer.length >= 2 &&
				model.length >= 2
			) {
				setIsAdding(2)
				const timeout = setTimeout(() => {
					addGearItem({
						variables: {
							category,
							manufacturer,
							model,
						},
					})
				}, 2500) //2.5 seconds for user to tweak
				return () => clearTimeout(timeout)
			}
		} else {
			if (
				gearItem.category !== category ||
				(gearItem.model !== model && model.length >= 2) ||
				(gearItem.manufacturer !== manufacturer && manufacturer.length >= 2)
			) {
				const timeout = setTimeout(() => {
					console.log('updating headers')
					editGearItem({
						variables: {
							id: gearItem.id,
							category,
							manufacturer,
							model,
						},
					})
				}, UPDATE_TIMEOUT)
				return () => clearTimeout(timeout)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category, model, manufacturer])

	if (!gearItem) {
		if (!addLoading && addData) {
			router.push(`/gear/${addData.addGearItem.id}`)
		}
	}

	const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		// Just for admins so window confirm is straight up gucci 💆
		if (
			window.confirm('🚨 Delete this from the global Shootdrop database? 🚨') &&
			window.confirm(
				'Are you sure? - it will be deleted for all users everywhere ☠️'
			)
		) {
			removeGearItem({
				variables: { id: gearItem.id },
				onCompleted: () => router.back(),
			})
		}
	}

	return (
		<>
			{isAdmin && (
				<div className="fixed bottom-6 z-20  right-6 p-5 bg-black/80 backdrop-blur-sm rounded-md">
					<div className="flex items-center gap-2 flex-row">
						<p className="text-lg font-bold text-gray-400">🚨</p>
						<Button
							loading={removeGearItemResult.loading}
							variant="outline"
							center
							onClick={handleRemove}
						>
							<RubbishIcon width={14} height={14} />
						</Button>
					</div>
				</div>
			)}
			<header className="mx-auto flex justify-between gap-1 align-bottom">
				<div className=" flex w-full flex-col items-center">
					<div>
						<button
							className="flex text-xs text-gray-400"
							onClick={(e) => {
								e.preventDefault()
								setModalOpen(true)
							}}
							disabled={!me}
						>
							{category.length > 0
								? andFormatter.format(category)
								: 'Select a category'}
						</button>

						<input
							placeholder="Manufacturer"
							className="flex bg-transparent text-left"
							value={manufacturer}
							onChange={({ target }) => setManufacturer(target.value)}
							disabled={!me}
						/>

						<TextareaAutosize
							name="Model"
							className="resize-none whitespace-pre-wrap bg-transparent text-left text-xl font-bold md:text-3xl"
							placeholder="Model"
							autoComplete="off"
							data-gramm="false"
							data-gramm_editor="false"
							data-enable-grammarly="false"
							value={model}
							onChange={({ target }) => setModel(target.value)}
							disabled={!me}
						/>
					</div>
				</div>
			</header>

			<CategoriesModal
				open={modalOpen}
				setOpen={setModalOpen}
				category={category}
				setCategory={setCategory}
			/>
		</>
	)
}

export default GearHeader
