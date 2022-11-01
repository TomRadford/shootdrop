const { UserInputError } = require("apollo-server-core")
const { GearPref } = require("../models/gear/pref")
const { GearPrefOpt } = require("../models/gear/pref")

const createNewPref = async (pref, gearItem) => {
  const allOpts = await optHelper(pref)
  const newPref = new GearPref({
    gearItem,
    name: pref.name,
    allOpts,
  })
  await newPref.save()
}

const optHelper = async (pref) => {
  let allOpts = []
  for await (const opt of pref.allOpts) {
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

const handlePrefs = async (prefs, gearItem) => {
  for await (const pref of prefs) {
    await createNewPref(pref, gearItem)
  }
}

const handleEditPrefs = async (prefs, gearItem) => {
  for await (const pref of prefs) {
    //id used to update/delete prefs
    if (pref.id) {
      const existingPref = await GearPref.findById(pref.id)
      if (!existingPref) {
        throw new UserInputError(`Pref ID ${pref.id} incorrect`)
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

module.exports = { handlePrefs, handleEditPrefs }
