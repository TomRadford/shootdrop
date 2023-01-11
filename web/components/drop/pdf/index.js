import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Font,
} from '@react-pdf/renderer'
import Header from './Header'
// SVC, G & ClipPath to be imported from patches

// PDF Renderer component, requires prefetched dropForPdf
// https://kags.me.ke/post/generate-dynamic-pdf-incoice-using-react-pdf/

const styles = StyleSheet.create({
	page: {
		fontFamily: 'Helvetica',
		fontSize: 11,
		paddingTop: 10,
		paddingLeft: 30,
		paddingRight: 30,
		lineHeight: 1.5,
		flexDirection: 'column',
	},
})

const DropPdf = ({ dropForPdf: drop }) => {
	console.log(drop)
	return (
		<Document title={drop.project} author={drop.client}>
			<Page size="A4" style={styles.page}>
				<Header
					drop={drop.project}
					client={drop.client}
					updatedAt={drop.updatedAt}
					gearCheckDate={drop.gearCheckDate}
					startDate={drop.startDate}
					endDate={drop.endDate}
					wrapDate={drop.wrapDate}
					director={drop.director}
					dop={drop.dop}
					soundie={drop.soundie}
				/>
			</Page>
		</Document>
	)
}

export default DropPdf
