import { Fragment, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'
import { Drop } from '../../__generated__/graphql'
import { useMutation } from '@apollo/client'
import { ME_DROPS, REMOVE_DROP } from '../../lib/apollo/queries'
import { User } from '../../__generated__/graphql'
import { useRouter } from 'next/router'
const DeleteDropModal = ({
	deleteModalOpen,
	setDeleteModalOpen,
	drop,
}: {
	deleteModalOpen: boolean
	setDeleteModalOpen: Dispatch<SetStateAction<boolean>>
	drop: Drop
}) => {
	const router = useRouter()
	const [removeDrop, removeDropResult] = useMutation(REMOVE_DROP, {
		update: (cache, response) => {
			cache.updateQuery({ query: ME_DROPS }, ({ me }: { me: User }) => {
				return {
					me: {
						...me,
						drops: me.drops.filter((userDrop) => userDrop.id !== drop.id),
					},
				}
			})
		},
		onCompleted: () => {
			setDeleteModalOpen(false)
			router.replace('/drops')
		},
	})

	const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		removeDrop({ variables: { drop: drop.id } })
	}

	if (!drop) return null

	return (
		<Transition
			appear
			show={deleteModalOpen}
			as={Fragment}
			afterLeave={() => {}}
		>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => {
					setDeleteModalOpen(false)
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
									<h2>Delete Drop</h2>
									<h4 className="text-sm font-light">
										Are you sure you want to delete{' '}
										<span className="font-bold">{drop.project}</span>?
									</h4>
								</Dialog.Title>
								<div className="mx-4 my-2 flex flex-col items-center">
									{removeDropResult.error && (
										<p className="mb-5 text-red-600">
											{removeDropResult.error.message}
										</p>
									)}
									<button
										onClick={handleRemove}
										className="w-min rounded bg-red-600 py-1 px-2 transition-colors hover:bg-red-800"
									>
										Delete
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default DeleteDropModal
