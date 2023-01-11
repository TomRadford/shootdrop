import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
// SVC, G & ClipPath to be imported from patches

// PDF Renderer component, requires prefetched dropForPdf
// https://kags.me.ke/post/generate-dynamic-pdf-incoice-using-react-pdf/
const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
})

const DropPdf = ({ dropForPdf }) => {
	console.log(dropForPdf)
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.section}>
					<Text>Section #1</Text>
				</View>
				<View style={styles.section}>
					<p className="bg-blue h-10 w-10"></p>
				</View>
			</Page>
		</Document>
	)
}

export default DropPdf
