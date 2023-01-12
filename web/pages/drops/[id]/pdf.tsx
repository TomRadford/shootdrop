import { PDFViewer } from '@react-pdf/renderer'
import NoSsrWrapper from '../../../components/NoSsr'
import Layout from '../../../components/layout'
import DropPdf, {
	DropForPdf,
	GearListWithItems,
} from '../../../components/drop/pdf'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { ALL_DROPS, GET_LIST_ITEMS } from '../../../lib/apollo/queries'
import LoadingSpinner from '../../../components/elements/LoadingSpinner'
import client from '../../../lib/apollo/client'
import {
	AllDropsQuery,
	GearListItem,
	GetListItemsQuery,
	DropDetailsFragment,
	GearList,
} from '../../../__generated__/graphql'
import { useEffect, useState } from 'react'

// Using apollo client over useQuery so we dont have to make 4 verbose queries
// not elegant but prevents useQuery error on some lists
const fetchListItems = async (
	id: string,
	category: string
): Promise<Array<GearListItem>> => {
	try {
		const result = await client.query<GetListItemsQuery>({
			query: GET_LIST_ITEMS,
			variables: {
				list: id,
			},
		})
		return result.data.getListItems.gearListItems as Array<GearListItem> //ToDo: relook
	} catch (e: unknown) {
		throw new Error(
			`Error occurred fetching ${category} gear list items for PDF:`,
			e
		)
	}
}

const DropPdfPage = () => {
	// PDF Viewer Page -- TBC if for dev only?
	// Use https://react-pdf.org/advanced#on-the-fly-rendering for download button
	const router = useRouter()
	const dropId = router.query.id
	const [listLoading, setListLoading] = useState(true)
	const dropResult = useQuery(ALL_DROPS, {
		variables: {
			drop: dropId,
		},
		fetchPolicy: 'cache-first',
	})

	// const cameraList = useQuery(GET_LIST_ITEMS, {
	// 	variables: {
	// 		list: dropResult.data.allDrops[0],
	// 	},
	// 	skip:
	// 		dropResult.loading ||
	// 		!dropResult.data?.allDrops[0]?.lists.find(
	// 			(list: GearList) => list.category === 'CAMERA'
	// 		),
	// })

	let dropForPdf: DropForPdf

	// listItems queried within list component
	//populate missing

	useEffect(() => {
		if (!dropResult.loading) {
			dropForPdf = dropResult.data.allDrops[0]
			dropForPdf.lists.map(async (list, i) => {
				const listItems = await fetchListItems(list.id, list.category)
				dropForPdf = {
					dop: '',
					director: '',
					id: 'sdf',
					project: 'sdf',
					lists: [],
				}
				if (i + 1 === dropForPdf.lists.length) {
					setListLoading(false)
				}
			})
		}
	}, [dropResult.loading])

	console.log(dropForPdf)

	return (
		<Layout>
			<div className="flex h-screen w-full">
				{dropResult.loading && !listLoading ? (
					<div className="mx-auto flex flex-col justify-center">
						<LoadingSpinner />
					</div>
				) : (
					<>
						{dropForPdf ? (
							<NoSsrWrapper>
								<PDFViewer className="h-full w-full pt-12 md:pt-0">
									<DropPdf dropForPdf={dropForPdf} />
								</PDFViewer>
							</NoSsrWrapper>
						) : (
							<div className="m-auto text-center">
								<h1 className="m-5 text-5xl font-bold">404</h1>
								<p>Unable to find a project to generate a pdf.</p>
							</div>
						)}
					</>
				)}
			</div>
		</Layout>
	)
}

export default DropPdfPage
