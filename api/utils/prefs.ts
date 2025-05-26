import { GraphQLError } from 'graphql'
import GearItem from '../models/gear/item'
import { GearPref, GearPrefOpt } from '../models/gear/pref'
import { Document } from 'mongoose'

const createNewPref = async (
	pref: typeof GearPref,
	gearItem: Document<unknown, any, typeof GearItem>
) => {
	const allOpts = await optHelper(pref)
	const newPref = new GearPref({
		gearItem,
		name: pref.name,
		allOpts,
	})
	await newPref.save()
}

const optHelper = async (pref: typeof GearPref) => {
	let allOpts: any[] = []
	for await (const opt of (pref as any).allOpts) {
		//Note: redundant and not used in frontend
		//ToDo: remove/repurpose/keep for directly
		// interacting with api

		//This was used to prevent duplicate gearPrefOpts
		//ToDo: remove
		// const existingOpt = await GearPrefOpt.findOne({
		//   name: opt,
		// })
		// if (existingOpt) {
		//   allOpts = [...allOpts, existingOpt]
		// } else {
		const newOpt = new GearPrefOpt({
			name: opt,
		})
		allOpts = [...allOpts, newOpt]
		await newOpt.save()
		// }
	}
	return allOpts
}

export const handlePrefs = async (
	prefs: typeof GearPref[],
	gearItem: Document<unknown, any, typeof GearItem>
) => {
	for await (const pref of prefs) {
		await createNewPref(pref, gearItem)
	}
}

export const handleEditPrefs = async (
	prefs: typeof GearPref[],
	gearItem: typeof GearItem
) => {
	for await (const pref of prefs) {
		//id used to update/delete prefs
		//@ts-expect-error TODO: Mongoose upgrade
		if (pref.id) {
			//@ts-expect-error TODO: Mongoose upgrade
			const existingPref = await GearPref.findById(pref.id)
			if (!existingPref) {
				//@ts-expect-error TODO: Mongoose upgrade
				throw new GraphQLError(`Pref ID ${pref.id} incorrect`, {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}
			//@ts-expect-error TODO: Mongoose upgrade
			if (!pref.name && !pref.allOpts) {
				//@ts-expect-error TODO: Mongoose upgrade
				await GearPref.findByIdAndDelete(pref.id)
			} else {
				existingPref.name = pref.name
				const allOpts = await optHelper(pref)
				existingPref.allOpts = allOpts
				await existingPref.save()
			}
		} else {
			//@ts-expect-error TODO: Mongoose upgrade
			await createNewPref(pref, gearItem)
		}
	}
}
