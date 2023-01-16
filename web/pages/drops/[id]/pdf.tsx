import { BlobProvider, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Document, Page } from 'react-pdf'
import NoSsrWrapper from '../../../components/NoSsr'
import Layout from '../../../components/layout'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../../components/elements/LoadingSpinner'
import Head from 'next/head'
import { useGetFullDrop } from '../../../lib/hooks/queries'
import DropPdf from '../../../components/drop/pdf'
PDFViewer
const DropPdfPage = () => {
	// PDF Viewer Page -- TBC if for dev only?
	// Use https://react-pdf.org/advanced#on-the-fly-rendering for download button
	const router = useRouter()
	const dropId = router.query.id
	const { drop: fullDrop, loading } = useGetFullDrop(dropId as string)

	return (
		<>
			<Head>
				<title>
					{loading
						? `Generate PDF | ShootDrop`
						: fullDrop
						? `PDF | ${fullDrop.project} | ShootDrop `
						: 'No Drop Found | ShootDrop'}
				</title>
			</Head>
			<Layout>
				<div className="flex h-screen w-full">
					{loading ? (
						<div className="mx-auto flex flex-col justify-center">
							<LoadingSpinner />
						</div>
					) : (
						<>
							{fullDrop ? (
								<NoSsrWrapper>
									<div className="w-full">
										<PDFDownloadLink
											document={<DropPdf dropForPdf={fullDrop} />}
											fileName="somename.pdf"
										>
											{({ blob, url, loading, error }) =>
												loading ? 'Loading document...' : 'Download now!'
											}
										</PDFDownloadLink>
										<PDFViewer
											className="mt-20 h-full w-full pt-12 md:pt-0"
											showToolbar={false}
										>
											<DropPdf dropForPdf={fullDrop} />
										</PDFViewer>
									</div>
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
		</>
	)
}

export default DropPdfPage
