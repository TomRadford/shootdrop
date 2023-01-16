import { Fragment, useEffect, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import ItemQuantity from './ItemQuantity'
import ItemPreference from './ItemPreference'
import ItemComment from './ItemComment'
import useUserInDrop from '../../lib/hooks/userInDrop'
import useListItemStore from '../../lib/hooks/store/listItem'

const ItemModal = ({ list }) => {
	const listItem = useListItemStore((store) => store.listItem)
	const setListItem = useListItemStore((store) => store.setListItem)
	const userInDrop = useUserInDrop(list ? list.drop : undefined)
	const [itemModalOpen, setItemModalOpen] = useState(false)
	useEffect(() => {
		if (listItem) {
			setItemModalOpen(true)
		}
	}, [listItem])
	return (
		<Transition
			appear
			show={itemModalOpen}
			as={Fragment}
			afterLeave={() => setListItem(undefined)}
		>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => {
					setItemModalOpen(false)
				}}
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
							<Dialog.Panel className="max-w-xs transform overflow-hidden rounded-2xl bg-black px-10 py-5 text-left align-middle text-white shadow-xl transition-all sm:max-w-md">
								<Dialog.Title
									as="div"
									className="leading-2 text-md text-center font-medium"
								>
									<h2>Added!</h2>
									<h4>Any preferences?</h4>
								</Dialog.Title>
								<div className="mx-4 my-2 flex flex-col ">
									{listItem && (
										<>
											<ItemQuantity
												listId={list.id}
												gearListItem={listItem}
												userInDrop={userInDrop}
											/>
											<ItemComment
												listId={list.id}
												gearListItem={listItem}
												userInDrop={userInDrop}
											/>
											<ItemPreference
												listId={list.id}
												gearListItem={listItem}
												userInDrop={userInDrop}
											/>
											<button
												className="mx-auto mt-4 w-max rounded-lg bg-gray-900 px-2 py-1"
												onClick={() => setItemModalOpen(false)}
											>
												Close
											</button>
										</>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default ItemModal
