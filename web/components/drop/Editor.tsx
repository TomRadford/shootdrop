import DropHeader from './Header'
import DropDates from './Dates'
import DropInfo from './Info'
import DropListInfo from './List'
import useGetMe from '../../lib/hooks/getMe'
import useUserInDrop from '../../lib/hooks/userInDrop'
import React, { useState } from 'react'
import DeleteModal from './DeleteModal'
import { Drop, GearList } from '../../__generated__/graphql'
const DropEditor = ({
	children,
	drop,
}: {
	children: React.ReactNode
	drop: Drop
}) => {
	const userInDrop = useUserInDrop(drop)
	const me = useGetMe()
	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const [listToDelete, setListToDelete] = useState<GearList>(undefined)
	return (
		<div className="flex h-full min-h-screen">
			<div className="mb-10 w-full pt-16 text-center md:mx-3 md:pt-6">
				<DeleteModal
					deleteModalOpen={deleteModalOpen}
					setDeleteModalOpen={setDeleteModalOpen}
					drop={drop}
					list={listToDelete}
					setListToDelete={setListToDelete}
				/>
				{/* HERE: WORK OUT HOW TO HANDLE MODAL SET FOR EITHER DROP OR LIST */}
				<form>
					<DropHeader
						drop={drop}
						userInDrop={userInDrop}
						setDeleteModalOpen={setDeleteModalOpen}
					/>
					{drop && (
						<div className="flex">
							<div className="m-auto text-center">
								<div className="mx-4 mt-10 max-w-[60rem] md:mx-0">
									<section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
										<DropDates drop={drop} userInDrop={userInDrop} />
										<DropInfo drop={drop} userInDrop={userInDrop} />
									</section>

									<h2 className="py-5 text-xl font-semibold">
										{drop.lists.length > 0
											? `Lists`
											: userInDrop && me && `Add list`}
									</h2>

									<section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
										<DropListInfo
											drop={drop}
											listEntry={
												drop.lists.filter(
													(list) => list.category === 'CAMERA'
												)[0]
											}
											setDeleteModalOpen={setDeleteModalOpen}
											setListToDelete={setListToDelete}
											category="CAMERA"
										/>
										<DropListInfo
											drop={drop}
											listEntry={
												drop.lists.filter(
													(list) => list.category === 'SOUND'
												)[0]
											}
											setDeleteModalOpen={setDeleteModalOpen}
											setListToDelete={setListToDelete}
											category="SOUND"
										/>
										<DropListInfo
											drop={drop}
											listEntry={
												drop.lists.filter(
													(list) => list.category === 'LIGHTING'
												)[0]
											}
											setDeleteModalOpen={setDeleteModalOpen}
											setListToDelete={setListToDelete}
											category="LIGHTING"
										/>
										<DropListInfo
											drop={drop}
											listEntry={
												drop.lists.filter(
													(list) => list.category === 'GRIPS'
												)[0]
											}
											setDeleteModalOpen={setDeleteModalOpen}
											setListToDelete={setListToDelete}
											category="GRIPS"
										/>
									</section>
								</div>
							</div>
						</div>
					)}
					{children}
				</form>
			</div>
		</div>
	)
}
export default DropEditor
