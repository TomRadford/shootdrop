import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/elements/Button'
import Layout from '../components/layout'
import useGetMe from '../lib/hooks/getMe'
import { User } from '../__generated__/graphql'
import Card from '../components/Card'
const Home = () => {
	const me = useGetMe()
	return (
		<>
			<Head>
				<title>ShootDrop: Your next shoot starts here</title>
				<meta name="description" content="Gear lists simplified." />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="ShootDrop: Your next shoot starts here"
					key="title"
				/>
			</Head>

			<Layout>
				<div className="flex h-[98vh] bg-gradient-to-t from-gray-900 to-gray-800">
					<div className="m-auto text-center">
						<div className="relative  ">
							<img
								alt=""
								src="/img/landing-glow.png"
								className=" absolute  z-0 -mt-16  h-[180%] w-[150%] blur-2xl"
							/>
							<div className=" relative z-10 mx-12 rounded-xl bg-[#171923] px-6 py-5 shadow-lg md:mx-16">
								<h1 className="text-5xl font-bold">
									Your next shoot starts here.
								</h1>
								<p className="mt-3">Asset list creation made easy ✨</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex h-[80vh] bg-gradient-to-t from-gray-800 to-gray-900">
					<div className="mx-auto text-center">
						<h1 className="text-5xl font-bold">It all starts with a Drop.</h1>
						<p className="mt-3">
							The home for all gear-related info pertaining to your shoot.
						</p>
						<div className="mt-16 flex flex-col justify-between lg:flex-row">
							<div className="flex w-72 flex-col gap-4">
								<div className="flex gap-2 rounded-xl bg-black bg-opacity-30 py-1  px-3 text-sm shadow-lg">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="#415a7d"
										className="h-5 w-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
										/>
									</svg>
									<a className="truncate">
										https://shootdrop.com/drops/6381ba5fe6dbbedf68c7ca3a
									</a>
								</div>
								<div>
									<p className="font-bold">Your shoot at a glance</p>
									<p>
										It&#39;s publicly sharable for everyone on the production to
										stay up to date.
									</p>
								</div>
							</div>
							<div>glance</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export const getStaticProps = async ({ params }) => {
	return {
		props: {},
	}
}

export default Home
