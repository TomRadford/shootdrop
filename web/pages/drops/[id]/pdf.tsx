import { PDFViewer } from '@react-pdf/renderer'
import NoSsrWrapper from '../../../components/NoSsr'
import Layout from '../../../components/layout'

import { useRouter } from 'next/router'

import LoadingSpinner from '../../../components/elements/LoadingSpinner'

import Head from 'next/head'
import { useGetFullDrop } from '../../../lib/hooks/queries'
import DropPdf from '../../../components/drop/pdf'

const DropPdfPage = () => {
	// PDF Viewer Page -- TBC if for dev only?
	// Use https://react-pdf.org/advanced#on-the-fly-rendering for download button
	const router = useRouter()
	const dropId = router.query.id
	const { drop: fullDrop, loading } = useGetFullDrop(dropId)

	return (
		<>
			<Head>
				<title>PDF| {fullDrop?.project} | ShootDrop </title>
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
									<PDFViewer className="h-full w-full pt-12 md:pt-0">
										<DropPdf dropForPdf={fullDrop} />
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
		</>
	)
}

export default DropPdfPage
