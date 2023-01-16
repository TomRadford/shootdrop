import { Page, Document, StyleSheet } from '@react-pdf/renderer'
import { FullDrop } from '../../../lib/types'
import Footer from './Footer'
import Header from './Header'
import List from './List'
// SVC, G & ClipPath to be imported from patches

// PDF Renderer component, requires prefetched dropForPdf
// https://kags.me.ke/post/generate-dynamic-pdf-incoice-using-react-pdf/

const styles = StyleSheet.create({
	page: {
		fontFamily: 'Helvetica',
		fontSize: 11,
		paddingTop: 10,
		paddingBottom: 30,
		paddingLeft: 30,
		paddingRight: 30,
		lineHeight: 1.5,
		flexDirection: 'column',
	},
})

type DropPdfProps = {
	dropForPdf: FullDrop
}

const DropPdf = ({ dropForPdf: drop }: DropPdfProps) => {
	return (
		<Document title={drop.project} author={drop.client}>
			<Page size="A4" style={styles.page}>
				<>
					<Header
						id={drop.id}
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
					{/* Lists in persribed order */}
					{drop.lists.map((list) =>
						list.category === 'CAMERA' ? (
							<List key={list.id} list={list} />
						) : undefined
					)}
					{drop.lists.map((list) =>
						list.category === 'GRIPS' ? (
							<List key={list.id} list={list} />
						) : undefined
					)}
					{drop.lists.map((list) =>
						list.category === 'LIGHTING' ? (
							<List key={list.id} list={list} />
						) : undefined
					)}
					{drop.lists.map((list) =>
						list.category === 'SOUND' ? (
							<List key={list.id} list={list} />
						) : undefined
					)}

					<Footer />
				</>
			</Page>
		</Document>
	)
}

export default DropPdf
