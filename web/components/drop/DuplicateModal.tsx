import { Fragment, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'
import {
	Drop,
	DuplicateDropMutation,
	DuplicateDropMutationVariables,
	GearList,
} from '../../__generated__/graphql'
import { useMutation } from '@apollo/client'
import { DUPLICATE_DROP, ME_DROPS } from '../../lib/apollo/queries'
import { useRouter } from 'next/router'
import { capitalize } from '../../lib/utils'
import Button from '../elements/Button'
import TextInput from '../elements/TextInput'
const DuplicateModal = ({
	duplicateModalOpen,
	setDuplicateModalOpen,
	drop,
	list,
	setListToDelete,
}: {
	duplicateModalOpen: boolean
	setDuplicateModalOpen: Dispatch<SetStateAction<boolean>>
	drop: Drop
	list?: GearList
	setListToDelete: Dispatch<SetStateAction<GearList | undefined>>
}) => {
	const [projectName, setProjectName] = useState('')
	const [clientName, setClientName] = useState('')
	const router = useRouter()
	const [duplicateDrop, duplicateDropResult] = useMutation<
		DuplicateDropMutation,
		DuplicateDropMutationVariables
	>(DUPLICATE_DROP, {
		update: (cache, response) => {
			cache.updateQuery({ query: ME_DROPS }, ({ me }) => {
				return {
					me: { ...me, drops: me.drops.concat(response.data.duplicateDrop) },
				}
			})
		},
		onCompleted: (data) => {
			setDuplicateModalOpen(false)
			router.replace(`/drops/${data.duplicateDrop.id}`)
		},
	})

	const handleDuplicate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (list) {
			// TODO: duplicate list
		} else {
			console.log('duplicating drop')
			duplicateDrop({
				variables: {
					drop: drop.id,
					project: projectName,
					client: clientName,
				},
			})
		}
	}

	if (!drop) return null

	return (
		<Transition
			appear
			show={duplicateModalOpen}
			as={Fragment}
			afterLeave={() => {
				setListToDelete(undefined)
			}}
		>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => {
					setDuplicateModalOpen(false)
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
							<Dialog.Panel
								as="form"
								className="max-w-xs transform overflow-hidden rounded-2xl bg-black px-10 py-5 text-left align-middle text-white shadow-xl transition-all sm:max-w-md"
								onSubmit={handleDuplicate}
							>
								<Dialog.Title
									as="div"
									className="leading-2 text-md text-center font-medium"
								>
									<h2>Duplicate {!list ? `Drop` : `List`}</h2>
									<h4 className="text-sm font-light">
										Would you like to duplicate{' '}
										<span className="font-bold">
											{!list
												? drop.project
												: `${
														list?.title ||
														capitalize(list?.category.toLowerCase())
												  }`}
										</span>
									</h4>
								</Dialog.Title>
								<div className="flex flex-col gap-1 mt-2">
									<TextInput
										placeholder="Project name"
										className="w-full font-bold text-center"
										required
										value={projectName}
										onChange={(e) => setProjectName(e.target.value)}
									/>
									<TextInput
										placeholder="Client name"
										className="w-full font-light text-center"
										required
										value={clientName}
										onChange={(e) => setClientName(e.target.value)}
									/>
								</div>
								<div className="mx-4 my-2 flex flex-col items-center">
									{duplicateDropResult.error && (
										// ToDo: duplicate list error
										<p className="mb-5 text-gray-300">
											{duplicateDropResult.error?.message}
											{/* ToDo: duplicate list error */}
										</p>
									)}

									<Button
										type="submit"
										variant="outline"
										loading={duplicateDropResult.loading}
									>
										Duplicate
									</Button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default DuplicateModal
