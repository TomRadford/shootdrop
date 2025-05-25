import { GraphQLError } from 'graphql'
import GearItem from '../models/gear/item'
import { GearPref, GearPrefOpt } from '../models/gear/pref'

const createNewPref = async (
	pref: typeof GearPref,
	gearItem: typeof GearItem
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
	gearItem: typeof GearItem
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
		if (pref.id) {
			const existingPref = await GearPref.findById(pref.id)
			if (!existingPref) {
				throw new GraphQLError(`Pref ID ${pref.id} incorrect`, {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}
			if (!pref.name && !pref.allOpts) {
				await GearPref.findByIdAndDelete(pref.id)
			} else {
				existingPref.name = pref.name
				const allOpts = await optHelper(pref)
				existingPref.allOpts = allOpts
				await existingPref.save()
			}
		} else {
			await createNewPref(pref, gearItem)
		}
	}
}
