import { gql, useQuery } from "@apollo/client"
import client from "../../lib/apollo/client"
import Head from "next/head"
import Layout from "../../components/layout"
import { useRouter } from "next/router"
import { GET_LIST } from "../../lib/apollo/queries"
import Loading from "../../components/Loading"
import GearBrowser from "../../components/gear/Browser"

const ListPage = ({ list }) => {
  const router = useRouter()
  const listId = router.query.id
  const listResult = useQuery(GET_LIST, {
    variables: {
      id: listId,
    },
  })
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
          {listResult.data
            ? `${
                listResult.data.getList.category[0]
              }${listResult.data.getList.category.slice(1).toLowerCase()} gear |
          ${listResult.data.getList.drop.project} | ShootDrop`
            : `${list.category[0]}${list.category.slice(1).toLowerCase()} gear |
          ${list.drop.project} | ShootDrop`}
        </title>
      </Head>
      {listResult.loading ? (
        <Loading />
      ) : (
        <Layout>
          <GearBrowser
            list={listResult.data ? listResult.data.getList : list}
          />
        </Layout>
      )}
    </>
  )
}

const LIST_PROJECT = gql`
  query getList($id: String!) {
    getList(id: $id) {
      id
      category
      drop {
        id
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
