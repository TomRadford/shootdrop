import { useQuery } from "@apollo/client"
import Head from "next/head"
import { useRouter } from "next/router"
import { GET_LIST } from "../../../lib/apollo/queries"
import { gql } from "@apollo/client"
import client from "../../../lib/apollo/client"
import Layout from "../../../components/layout"
import GearBrowser from "../../../components/gear/Browser"
import Loading from "../../../components/Loading"
import useCheckAuth from "../../../lib/hooks/checkAuth"

const ListAddPage = ({ list }) => {
  console.log(list)
  const router = useRouter()
  const { id: listId } = router.query
  const listResult = useQuery(GET_LIST, {
    variables: {
      id: listId,
    },
  })

  useCheckAuth()

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
              <p className="">List to add to was not found.</p>
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
            ? `Add ${
                listResult.data.getList.category[0]
              }${listResult.data.getList.category.slice(1).toLowerCase()} gear |
          ${listResult.data.getList.drop.project} | ShootDrop`
            : `Add ${list.category[0]}${list.category
                .slice(1)
                .toLowerCase()} gear |
          ${list.drop.project} | ShootDrop`}
        </title>
      </Head>
      {listResult.loading ? (
        <Loading />
      ) : (
        <Layout>
          <GearBrowser
            listToAdd={listResult.data ? listResult.data.getList : list}
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

export default ListAddPage
