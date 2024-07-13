import { GearItem, GearList, GearListItem } from '../__generated__/graphql'

//Generic utils
export const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	)
}
//type gaurds
export const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}

export const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date))
}
// export const isGearList = (gearList: any): gearList is GearList => {
// 	return Boolean(gearList.id)
// }
export const isGearItem = (gearItem: any): gearItem is GearItem => {
	return Boolean(gearItem.model && gearItem.manufacturer)
}
export const isGearListItem = (
	gearListItem: any
): gearListItem is GearListItem => {
	return Boolean(isGearItem(gearListItem.gearItem) || gearListItem.gearList)
}
