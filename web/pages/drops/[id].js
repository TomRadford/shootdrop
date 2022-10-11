import useCheckAuth from "../../lib/hooks/checkAuth"
import Head from "next/head"
import Layout from "../../components/layout"
import DropEditor from "../../components/drop/Editor"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@apollo/client"
import Loading from "../../components/Loading"
import { ALL_DROPS, UPDATE_DROP } from "../../lib/apollo/queries"
import ClientOnly from "../../components/ClientOnly"
// Route for DropEditor to mount with a queried drop
const EditDropPage = () => {
  // useCheckAuth() TO DO: Disable editing for no auth
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
        <Loading />
      </>
    )
  }
  return (
    <>
      <Head>
        <title>
          {dropResult.data && dropResult.data.allDrops[0].project} | ShootDrop
        </title>
      </Head>
      <Layout>
        <div className="h-screen">
          <div className="m-auto text-center">
            <ClientOnly>
              <DropEditor
                drop={dropResult.data && dropResult.data.allDrops[0]}
              ></DropEditor>
            </ClientOnly>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default EditDropPage
