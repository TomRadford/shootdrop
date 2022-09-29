const { GearPref } = require('../models/gear/pref')
const { GearPrefOpt } = require('../models/gear/pref')

const handlePrefs = async (prefs, gearItem) => {
	for await (const pref of prefs) {
		let allOpts = []
		for await (const opt of pref.allOpts) {
			const existingOpt = await GearPrefOpt.find({
				name: opt,
			})
			if (!existingOpt) {
				const newOpt = new GearPrefOpt({
					name: opt,
				})
				allOpts = [...allOpts, newOpt]
				await newOpt.save()
			} else {
				allOpts = [...allOpts, existingOpt]
			}
		}
		const existingPref = await GearPref.findOne({
			gearItem,
		})
		if (!existingPref) {
			const newPref = new GearPref({
				gearItem,
				name: pref.name,
				allOpts,
			})
			await newPref.save()
		} else {
			existingPref.allOpts = allOpts
			await existingPref.save()
		}
	}
}

module.exports = handlePrefs
