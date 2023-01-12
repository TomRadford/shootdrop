import { useQuery } from '@apollo/client'
import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import { ALL_GEAR_ITEMS, GET_LIST_ITEMS } from '../../../lib/apollo/queries'
import {
	GearItemResults,
	GearList,
	GearListItem,
	GetListItemsDocument,
} from '../../../__generated__/graphql'
import client from '../../../lib/apollo/client'
import { useEffect, useState } from 'react'
import { GearListWithItems } from '.'

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	header: {
		backgroundColor: '#1e1e1e',
		textAlign: 'center',
		width: '100%',
	},
	listTitle: {
		fontFamily: 'Helvetica-Bold',
		fontSize: 18,
		textTransform: 'lowercase',
		color: 'white',
		textDecoration: 'none',
	},
	sheet: {},
	sheetRow: {
		flexDirection: 'row',
		border: 'solid',
	},
	cell: {
		border: 'solid',
		borderWidth: 1,
		paddingBottom: 0,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 4,
	},
})

type ListProps = {
	list: GearListWithItems
}

GetListItemsDocument

const List = ({ list }: ListProps) => {
	// const [listItemResults, setListItemResults] = useState<GearItemResults>(null)

	// useEffect(() => {
	// 	const fetchListItems = async () => {
	// 		try {
	// 			const result = await client.query({
	// 				query: GET_LIST_ITEMS,
	// 				variables: {
	// 					list: id,
	// 				},
	// 			})
	// 			setListItemResults(result.data)
	// 		} catch (e: unknown) {
	// 			throw new Error(
	// 				`Error occurred fetching ${category} gear list items for PDF:`,
	// 				e
	// 			)
	// 		}
	// 	}
	// 	void fetchListItems()
	// }, [listItemResults])

	// console.log(listItemResults)

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Link src={`https://shootdrop.com/list/${list.id}`}>
					<Text style={styles.listTitle}>{list.category} gear</Text>
				</Link>
				<Text style={{ color: 'white' }}>{list.comment}</Text>
			</View>
			<View style={styles.sheet}>
				<View
					style={[
						styles.sheetRow,
						{ color: 'white', backgroundColor: '#6f6f6f' },
					]}
				>
					<Text style={[styles.cell, { flex: 1 }]}>Item</Text>
					<Text style={styles.cell}>QTY</Text>
					<Text style={styles.cell}>Comment</Text>
					<Text style={styles.cell}>Preferences</Text>
				</View>
			</View>
		</View>
	)
}
export default List
