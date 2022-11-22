import Head from "next/head"
import Layout from "../../components/layout"
import DropEditor from "../../components/drop/Editor"
import useCheckAuth from "../../lib/hooks/checkAuth"
import ClientOnly from "../../components/ClientOnly"
import useIsAddingStore from "../../lib/hooks/store/isAdding"

// Route for DropEditor to mount with no drop

const AddDropPage = () => {
  useCheckAuth()
  const isAdding = useIsAddingStore((state) => state.isAdding)

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
                  {isAdding === 1 && (
                    <p className="animate-bounce">Almost there, keep typing!</p>
                  )}
                  {isAdding === 0 && <p>Please enter the details above</p>}
                  {isAdding === 2 && (
                    <p className="animate-ping">New drop coming in hot!</p>
                  )}
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
