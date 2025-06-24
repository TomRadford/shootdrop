import React, { useState, useEffect } from 'react'
import Button from '../elements/Button'
import { useMutation } from '@apollo/client'
import { ALL_TAGS, EDIT_TAG, REMOVE_TAG } from '../../lib/apollo/queries'
import { UPDATE_TIMEOUT } from '../../lib/config'
import { cn } from '../../lib/utils'
import { Tag } from '../../__generated__/graphql'
import CategoriesModal from '../gear/CategoriesModal'

const TagRow = ({ tag }: { tag: Tag }) => {
	const [editTag, { error: editError }] = useMutation(EDIT_TAG, {
		refetchQueries: [ALL_TAGS],
	})
	const [removeTag, { error: removeError, loading: removing }] = useMutation(
		REMOVE_TAG,
		{
			refetchQueries: [ALL_TAGS],
		}
	)
	const [categoriesModalOpen, setCategoriesModalOpen] = useState(false)
	const [name, setName] = useState(tag.name)
	const [category, setCategory] = useState(tag.category)
	const [saving, setSaving] = useState(false)
	const [saved, setSaved] = useState(false)

	// Sync if parent changes from server update
	useEffect(() => {
		setName(tag.name)
		setCategory(tag.category)
	}, [tag.id])

	useEffect(() => {
		if (name === tag.name) return

		const timeout = setTimeout(async () => {
			try {
				setSaved(false)
				setSaving(true)
				await editTag({ variables: { id: tag.id, name } })
			} finally {
				setSaving(false)
				setSaved(true)
			}
		}, UPDATE_TIMEOUT)

		return () => clearTimeout(timeout)
		// eslint-disable-next-line
	}, [name])

	useEffect(() => {
		if (category?.join(',') === tag.category?.join(',')) return
		const timeout = setTimeout(async () => {
			await editTag({ variables: { id: tag.id, category } })
		}, UPDATE_TIMEOUT)
		return () => clearTimeout(timeout)
	}, [category])

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (!confirm('Are you sure you want to delete this tag?')) return
		if (!confirm(`🚨 Do you REALLY want to delete ${tag.name}?`)) return

		await removeTag({ variables: { id: tag.id } })
	}

	if (removeError) {
		return <div className="text-red-500">{removeError.message}</div>
	}

	return (
		<>
			{/* Note this causes `<div> cannot be a child of <tbody>` error
			 * But I dont care because I wanna move from headless ui to radix
			 * ToDo: do that and remove this comment hehe
			 */}
			<CategoriesModal
				open={categoriesModalOpen}
				setOpen={setCategoriesModalOpen}
				category={category}
				setCategory={setCategory}
			/>
			<tr className="border-b hover:bg-gray-500">
				<td className="py-2 pr-4 font-mono">
					<input
						type="text"
						className={cn(
							'bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-400 w-full',
							saving && 'animate-pulse',
							saved && 'text-green-500',
							editError && 'text-red-500'
						)}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</td>
				<td className="py-2">
					<Button variant="blue" onClick={() => setCategoriesModalOpen(true)}>
						{tag.category && tag.category.length > 0 ? (
							tag.category.join(', ')
						) : (
							<span className="text-gray-200">ALL</span>
						)}
					</Button>
				</td>
				<td className="py-2 text-center">
					<Button variant="red" onClick={handleDelete} disabled={removing}>
						Delete
					</Button>
				</td>
			</tr>
		</>
	)
}

export default TagRow
