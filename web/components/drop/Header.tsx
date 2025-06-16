import Image from 'next/legacy/image'
import TextareaAutosize from 'react-textarea-autosize'
import { useQuery, useMutation } from '@apollo/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ADD_DROP, UPDATE_DROP, ME_DROPS } from '../../lib/apollo/queries'
import { useRouter } from 'next/router'
import UserModal from './UserModal'
import { format } from 'date-fns'
import useIsAddingStore from '../../lib/hooks/store/isAdding'
import { UPDATE_TIMEOUT } from '../../lib/config'
import { Drop } from '../../__generated__/graphql'
import Button from '../elements/Button'
import PageIcon from '../elements/icons/PageIcon'
import RubbishIcon from '../elements/icons/RubbishIcon'
import DuplicateIcon from '../elements/icons/DuplicateIcon'

const DropHeader = ({
	drop,
	userInDrop,
	setDeleteModalOpen,
	setDuplicateModalOpen,
}: {
	drop: Drop
	userInDrop: boolean
	setDeleteModalOpen: Dispatch<SetStateAction<boolean>>
	setDuplicateModalOpen: Dispatch<SetStateAction<boolean>>
}) => {
	const [modalOpen, setModalOpen] = useState(false)

	const [dropName, setDropName] = useState(drop ? drop.project : '')
	const [clientName, setClientName] = useState(drop ? drop.client : '')
	const setIsAdding = useIsAddingStore((state) => state.setIsAdding)
	const [addDrop, { data, loading, error }] = useMutation(ADD_DROP, {
		// refetchQueries: [{ query: ME_DROPS }],
		update: (cache, response) => {
			cache.updateQuery({ query: ME_DROPS }, ({ me }) => {
				return {
					me: { ...me, drops: me.drops.concat(response.data.addDrop) },
				}
			})
		},
	})
	const [updateDrop, updateDropResult] = useMutation(UPDATE_DROP)
	//ME_DROPS for cache update used here
	const { data: meData } = useQuery(ME_DROPS)
	const me = meData ? meData.me : null

	const router = useRouter()

	useEffect(() => {
		setDropName(drop ? drop.project : '')
		setClientName(drop ? drop.client : '')
	}, [drop])

	useEffect(() => {
		setIsAdding(0)
	}, [])

	useEffect(() => {
		if (!drop) {
			if (dropName.length > 0 || clientName.length > 0) {
				setIsAdding(1)
			} else {
				setIsAdding(0)
			}
			if (dropName.length > 3 && clientName.length > 0) {
				setIsAdding(2)
				const timeout = setTimeout(() => {
					addDrop({
						variables: {
							project: dropName,
							client: clientName,
						},
					})
				}, UPDATE_TIMEOUT)
				return () => clearTimeout(timeout)
			}
		} else {
			if (drop.project !== dropName || drop.client !== clientName) {
				const timeout = setTimeout(() => {
					console.log('Updating headers')
					updateDrop({
						variables: {
							id: drop.id,
							project: dropName,
							client: clientName,
						},
					})
				}, UPDATE_TIMEOUT)
				return () => clearTimeout(timeout)
			}
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dropName, clientName, drop])

	if (!drop) {
		if (!loading && data) {
			router.push(`/drops/${data.addDrop.id}`)
		}
	}

	return (
		<>
			<header className="mx-auto flex justify-between gap-1 align-bottom md:w-full">
				<div className="flex min-w-max items-center pl-3 md:pl-0">
					<button
						className={!me ? 'cursor-default' : ''}
						onClick={(e) => {
							e.preventDefault()
							setModalOpen(true)
						}}
					>
						<div className="mb-5 flex -space-x-4 md:-space-x-2">
							{drop &&
								drop.users.map((user) => (
									<div key={user.id}>
										<Image
											src={
												user.profilePicture
													? user.profilePicture
													: `/img/default_user.png`
											}
											key={user.id}
											width="30"
											height="30"
											className={`rounded-full`}
											objectFit="cover"
											alt={user.fullName}
										/>
									</div>
								))}
						</div>
					</button>
				</div>

				<div className=" flex flex-col items-end">
					<TextareaAutosize
						name="name"
						className="mx-2 w-2/3 resize-none whitespace-pre-wrap bg-transparent text-right text-xl font-bold sm:w-full md:w-full md:text-3xl"
						placeholder="Project name"
						autoComplete="off"
						data-gramm="false"
						data-gramm_editor="false"
						data-enable-grammarly="false"
						value={dropName}
						onChange={({ target }) => setDropName(target.value)}
						disabled={drop ? !me || !userInDrop : !me}
					/>
					<div className="mr-3 flex flex-col justify-end text-right text-gray-300 md:w-full">
						<div className="flex">
							<p className="flex-1"></p>
							<input
								placeholder="Client name"
								className="w-2/3 bg-transparent text-right"
								value={clientName}
								onChange={({ target }) => setClientName(target.value)}
								disabled={drop ? !me || !userInDrop : !me}
							/>
						</div>
					</div>
				</div>
				<div className="mr-1 flex flex-col items-center justify-center gap-3 text-xs text-gray-300">
					{drop && (
						<>
							<p className=" top-0 text-gray-600">
								Last edited {format(new Date(drop.updatedAt), 'HH:mm d/M/yy')}
							</p>
							<div className="flex gap-2 sm:flex-row flex-col">
								<Button
									center
									href={`/drops/${drop.id}/pdf`}
									variant="outline"
									label="Download PDF"
								>
									<PageIcon width={16} height={16} />
								</Button>
								{userInDrop && (
									<>
										<Button
											onClick={(e) => {
												e.preventDefault()
												setDuplicateModalOpen(true)
											}}
											center
											variant="outline"
											label="Duplicate drop"
										>
											<DuplicateIcon width={16} height={16} />
										</Button>
										<Button
											onClick={(e) => {
												e.preventDefault()
												setDeleteModalOpen(true)
											}}
											center
											variant="outline"
											className="transition-colors duration-300 hover:bg-red-900"
											label="Delete drop"
										>
											<RubbishIcon width={16} height={16} />
										</Button>
									</>
								)}
							</div>
						</>
					)}
				</div>
			</header>
			<UserModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				drop={drop}
				userInDrop={userInDrop}
			/>
		</>
	)
}

export default DropHeader
