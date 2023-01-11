import { PDFViewer } from '@react-pdf/renderer'
import NoSsrWrapper from '../../../components/NoSsr'
import Layout from '../../../components/layout'
import DropPdf from '../../../components/drop/Pdf'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Loading from '../../../components/Loading'
import { ALL_DROPS } from '../../../lib/apollo/queries'

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
		onError: () => alert('not found'),
	})

	let dropForPdf = {}

	return (
		<Layout>
			<div className="flex h-screen w-full">
				{dropResult.loading ? (
					<Loading title={``} />
				) : (
					<>
						{dropForPdf ? (
							<NoSsrWrapper>
								<PDFViewer className="h-full w-full pt-12 md:pt-0">
									<DropPdf dropForPdf={dropForPdf} />
								</PDFViewer>
							</NoSsrWrapper>
						) : (
							<>no</>
						)}
					</>
				)}
			</div>
		</Layout>
	)
}

export default DropPdfPage
