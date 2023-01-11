import { PDFViewer } from '@react-pdf/renderer'
import NoSsrWrapper from '../../../components/NoSsr'
import Layout from '../../../components/layout'
import DropPdf from '../../../components/drop/pdf'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Loading from '../../../components/Loading'
import { ALL_DROPS } from '../../../lib/apollo/queries'
import LoadingSpinner from '../../../components/elements/LoadingSpinner'

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

	let dropForPdf = dropResult.data ? dropResult.data.allDrops[0] : undefined

	return (
		<Layout>
			<div className="flex h-screen w-full">
				{dropResult.loading ? (
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
