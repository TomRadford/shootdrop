import Head from 'next/head'
import useCheckAuth from '../../lib/hooks/checkAuth'
import Layout from '../../components/layout'
import ClientOnly from '../../components/ClientOnly'
import GearEditor from '../../components/gear/Editor'
import useIsAddingStore from '../../lib/hooks/store/isAdding'
import Link from 'next/link'
const AddGearPage = () => {
	useCheckAuth()
	const isAdding = useIsAddingStore((state) => state.isAdding)
	return (
        <>
            <Head>
				<title>Add Gear | ShootDrop</title>
			</Head>
            <Layout>
				<div className=" h-screen bg-gradient-to-t from-gray-900 to-gray-800">
					<div className="m-auto text-center">
						<ClientOnly>
							<GearEditor>
								<div className="my-20 text-gray-400">
									{isAdding === 1 && (
										<p className="animate-bounce">
											Almost there, keep adding details!
										</p>
									)}
									{isAdding === 0 && (
										<div className="mx-auto max-w-lg px-3">
											<h1 className="mb-2 text-2xl font-bold">Hold up!</h1>
											<p>Before adding gear above, make sure that:</p>
											<ul className="mt-2 flex flex-col gap-2">
												<li>
													<span>1.</span> The gear doesn't{' '}
													<Link href="/gear" className="font-bold">
														already exist
													</Link>
													.
												</li>
												<li>
													<span>2.</span> The information is accurate and
													relevant according to the manufacturer's website or a{' '}
													<a
														target="_blank"
														href="https://www.cined.com/databases/"
														className="font-bold"
														rel="noreferrer"
													>
														reputable source
													</a>
													.
												</li>
												<li>
													<span>3.</span>{' '}
													<span className="cursor-pointer font-bold transition-all duration-500 hover:drop-shadow-[0_1px_3px_rgba(0,205,168,0.8)]">
														You're appreciated!
													</span>{' '}
													<br />
													<span className="font-light">
														We're hoping to build up an{' '}
														<Link href="/gear" className="font-medium">
															
																awesome database of cine gear
															
														</Link>
														, making gear-listing easier. Know that it wouldn't
														be possible without you, awesome person!
													</span>
												</li>
											</ul>
										</div>
									)}
									{isAdding === 2 && (
										<p className="animate-ping">New gear incoming!</p>
									)}
								</div>
							</GearEditor>
						</ClientOnly>
					</div>
				</div>
			</Layout>
        </>
    );
}

export default AddGearPage
