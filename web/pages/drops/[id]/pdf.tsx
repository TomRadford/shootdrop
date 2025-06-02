import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import NoSsrWrapper from '../../../components/NoSsr'
import Layout from '../../../components/layout'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../../components/elements/LoadingSpinner'
import Head from 'next/head'
import { useGetFullDrop } from '../../../lib/hooks/queries'
import DropPdf from '../../../components/drop/pdf'
import Link from 'next/link'
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
									<div className="flex w-full flex-col pt-12 md:pt-0">
										<div className="mx-8 flex justify-between pt-6">
											<Link
												href={`/drops/${fullDrop.id}`}
												className="flex gap-2"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-6 w-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
													/>
												</svg>
												Back to Drop
											</Link>

											<PDFDownloadLink
												document={<DropPdf dropForPdf={fullDrop} />}
												fileName={`GearList_${fullDrop.project}.pdf`}
												className="bg-size-200 bg-pos-0 hover:bg-pos-100 ml-1 w-min rounded bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 px-3 py-1 text-sm font-bold transition-all duration-500"
											>
												{({ blob, url, loading, error }) =>
													loading ? <>Loading</> : <>Download</>
												}
											</PDFDownloadLink>
										</div>
										<PDFViewer
											className="mt-6 h-full w-full "
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
