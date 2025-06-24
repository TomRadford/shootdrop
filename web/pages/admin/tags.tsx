import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_TAGS, ME } from '../../lib/apollo/queries'
import Layout from '../../components/layout'
import TagRow from '../../components/admin/tags'
import Head from 'next/head'

const AdminTagsPage = () => {
	const { data: meData, loading: meLoading } = useQuery(ME)
	const { data, loading, error, refetch } = useQuery(ALL_TAGS, {
		variables: { limit: 10000 },
	})

	if (loading && meLoading)
		return (
			<Layout>
				<div className="p-8">Loading tags...</div>
			</Layout>
		)

	// ToDo: refactor to tanstack router middleware
	if (!meData?.me?.admin)
		return (
			<Layout>
				<div>You are not authorized to access this page</div>
			</Layout>
		)
	if (error)
		return (
			<Layout>
				<div className="p-8 text-red-600">
					Error loading tags: {error.message}
				</div>
			</Layout>
		)

	return (
		<Layout>
			<Head>
				<title>Admin Tag Manager | ShootDrop</title>
			</Head>
			<div className="max-w-2xl mx-auto p-8">
				<h1 className="text-2xl font-bold mb-6">Admin Tag Manager</h1>
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b">
							<th className="text-left py-2">Name</th>
							<th className="text-left py-2">Categories</th>
							<th className="py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{data?.allTags?.map((tag: any) => (
							<TagRow key={tag.id} tag={tag} />
						))}
					</tbody>
				</table>
				{data?.allTags?.length === 0 && (
					<div className="text-gray-500 mt-8 text-center">No tags found.</div>
				)}
			</div>
		</Layout>
	)
}

export default AdminTagsPage
