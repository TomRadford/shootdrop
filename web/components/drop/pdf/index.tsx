import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Font,
} from '@react-pdf/renderer'
import { type } from 'os'
import {
	Drop,
	GearCategory,
	GearList,
	GearListItem,
} from '../../../__generated__/graphql'
import NoSsr from '../../NoSsr'
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
		paddingLeft: 30,
		paddingRight: 30,
		lineHeight: 1.5,
		flexDirection: 'column',
	},
})

export type GearListWithItems = GearList & {
	items?: Array<GearListItem>
}

export type DropForPdf = Omit<Drop, 'lists'> & {
	lists?: Array<GearListWithItems>
}

type DropPdfProps = {
	dropForPdf: DropForPdf
	// listItems: Array<{
	// 	category: GearCategory
	// 	items: Array<GearListItem>
	// }>
}

const DropPdf = ({ dropForPdf: drop }: DropPdfProps) => {
	// console.log(drop)
	return (
		<Document title={drop.project} author={drop.client}>
			<Page size="A4" style={styles.page}>
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

				{drop.lists.map((list) => (
					<List key={list.id} list={list} />
				))}
			</Page>
		</Document>
	)
}

export default DropPdf
