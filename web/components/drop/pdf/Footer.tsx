import { View, Text, Link, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 40,
	},
})

const Footer = () => (
	<>
		<View style={styles.container}>
			<Text>This gear list was created with </Text>
			<Link src="https://shootdrop.com">
				<Text style={{ fontFamily: 'Helvetica-Bold', color: '#12161f' }}>
					ShootDrop
				</Text>
			</Link>
		</View>
	</>
)

export default Footer
