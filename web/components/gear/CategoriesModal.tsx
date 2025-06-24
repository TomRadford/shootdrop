import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const CategoriesModal = ({
	open,
	setOpen,
	category,
	setCategory,
}: {
	open: boolean
	setOpen: (open: boolean) => void
	category: string[]
	setCategory: (category: string[]) => void
}) => {
	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
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
									onClick={() => setOpen(false)}
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
	)
}

export default CategoriesModal
