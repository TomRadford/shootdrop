import useGetMe from '../../lib/hooks/getMe'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_GEAR_ITEM, EDIT_GEAR_ITEM } from '../../lib/apollo/queries'
import { andFormatter } from '../../lib/text/formatter'
import useIsAddingStore from '../../lib/hooks/store/isAdding'
import { UPDATE_TIMEOUT } from '../../lib/config'

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
	const me = useGetMe()
	const router = useRouter()
	const setIsAdding = useIsAddingStore((state) => state.setIsAdding)

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

	return (
		<>
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
			<Transition appear show={modalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setModalOpen(false)}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-50" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto md:ml-72">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black px-10 py-5 text-left align-middle text-white shadow-xl transition-all">
									<button
										type="button"
										onClick={() => setModalOpen(false)}
										className="absolute right-4 top-4 text-gray-400 hover:text-white focus:outline-none"
										aria-label="Close"
									>
										X
									</button>
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-white"
									>
										Select categories
									</Dialog.Title>
									<div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
										{['CAMERA', 'LIGHTING', 'GRIPS', 'SOUND'].map((cat) => (
											<div className="flex flex-col items-center" key={cat}>
												<button
													key={cat}
													onClick={() => {
														if (category.includes(cat)) {
															setCategory(
																category.filter((item) => item !== cat && item)
															)
														} else {
															setCategory([...category, cat])
														}
													}}
													className={`font-sm w-fit rounded-lg bg-slate-900 py-1 px-2 ${
														!category.includes(cat) && 'opacity-60'
													}`}
												>{`${cat.charAt(0)}${cat
													.slice(1)
													.toLowerCase()}`}</button>
											</div>
										))}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default GearHeader
