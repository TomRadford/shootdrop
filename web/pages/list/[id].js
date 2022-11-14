import { gql } from "@apollo/client"
import client from "../../lib/apollo/client"
import Head from "next/head"

const ListPage = ({ list }) => {
  return (
    <>
      <Head>
        <title>
          {`${list.category[0]}${list.category.slice(1).toLowerCase()}`} gear |{" "}
          {list.drop.project}
          {list.drop.name} | ShootDrop
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
        id: "63724ceea99814760e7d01f6",
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
