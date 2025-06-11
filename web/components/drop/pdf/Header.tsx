import { View, Text, StyleSheet, Link } from '@react-pdf/renderer'
import { format } from 'date-fns'

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
		alignItems: 'center',
		marginBottom: 10,
	},
	dropTitle: {
		color: 'black',
		fontSize: 10,
		textAlign: 'center',
		fontWeight: 300,
		fontFamily: 'Helvetica-Bold',
		flexWrap: 'wrap',
		wordBreak: 'break-word',
		maxWidth: 130,
	},
	list: {
		color: 'white',
		backgroundColor: '#12161f',
		fontSize: 14,
		fontWeight: 600,
		fontFamily: 'Helvetica-Bold',
		paddingLeft: 5,
		paddingTop: 3,
		marginBottom: 8,
		paddingRight: 6,
	},
	details: {
		flexDirection: 'row',
		padding: 0,
		justifyContent: 'space-between',
	},
	detailItem: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		maxWidth: 150,
	},
})

// Last edited {format(new Date(drop.updatedAt), 'HH:mm d/M/yy')}

const Header = ({
	id,
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
	id: string
	drop: string
	client: string
	gearCheckDate?: Date
	startDate?: Date
	endDate?: Date
	wrapDate?: Date
	updatedAt: Date
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
						{director ? (
							<View style={styles.detailItem}>
								<Text>Director: {director}</Text>
							</View>
						) : undefined}
						{dop ? (
							<View style={styles.detailItem}>
								<Text>DOP: {dop}</Text>
							</View>
						) : undefined}
						{soundie ? (
							<View style={styles.detailItem}>
								<Text>Sound: {soundie}</Text>
							</View>
						) : undefined}
					</View>
				</View>
				<View style={{ alignItems: 'center' }}>
					<Link src={`https://shootdrop.com/drops/${id}`}>
						<Text style={styles.dropTitle}>{drop}</Text>
					</Link>
					<View
						style={{
							flexDirection: 'column',
							fontSize: 7,
							alignItems: 'center',
							fontWeight: 100,
						}}
					>
						<Text>
							Last updated at: {format(new Date(updatedAt), 'HH:mm')}{' '}
							{format(new Date(updatedAt), 'dd MMM yyyy')}
						</Text>
					</View>
				</View>
				<View style={{ alignItems: 'center' }}>
					<Text
						style={{ ...styles.dropTitle, fontSize: 12, alignSelf: 'flex-end' }}
					>
						{client}
					</Text>
					<View
						style={{
							flexDirection: 'column',
							alignItems: 'flex-end',
						}}
					>
						{gearCheckDate && (
							<View style={styles.detailItem}>
								<Text
									style={{
										fontSize: 8,
										maxWidth: 50,
										lineHeight: 1,
										paddingBottom: 4,
									}}
								>
									Gear Check: {format(gearCheckDate, 'dd MMM yyyy')}
								</Text>
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
