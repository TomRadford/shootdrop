import useCheckAuth from '../../../lib/hooks/checkAuth'
import Head from 'next/head'
import Layout from '../../../components/layout'
import DropEditor from '../../../components/drop/Editor'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import Loading from '../../../components/Loading'
import { ALL_DROPS, UPDATE_DROP } from '../../../lib/apollo/queries'
import ClientOnly from '../../../components/ClientOnly'
import client from '../../../lib/apollo/client'
import { gql } from '@apollo/client'
// Route for DropEditor to mount with a queried drop
const DropPage = ({ drop }) => {
	const router = useRouter()
	const dropId = router.query.id
	const dropResult = useQuery(ALL_DROPS, {
		variables: {
			drop: dropId,
		},
		fetchPolicy: 'cache-and-network',
	})

	if (!drop) {
		return (
			<>
				<Head>
					<title>Project not found | ShootDrop</title>
				</Head>
				<Layout>
					<div className="flex h-screen">
						<div className="m-auto text-center">
							<h1 className="m-5 text-5xl font-bold">404</h1>
							<p className="">Project was not found.</p>
						</div>
					</div>
				</Layout>
			</>
		)
	}

	return (
		<>
			<Head>
				<title>
					{dropResult.data
						? `${dropResult.data.allDrops[0].project} | ShootDrop`
						: `${drop.project} | ShootDrop`}
				</title>
			</Head>
			{dropResult.loading ? (
				<Loading />
			) : (
				<Layout>
					<div className="h-full ">
						<div className="m-auto text-center">
							<ClientOnly>
								<DropEditor
									drop={dropResult.data && dropResult.data.allDrops[0]}
								></DropEditor>
							</ClientOnly>
						</div>
					</div>
				</Layout>
			)}
		</>
	)
}

//Project name queried for title SSR and replaced upon hydration

const DROP_PROJECT = gql`
	query allDrops($drop: String!) {
		allDrops(drop: $drop) {
			project
		}
	}
`

// TO DO: Revisit fetch policy
export const getServerSideProps = async ({ params }) => {
	try {
		const { data } = await client.query({
			query: DROP_PROJECT,
			variables: {
				drop: params.id,
			},
			fetchPolicy: 'no-cache',
		})
		return {
			props: {
				drop: data.allDrops[0],
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

export default DropPage
