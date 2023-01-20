import Head from 'next/head'
import Layout from '../components/layout'
import useGetMe from '../lib/hooks/getMe'
import {
	Drop,
	GearItem as GearItemType,
	GearList,
	User,
} from '../__generated__/graphql'
import DropSummaryCard from '../components/drop/SummaryCard'
import {
	ALL_DROPS,
	GET_LIST_ITEMS,
	RANDOM_GEAR_ITEMS,
} from '../lib/apollo/queries'
import ssgClient from '../lib/apollo/ssgClient'
import ModalUser from '../components/landing/ModalUser'
import { TypeAnimation } from 'react-type-animation'
import { FullDrop, GearListWithItems } from '../lib/types'
import LandingList from '../components/landing/List'
import GearItem from '../components/gear/Item'
import Image from 'next/image'
import Link from 'next/link'
import { gql } from '@apollo/client'
import MarqueeSection from '../components/landing/Marquee'

// Faux data for landing

const users: User[] = [
	{
		id: '1',
		username: 'roger@example.com',
		gearhouse: false,
		fullName: 'Roger Deakins',
		profilePicture: '/img/landing/roger.jpg',
	},
	{
		id: '2',
		username: 'biggels@example.com',
		gearhouse: false,
		fullName: 'John Higgins',
		profilePicture: '/img/landing/john.jpg',
	},
	{
		id: '3',
		username: 'andy@example.com',
		gearhouse: false,
		fullName: 'Andy Harris',
		profilePicture: '/img/landing/andy.png',
	},
]

const Home = ({
	drop,
	randomGearItems,
}: {
	drop: FullDrop
	randomGearItems: GearItemType[]
}) => {
	// const me = useGetMe()
	const cameraList = drop.lists.find((list) => list.category === 'CAMERA')
	const listItems = [
		cameraList.items.find(
			(listItem) => listItem.gearItem.id === '63abf1acd844ebf2485ab85d'
		),
		cameraList.items.find(
			(listItem) => listItem.gearItem.id === '63849d39cc38bbdc9e49c1e5'
		),
	]
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
				<div className="relative flex h-screen overflow-y-hidden bg-gradient-to-t from-gray-900 to-black">
					<div className="m-auto text-center">
						<div className="relative ">
							<img
								alt=""
								src="/img/landing-glow.png"
								className="absolute  z-10 -mt-16  h-[180%] w-[150%] blur-2xl"
								draggable={false}
							/>
							<div className=" relative z-20 mx-12 rounded-xl bg-[#171923] px-8 py-8 shadow-lg md:mx-16">
								<h1 className="text-5xl font-bold 2xl:text-6xl">
									Your next shoot starts here.
								</h1>
								<p className="mt-3 2xl:text-xl">
									Asset list creation made easy ✨
								</p>
							</div>
						</div>
					</div>
					<div className="absolute bottom-10 z-50 flex w-full justify-center mix-blend-soft-light">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="white"
							className="h-12 w-12 "
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</div>
					<div className="absolute z-[5] mt-36 h-full w-full bg-gradient-to-b from-transparent to-gray-900 "></div>
					<div className="absolute w-full ">
						{/* Targeting displays up to UHD */}
						<div className="relative -mt-10 flex h-full flex-col gap-4 overflow-x-hidden  opacity-25">
							{[1, 2, 3, 4, 5, 6, 1].map((indexStart, i) => (
								<div key={i} className="relative  flex flex-row gap-4">
									<div
										className="flex animate-[marquee_100s_linear_infinite] gap-4"
										style={{
											animationDirection: i % 2 === 0 ? 'reverse' : 'normal',
										}}
									>
										<MarqueeSection
											items={randomGearItems.slice(
												(indexStart - 1) * 8,
												indexStart * 8 - 1
											)}
										/>
									</div>
									<div
										className="absolute top-0 ml-4 flex animate-[marquee2_100s_linear_infinite] gap-4"
										style={{
											animationDirection: i % 2 === 0 ? 'reverse' : 'normal',
										}}
									>
										<MarqueeSection
											items={randomGearItems.slice(
												(indexStart - 1) * 8,
												indexStart * 8 - 1
											)}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center bg-gradient-to-t from-gray-800 to-gray-900 px-2 pb-2 pt-52 text-center">
					<h1 className="text-5xl font-bold 2xl:text-6xl">
						It all starts with a Drop.
					</h1>
					<p className="mt-3 2xl:text-xl">
						The home for all gear-related info pertaining to your shoot.
					</p>
					<div className="mt-16 flex w-11/12 max-w-4xl flex-col items-center gap-4 lg:flex-row lg:justify-between 2xl:max-w-5xl">
						<div className="flex w-72 flex-col gap-4 ">
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
								<a className="cursor-pointer truncate font-semibold">
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
						<div className="mt-4 lg:mt-0">
							<DropSummaryCard drop={drop} />
						</div>
					</div>
					<div className="mt-16 flex w-11/12 max-w-4xl flex-col-reverse items-center justify-center gap-7 lg:flex-row lg:justify-evenly 2xl:max-w-5xl">
						<div className="overflow-hidden rounded-2xl bg-black bg-opacity-50 px-4 py-2 text-left align-middle text-white shadow-2xl shadow-black ">
							<h3 className="text-sm font-medium leading-6 text-white">
								Members
							</h3>
							<div className="mt-2 flex flex-col gap-3">
								{users.map((user) => (
									<ModalUser user={user} key={user.id} />
								))}
								<div className="mt-1 ">
									<TypeAnimation
										sequence={[
											'The DP',
											1000,
											'The gaffer',
											1200,
											'The AC',
											1000,
											'The grip',
											1000,
											'Drone op',
											1000,
											'Steadicam op',
											2000,
										]}
										repeat={Infinity}
										cursor={true}
										wrapper="p"
										style={{ fontSize: '1em', textAlign: 'center' }}
									/>
								</div>
							</div>
						</div>
						<div className="max-w-sm">
							<p className="font-bold">Collaborate with the team</p>
							<p>
								Whether it&#39;s the soundie, AC or even grip you can invite
								anyone to add gear to the drop.
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center bg-gradient-to-t from-gray-900 to-gray-800 px-2 pt-36 pb-20 text-center">
					<h1 className="text-5xl font-bold 2xl:text-6xl">
						A list for each department.
					</h1>
					<p className="mt-3 2xl:text-xl">
						Keep each technical department separate with their own clear list.
					</p>
					<section className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
						{drop.lists.map((list) => (
							<LandingList key={list.id} list={list} />
						))}
					</section>
				</div>
				<div className="flex flex-col items-center justify-center gap-10 bg-gradient-to-t from-gray-800 to-gray-900 px-2  pb-20 text-center">
					<div>
						<p className="font-bold">Useful options</p>
						<p>
							Collaborators can pick preferences and add comments for gear on
							your list.
						</p>
					</div>
					<div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 lg:gap-32">
						{listItems.map((item) => (
							<GearItem key={item.id} data={item} list={cameraList} />
						))}
					</div>
				</div>
				<div className="flex flex-col items-center justify-center bg-gradient-to-t from-gray-900 to-gray-800 px-2 pb-20 text-center">
					<div className="mt-16 flex w-11/12 max-w-2xl flex-col items-center gap-7 lg:flex-row lg:justify-between 2xl:max-w-3xl">
						<Link href={`/drops/${drop.id}/pdf`}>
							<a className="h-72 w-64 overflow-hidden rounded-3xl transition-transform will-change-transform hover:scale-105 active:scale-95">
								<Image
									alt="PDF generated with ShootDrop"
									src="/img/landing/pdf.jpg"
									width={400}
									height={1000}
									className="animate-[scrollLanding_3s_ease-in-out_infinite_alternate]"
									draggable={false}
								/>
							</a>
						</Link>
						<div className="max-w-sm">
							<p className="font-bold">PDFs</p>
							<p>
								Once your drop is locked in, you can export it to easily share
								with your production office.
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col  items-center gap-4 bg-gradient-to-t from-gray-800 to-gray-900 px-2 pb-2 pt-24 text-center">
					<div className="max-w-4xl">
						<h1 className="text-5xl font-bold 2xl:text-6xl ">
							All the gear you can imagine, literally
						</h1>
						<p className="mt-3 2xl:text-xl">
							A user-driven, ever-growing database of film gear, categorised and
							tagged.
						</p>
					</div>
					{/* <div className="h-[20rem] w-9/12 rounded-2xl bg-gray-200"></div> */}
				</div>
				<div className="flex flex-col items-center justify-center bg-gradient-to-t from-gray-900 to-gray-800 px-2 pb-20 text-center">
					<div className="mt-16 flex w-11/12 max-w-2xl flex-col-reverse items-center gap-10 lg:flex-row lg:justify-between 2xl:max-w-3xl">
						<Link href="/gear/add">
							<a className=" h-72 w-11/12 overflow-hidden rounded-3xl transition-transform will-change-transform hover:scale-105 active:scale-95 sm:w-96">
								<video autoPlay muted loop>
									<source src="/img/landing/addgear.mp4" type="video/mp4" />
								</video>
							</a>
						</Link>
						<div className="max-w-sm">
							<p className="font-bold">Something missing, add it!</p>
							<p className="max-w-xs">
								If an item is missing from our database, you can add it!
							</p>
						</div>
					</div>
				</div>
				<div className="relative flex bg-gradient-to-t from-black to-gray-900 pb-56 pt-40">
					<div className=" m-auto text-center">
						<p className=" 2xl:text-xl">Heard enough?</p>
						<Link href="/drops/add">
							<a className="cursor-pointer text-5xl font-bold transition-all duration-500 hover:drop-shadow-[0_2px_3px_rgba(255,255,255,0.8)] 2xl:text-6xl">
								Make a Drop!
							</a>
						</Link>
					</div>
					<a
						href="https://tomradford.co.za"
						className="absolute bottom-6 w-full text-center opacity-30"
					>
						Made by Tom 🎥
					</a>
				</div>
			</Layout>
		</>
	)
}

// Seperate Apollo client for SSG (ref's specific drop on api.shootdrop.com)

export const getStaticProps = async () => {
	try {
		const dropQuery = await ssgClient.query({
			query: ALL_DROPS,
			variables: {
				drop: '6381ba5fe6dbbedf68c7ca3a',
			},
			fetchPolicy: 'no-cache',
		})
		const baseDrop: Drop = dropQuery.data.allDrops[0]
		let listsForDrop: GearListWithItems[] = []
		for await (const list of baseDrop.lists) {
			const newListResult = await ssgClient.query({
				query: GET_LIST_ITEMS,
				variables: {
					list: list.id,
				},
			})
			const newList = {
				...list,
				items: newListResult.data?.getListItems?.gearListItems,
				itemCount: newListResult.data?.getListItems?.totalDocs,
			}

			listsForDrop = [...listsForDrop, newList]
		}

		const drop = { ...baseDrop, lists: listsForDrop }

		const randomGearItems: GearItemType[] = (
			await ssgClient.query({
				query: RANDOM_GEAR_ITEMS,
				variables: {
					limit: 48,
					random: true,
				},
			})
		).data.allGearItems.gearItems

		return {
			props: {
				drop,
				randomGearItems,
			},
		}
	} catch {
		return {
			props: {
				drop: null,
			},
		}
	}
}

export default Home
