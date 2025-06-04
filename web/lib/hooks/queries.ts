import { QueryResult, useQuery } from '@apollo/client'
import { GearList, Drop } from '../../__generated__/graphql'
import { GET_LIST_ITEMS, ALL_DROPS } from '../apollo/queries'
import { FullDrop, GearListWithItems } from '../types'
// Common queries

export const useGetList = (
	// ToDo use generic
	dropResult: QueryResult<any>,
	category: string
): QueryResult<
	any,
	{
		list: string
		limit: number
	}
> =>
	useQuery(GET_LIST_ITEMS, {
		variables: {
			list: dropResult.data?.allDrops[0]?.lists.find(
				(list: GearList) => list.category === category
			)?.id,
			limit: 1000,
		},
		skip:
			dropResult.loading ||
			!dropResult.data?.allDrops[0]?.lists.find(
				(list: GearList) => list.category === category
			),
	})

export const useGetFullDrop = (
	dropId: string
): { drop: FullDrop; loading: boolean } => {
	const dropResult = useQuery(ALL_DROPS, {
		variables: {
			drop: dropId,
		},
		fetchPolicy: 'cache-first',
	})

	const cameraList = useGetList(dropResult, 'CAMERA')

	const lightingList = useGetList(dropResult, 'LIGHTING')

	const gripsList = useGetList(dropResult, 'GRIPS')

	const soundList = useGetList(dropResult, 'SOUND')

	const getListInfo = (category: string): GearList =>
		dropResult.data.allDrops[0].lists.find(
			(list: GearList) => list.category === category
		)

	const getLists = (drop: Drop): GearListWithItems[] => {
		return drop.lists.map((list) => {
			switch (list.category as 'CAMERA' | 'LIGHTING' | 'GRIPS' | 'SOUND') {
				case 'CAMERA':
					return {
						...getListInfo('CAMERA'),
						items: cameraList.data.getListItems.gearListItems,
						itemCount: cameraList.data.getListItems.totalDocs,
					}
				case 'LIGHTING':
					return {
						...getListInfo('LIGHTING'),
						items: lightingList.data.getListItems.gearListItems,
						itemCount: lightingList.data.getListItems.totalDocs,
					}
				case 'GRIPS':
					return {
						...getListInfo('GRIPS'),
						items: gripsList.data.getListItems.gearListItems,
						itemCount: gripsList.data.getListItems.totalDocs,
					}
				case 'SOUND':
					return {
						...getListInfo('SOUND'),
						items: soundList.data.getListItems.gearListItems,
						itemCount: soundList.data.getListItems.totalDocs,
					}
			}
		})
	}
	return {
		drop:
			dropResult.data &&
			!cameraList.loading &&
			!lightingList.loading &&
			!gripsList.loading &&
			!soundList.loading
				? {
						...dropResult.data.allDrops[0],
						lists: getLists(dropResult.data.allDrops[0]),
				  }
				: undefined,
		loading:
			dropResult.loading ||
			cameraList.loading ||
			lightingList.loading ||
			gripsList.loading ||
			soundList.loading,
	}
}
