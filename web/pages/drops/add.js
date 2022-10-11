import Head from "next/head"
import Layout from "../../components/layout"
import { ADD_DROP } from "../../lib/apollo/queries"
import { useMutation } from "@apollo/client"
import DropEditor from "../../components/drop/Editor"
import useCheckAuth from "../../lib/hooks/checkAuth"
import ClientOnly from "../../components/ClientOnly"

// Route for DropEditor to mount with no drop

const AddDropPage = () => {
  useCheckAuth()

  return (
    <>
      <Head>
        <title>Create Drop | ShootDrop</title>
      </Head>
      <Layout>
        <div className=" h-screen bg-gradient-to-t from-gray-900 to-gray-800">
          <div className="m-auto text-center">
            <ClientOnly>
              <DropEditor>
                <div className="my-20 text-gray-400">
                  Please enter the details above
                </div>
              </DropEditor>
            </ClientOnly>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default AddDropPage
