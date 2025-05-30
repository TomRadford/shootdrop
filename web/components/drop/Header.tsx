import Image from "next/legacy/image"
import TextareaAutosize from 'react-textarea-autosize'
import { useQuery, useMutation } from '@apollo/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ADD_DROP, UPDATE_DROP, ME_DROPS } from '../../lib/apollo/queries'
import { useRouter } from 'next/router'
import UserModal from './UserModal'
import { format } from 'date-fns'
import useIsAddingStore from '../../lib/hooks/store/isAdding'
import { UPDATE_TIMEOUT } from '../../lib/config'
import Link from 'next/link'
import { Drop } from '../../__generated__/graphql'

const DropHeader = ({
	drop,
	userInDrop,
	setDeleteModalOpen,
}: {
	drop: Drop
	userInDrop: boolean
	setDeleteModalOpen: Dispatch<SetStateAction<boolean>>
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
											width="30px"
											height="30px"
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
							<div className="flex gap-2">
								<Link href={`/drops/${drop.id}/pdf`} legacyBehavior>
									<button className=" rounded border border-solid border-slate-600 p-2 transition-colors duration-300 hover:bg-slate-900">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="h-4 w-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
											/>
										</svg>
									</button>
								</Link>
								{userInDrop && (
									<button
										onClick={(e) => {
											e.preventDefault()
											setDeleteModalOpen(true)
										}}
										className=" rounded border border-solid border-slate-600 p-2 transition-colors duration-300 hover:bg-red-900"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="h-4 w-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</button>
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
    );
}

export default DropHeader
