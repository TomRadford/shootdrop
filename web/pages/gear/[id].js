import Head from "next/head"
import Loading from "../../components/Loading"
import Layout from "../../components/layout"
import ClientOnly from "../../components/ClientOnly"
import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import client from "../../lib/apollo/client"
import { ALL_GEAR_ITEMS } from "../../lib/apollo/queries"
import GearEditor from "../../components/gear/Editor"

const GearPage = ({ gearItem }) => {
  const router = useRouter()
  const gearItemId = router.query.id
  const gearItemResult = useQuery(ALL_GEAR_ITEMS, {
    variables: { id: gearItemId },
  })

  if (!gearItem) {
    return (
      <>
        <Head>
          <title>Gear item not found | ShootDrop</title>
        </Head>
        <Layout>
          <div className="flex h-full">
            <div className="m-auto text-center">
              <h1 className="m-5 text-5xl font-bold">404</h1>
              <p className="">Gear item was not found.</p>
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
          {gearItemResult.data
            ? `${gearItemResult.data.allGearItems[0].manufacturer} ${gearItemResult.data.allGearItems[0].model} | ShootDrop`
            : `${gearItem.manufacturer} ${gearItem.model} | ShootDrop`}
        </title>
      </Head>
      {gearItemResult.loading ? (
        <Loading />
      ) : (
        <Layout>
          <div className="h-full">
            <div className="m-auto text-center">
              <ClientOnly>
                <GearEditor
                  gearItem={
                    gearItemResult.data && gearItemResult.data.allGearItems[0]
                  }
                ></GearEditor>
              </ClientOnly>
            </div>
          </div>
        </Layout>
      )}
    </>
  )
}

const GEAR_ITEM_MANU_MODEL = gql`
  query allGearItems($id: String!) {
    allGearItems(id: $id) {
      manufacturer
      model
    }
  }
`

export const getServerSideProps = async ({ params }) => {
  console.log(params)
  try {
    const { data } = await client.query({
      query: GEAR_ITEM_MANU_MODEL,
      variables: {
        id: params.id,
      },
      fetchPolicy: "no-cache",
    })
    console.log(data)
    return {
      props: {
        gearItem: data.allGearItems[0],
      },
    }
  } catch {
    return {
      props: {
        gearItem: null,
      },
    }
  }
}

export default GearPage
