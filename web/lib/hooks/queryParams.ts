import {
	useQueryParams,
	StringParam,
	ArrayParam,
	withDefault,
} from 'use-query-params'

export type GearQueryParams = {
	manufacturer?: string
	model?: string
	category?: string
	tags?: string[]
}

export const useGearQueryParams = () =>
	useQueryParams({
		manufacturer: withDefault(StringParam, ''),
		model: withDefault(StringParam, ''),
		category: StringParam,
		tags: ArrayParam,
	})
