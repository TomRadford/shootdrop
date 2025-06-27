import { InferSchemaType } from 'mongoose'
import { GearList, GearListItem, GearListSchema } from '../models/gear/list'
import { DropSchema } from '../models/drop'
import { UserSchema } from '../models/user'

export const duplicateLists = async ({
	lists,
	targetDrop,
	currentUser,
}: {
	lists: InferSchemaType<typeof GearListSchema>[]
	currentUser: InferSchemaType<typeof UserSchema>
	targetDrop: InferSchemaType<typeof DropSchema>
}) => {
	const newLists: InferSchemaType<typeof GearListSchema>[] = []
	for (const list of lists) {
		const newList = new GearList({
			title: list.title,
			category: list.category,
			comment: list.comment,
			drop: targetDrop,
		})
		await newList.save()

		newLists.push(newList)

		const existingListItems = await GearListItem.find({
			gearList: list,
		})

		for (const listItem of existingListItems) {
			const newListItem = new GearListItem({
				gearItem: listItem.gearItem,
				quantity: listItem.quantity,
				comment: listItem.comment,
				prefs: listItem.prefs,
				gearList: newList,
				userThatUpdated: currentUser,
			})
			await newListItem.save()
		}
	}
	return newLists
}
