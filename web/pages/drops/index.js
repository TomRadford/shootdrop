import Layout from '../../components/layout'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../components/Loading'
import Head from 'next/head'
import useCheckAuth from '../../lib/hooks/checkAuth'
import DropSummaryCard from '../../components/drop/SummaryCard'
import { ME_DROPS } from '../../lib/apollo/queries'
import AddCard from '../../components/AddCard'
import { useState } from 'react'

const DropsPage = () => {
	const { data, loading } = useQuery(ME_DROPS)
	const [pastDrops, setPastDrops] = useState([])
	useCheckAuth()

	if (loading) {
		return <Loading />
	}

	return (
		<>
			<Head>
				<title>My Drops | ShootDrop</title>
			</Head>
			<Layout>
				<div className="flex h-full min-h-screen">
					<div className="mb-10 w-full pt-0 text-center md:mx-0 md:pt-0">
						<div className="flex flex-col">
							<div className="w-full bg-gradient-to-b from-[#121212] to-transparent pb-8 pt-16 md:pt-8">
								<h1 className="text-lg font-semibold">Incoming Drops</h1>
							</div>
							<div className="m-auto text-center">
								<div className="mx-4 mt-0 max-w-[60rem] md:mx-0">
									<section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
										{/* ToDo: Abstract this ordering function to not be repeated for previous drops */}
										{data.me &&
											[...data.me?.drops]
												.sort((a, b) => {
													if (!a.endDate) {
														return -1
													}
													if (a.endDate < b.endDate) {
														return -1
													}
													if (a.endDate > b.endDate) {
														return 1
													}
													return 0
												})
												.map((drop) => {
													if (
														drop.endDate > new Date().getTime() ||
														!drop.endDate
													)
														return <DropSummaryCard drop={drop} key={drop.id} />
												})}
										<AddCard href="/drops/add" />
									</section>
									<div className="w-full  pb-8 pt-16">
										<h1 className="mb-10 text-lg font-semibold">Past Drops</h1>
										<section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
											{data.me &&
												[...data.me?.drops]
													.sort((a, b) => {
														if (!a.endDate) {
															return -1
														}
														if (a.endDate < b.endDate) {
															return 1
														}
														if (a.endDate > b.endDate) {
															return -1
														}
														return 0
													})
													.map((drop) => {
														if (
															drop.endDate &&
															drop.endDate < new Date().getTime()
														)
															return (
																<DropSummaryCard drop={drop} key={drop.id} />
															)
													})}
										</section>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}
export default DropsPage
