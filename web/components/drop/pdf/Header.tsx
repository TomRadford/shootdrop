import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { format } from 'date-fns'

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
		alignItems: 'center',
	},
	dropTitle: {
		color: 'black',
		fontSize: 14,
		textAlign: 'center',
		fontWeight: 600,
		fontFamily: 'Helvetica-Bold',
		flexWrap: 'wrap',
		maxWidth: '130px',
	},
	list: {
		color: 'white',
		backgroundColor: '#1f1f1f',
		fontSize: 14,
		fontWeight: 600,
		fontFamily: 'Helvetica-Bold',
		paddingLeft: 5,
		paddingTop: 3,
		marginBottom: 8,
	},
	details: {
		flexDirection: 'row',
		padding: 0,
		justifyContent: 'space-between',
	},
	detailItem: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		maxWidth: '150px',
	},
})

// Last edited {format(new Date(drop.updatedAt), 'HH:mm d/M/yy')}

const Header = ({
	drop,
	client,
	gearCheckDate,
	startDate,
	endDate,
	wrapDate,
	updatedAt,
	director,
	dop,
	soundie,
}: {
	drop: string
	client: string
	gearCheckDate: number
	startDate: number
	endDate: number
	wrapDate: string
	updatedAt: number
	director: string
	dop: string
	soundie: string
}) => {
	return (
		<>
			<View style={styles.headerContainer}>
				<View>
					<View style={styles.list}>
						<Text>Gear List</Text>
					</View>
					<View
						style={{ flexDirection: 'column', justifyContent: 'flex-start' }}
					>
						{director && (
							<View style={styles.detailItem}>
								<Text>Director: {director}</Text>
							</View>
						)}
						{dop && (
							<View style={styles.detailItem}>
								<Text>DOP: {dop}</Text>
							</View>
						)}
						{soundie && (
							<View style={styles.detailItem}>
								<Text>Sound: {soundie}</Text>
							</View>
						)}
					</View>
				</View>
				<View>
					<Text style={styles.dropTitle}>{drop}</Text>
					<View style={{ flexDirection: 'column', alignItems: 'center' }}>
						<Text>Last updated at:</Text>
						<Text>{format(new Date(updatedAt), 'HH:mm')}</Text>
						<Text>{format(new Date(updatedAt), 'dd MMM yyyy')}</Text>
					</View>
				</View>
				<View>
					<Text style={styles.dropTitle}>{client}</Text>
					<View
						style={{
							flexDirection: 'column',
							alignItems: 'flex-end',
						}}
					>
						{gearCheckDate && (
							<View style={styles.detailItem}>
								<Text>Gear Check: {format(gearCheckDate, 'dd MMM yyyy')}</Text>
							</View>
						)}
						{startDate && (
							<View style={styles.detailItem}>
								<Text>Start date: {format(startDate, 'dd MMM yyyy')}</Text>
							</View>
						)}
						{endDate && (
							<View style={styles.detailItem}>
								<Text>End date: {format(endDate, 'dd MMM yyyy')}</Text>
							</View>
						)}
						{wrapDate && (
							<View style={styles.detailItem}>
								<Text>Gear wrap: {format(gearCheckDate, 'dd MMM yyyy')}</Text>
							</View>
						)}
					</View>
				</View>
			</View>
		</>
	)
}

export default Header
