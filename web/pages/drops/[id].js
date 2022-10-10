import useCheckAuth from "../../lib/hooks/checkAuth"
import Head from "next/head"
import Layout from "../../components/layout"
import DropEditor from "../../components/drop/editor"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import Loading from "../../components/Loading"
import { ALL_DROPS } from "../../lib/apollo/queries"
import ClientOnly from "../../components/ClientOnly"
// Route for DropEditor to mount with a queried drop
const EditDrop = () => {
  useCheckAuth()
  const router = useRouter()
  const dropId = router.query.id
  const dropResult = useQuery(ALL_DROPS, {
    variables: {
      drop: dropId,
    },
  })
  if (dropResult.loading) {
    return (
      <>
        <Head>
          <title>Loading Drop | ShootDrop</title>
        </Head>
        <Layout>
          <div className=" h-screen ">
            <div className="m-auto text-center">
              <Loading />
            </div>
          </div>
        </Layout>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Create Drop | ShootDrop</title>
      </Head>
      <Layout>
        <div className=" h-screen ">
          <div className="m-auto text-center">
            <ClientOnly>
              <DropEditor drop={dropResult.data.allDrops[0]}></DropEditor>
            </ClientOnly>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default EditDrop
