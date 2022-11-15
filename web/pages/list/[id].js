import { gql, useQuery } from "@apollo/client"
import client from "../../lib/apollo/client"
import Head from "next/head"
import Layout from "../../components/layout"
import { useRouter } from "next/router"

const ListPage = ({ list }) => {
  const router = useRouter()
  const listId = router.query.id
  // const listResult = useQuery()
  if (!list) {
    return (
      <>
        <Head>
          <title>List not found | ShootDrop</title>
        </Head>
        <Layout>
          <div className="flex h-screen">
            <div className="m-auto text-center">
              <h1 className="m-5 text-5xl font-bold">404</h1>
              <p className="">List was not found.</p>
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
          {`${list.category[0]}${list.category.slice(1).toLowerCase()} gear |
          ${list.drop.project}  ${list.drop.name} | ShootDrop`}
        </title>
      </Head>
    </>
  )
}

const LIST_PROJECT = gql`
  query getList($id: String!) {
    getList(id: $id) {
      id
      category
      drop {
        project
      }
    }
  }
`

export const getServerSideProps = async ({ params }) => {
  try {
    const { data } = await client.query({
      query: LIST_PROJECT,
      variables: {
        id: params.id,
      },
      fetchPolicy: "no-cache",
    })

    return {
      props: {
        list: data.getList,
      },
    }
  } catch {
    return {
      props: {
        list: null,
      },
    }
  }
}

export default ListPage
