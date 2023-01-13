import { PDFViewer } from '@react-pdf/renderer'
import NoSsrWrapper from '../../../components/NoSsr'
import Layout from '../../../components/layout'
import DropPdf, {
	DropForPdf,
	GearListWithItems,
} from '../../../components/drop/pdf'
import { useRouter } from 'next/router'
import { QueryResult, useQuery } from '@apollo/client'
import { ALL_DROPS, GET_LIST_ITEMS } from '../../../lib/apollo/queries'
import LoadingSpinner from '../../../components/elements/LoadingSpinner'
import {
	Drop,
	GearList,
	GetListItemsQuery,
	ListItemResults,
} from '../../../__generated__/graphql'
import { assertNever } from '../../../lib/utils'

const useGetList = (
	dropResult: QueryResult<
		any,
		{
			drop: string | string[]
		}
	>,
	category: string
): QueryResult<
	any,
	{
		list: string
		limit: number
	}
> =>
	useQuery(GET_LIST_ITEMS, {
		variables: {
			list: dropResult.data?.allDrops[0]?.lists.find(
				(list: GearList) => list.category === category
			)?.id,
			limit: 1000,
		},
		skip:
			dropResult.loading ||
			!dropResult.data?.allDrops[0]?.lists.find(
				(list: GearList) => list.category === category
			),
	})

const DropPdfPage = () => {
	// PDF Viewer Page -- TBC if for dev only?
	// Use https://react-pdf.org/advanced#on-the-fly-rendering for download button
	const router = useRouter()
	const dropId = router.query.id
	const dropResult = useQuery(ALL_DROPS, {
		variables: {
			drop: dropId,
		},
		fetchPolicy: 'cache-first',
	})

	const cameraList = useGetList(dropResult, 'CAMERA')

	const lightingList = useGetList(dropResult, 'LIGHTING')

	const gripsList = useGetList(dropResult, 'GRIPS')

	const soundList = useGetList(dropResult, 'SOUND')

	const getListInfo = (category: string): GearList =>
		dropResult.data.allDrops[0].lists.find(
			(list: GearList) => list.category === category
		)

	const getLists = (drop: Drop): GearListWithItems[] => {
		return drop.lists.map((list) => {
			switch (list.category as 'CAMERA' | 'LIGHTING' | 'GRIPS' | 'SOUND') {
				case 'CAMERA':
					return {
						...getListInfo('CAMERA'),
						items: cameraList.data.getListItems.gearListItems,
						itemCount: cameraList.data.getListItems.totalDocs,
					}
				case 'LIGHTING':
					return {
						...getListInfo('LIGHTING'),
						items: lightingList.data.getListItems.gearListItems,
						itemCount: lightingList.data.getListItems.totalDocs,
					}
				case 'GRIPS':
					return {
						...getListInfo('GRIPS'),
						items: gripsList.data.getListItems.gearListItems,
						itemCount: gripsList.data.getListItems.totalDocs,
					}
				case 'SOUND':
					return {
						...getListInfo('SOUND'),
						items: soundList.data.getListItems.gearListItems,
						itemCount: soundList.data.getListItems.totalDocs,
					}
			}
		})
	}

	let dropForPdf: DropForPdf =
		dropResult.data &&
		!cameraList.loading &&
		!lightingList.loading &&
		!gripsList.loading &&
		!soundList.loading
			? {
					...dropResult.data.allDrops[0],
					lists: getLists(dropResult.data.allDrops[0]),
			  }
			: undefined

	return (
		<Layout>
			<div className="flex h-screen w-full">
				{dropResult.loading ||
				cameraList.loading ||
				lightingList.loading ||
				gripsList.loading ||
				soundList.loading ? (
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
