import {
	useQueryParams,
	StringParam,
	ArrayParam,
	withDefault,
} from 'use-query-params'
export const useGearQueryParams = () =>
	useQueryParams({
		manufacturer: withDefault(StringParam, ''),
		model: withDefault(StringParam, ''),
		category: StringParam,
		tags: ArrayParam,
	})
