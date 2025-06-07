import { useQuery, useApolloClient } from '@apollo/client'
import { GearList } from '../../__generated__/graphql'
import { GET_LIST_ITEMS, ALL_DROPS } from '../apollo/queries'
import { FullDrop, GearListWithItems } from '../types'
import { useMemo, useEffect, useState } from 'react'

/**
 * Only use this hook if you need to fetch items for multiple lists of a category.
 * If you only need to fetch items for a single list, use the useGetListItems hook instead.
 * Since this doesnt use apollo client, it will not be updated when the drop is updated.
 *
 * @todo look into using tanstack query's useQueries for this
 */
const useGetLists = (lists: GearList[] = [], dropLoading: boolean) => {
	const client = useApolloClient()
	const [results, setResults] = useState<
		{
			list: GearList
			items: any[]
			itemCount: number
			loading: boolean
		}[]
	>([])

	useEffect(() => {
		if (dropLoading) return
		let complete = false
		if (!lists.length) {
			setResults([])
			return
		}
		setResults(
			lists.map((list) => ({
				list,
				items: [],
				itemCount: 0,
				loading: true,
			}))
		)
		Promise.all(
			lists.map((list) =>
				client
					.query({
						query: GET_LIST_ITEMS,
						variables: { list: list.id, limit: 1000 },
					})
					.then((res) => ({
						list,
						items: res.data?.getListItems?.gearListItems || [],
						itemCount: res.data?.getListItems?.totalDocs || 0,
						loading: false,
					}))
					.catch(() => ({
						list,
						items: [],
						itemCount: 0,
						loading: false,
					}))
			)
		).then((data) => {
			if (!complete) setResults(data)
		})
		return () => {
			complete = true
		}
	}, [lists, client, dropLoading])

	return results
}

const EMPTY_ARRAY: GearList[] = []

/**
 * WARNING:
 * Only use for pdf generation.
 * This hook is not updated when the drop is updated.
 * Its use is only to fetch all items items for lists that are in the drop
 * If you need to fetch items for a single list, use the useGetListItems hook instead.
 *
 */
export const useGetFullDrop = (
	dropId: string
): { drop?: FullDrop; loading: boolean } => {
	const dropResult = useQuery(ALL_DROPS, {
		variables: {
			drop: dropId,
		},
		fetchPolicy: 'cache-first',
	})

	const allLists: GearList[] = dropResult.data?.allDrops?.[0]?.lists || []

	const listsByCategory = useMemo(() => {
		const map: Record<string, GearList[]> = {}
		allLists.forEach((list) => {
			if (!map[list.category]) map[list.category] = []
			map[list.category].push(list)
		})
		return map
	}, [allLists])

	const cameraLists = useGetLists(
		listsByCategory['CAMERA'] || EMPTY_ARRAY,
		dropResult.loading
	)
	const lightingLists = useGetLists(
		listsByCategory['LIGHTING'] || EMPTY_ARRAY,
		dropResult.loading
	)
	const gripsLists = useGetLists(
		listsByCategory['GRIPS'] || EMPTY_ARRAY,
		dropResult.loading
	)
	const soundLists = useGetLists(
		listsByCategory['SOUND'] || EMPTY_ARRAY,
		dropResult.loading
	)

	const loading =
		dropResult.loading ||
		cameraLists.some((l) => l.loading) ||
		lightingLists.some((l) => l.loading) ||
		gripsLists.some((l) => l.loading) ||
		soundLists.some((l) => l.loading)

	const listsWithItems: GearListWithItems[] = [
		...cameraLists,
		...lightingLists,
		...gripsLists,
		...soundLists,
	].map(({ list, items, itemCount }) => ({ ...list, items, itemCount }))

	return {
		drop:
			dropResult.data && !loading
				? {
						...dropResult.data.allDrops[0],
						lists: listsWithItems,
				  }
				: undefined,
		loading,
	}
}
