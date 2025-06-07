import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import { andFormatter } from '../../../lib/text/formatter'
import { GearListWithItems } from '../../../lib/types'

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	header: {
		backgroundColor: '#12161f',
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
	},
	cell: {
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

const List = ({ list }: ListProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'relative',
						width: '100%',
					}}
				>
					<Link src={`https://shootdrop.com/list/${list.id}`}>
						<Text style={styles.listTitle}>{list.category} gear</Text>
					</Link>
					<Text
						style={{
							color: 'white',
							position: 'absolute',
							right: 8,
							width: '30%',
							textAlign: 'right',
							paddingTop: 10,
						}}
					>
						{list.itemCount} items
					</Text>
				</View>

				<Text style={{ color: 'white', paddingTop: 5 }}>{list.comment}</Text>
			</View>
			<View style={styles.sheet}>
				<View
					style={[
						styles.sheetRow,
						{ color: 'white', backgroundColor: '#1a202c' },
					]}
				>
					<Text
						style={[
							styles.cell,
							{
								width: '4%',
								paddingLeft: 0,
								paddingRight: 0,
								textAlign: 'center',
							},
						]}
					>
						#
					</Text>
					<Text style={[styles.cell, { width: '50%' }]}>Item</Text>
					<Text style={[styles.cell, { width: '9%' }]}>QTY</Text>
					<Text style={[styles.cell, { width: '27%' }]}>Comment</Text>
					<Text style={[styles.cell, { width: '30%' }]}>Preferences</Text>
				</View>
				{list.items.map((item, i) => {
					return (
						<View
							key={item.id}
							style={[styles.sheetRow, { backgroundColor: 'white' }]}
						>
							<Text
								style={[
									styles.cell,
									{
										width: '4%',
										paddingLeft: 0,
										paddingRight: 0,
										textAlign: 'center',
									},
								]}
							>
								{i + 1}
							</Text>
							<Text style={[styles.cell, { width: '50%' }]}>
								<Link src={`https://shootdrop.com/gear/${item.gearItem.id}`}>
									<Text style={{ color: 'black' }}>
										{item.gearItem?.manufacturer} {item.gearItem?.model}
									</Text>
								</Link>
							</Text>
							<Text style={[styles.cell, { width: '9%' }]}>
								{item.quantity}
							</Text>
							<Text style={[styles.cell, { width: '27%' }]}>
								{item?.comment}
							</Text>
							<View style={[styles.cell, { width: '30%' }]}>
								{item.prefs?.map((pref) => (
									<Text key={pref.pref.id}>
										{`${pref.pref.name}: ${andFormatter.format(
											pref.opts.map((opt) => opt.name)
										)}`}
									</Text>
								))}
							</View>
						</View>
					)
				})}
			</View>
		</View>
	)
}
export default List
