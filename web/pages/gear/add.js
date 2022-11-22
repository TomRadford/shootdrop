import Head from "next/head"
import useCheckAuth from "../../lib/hooks/checkAuth"
import Layout from "../../components/layout"
import ClientOnly from "../../components/ClientOnly"
import GearEditor from "../../components/gear/Editor"
import useIsAddingStore from "../../lib/hooks/store/isAdding"
const AddGearPage = () => {
  useCheckAuth()
  const isAdding = useIsAddingStore((state) => state.isAdding)
  return (
    <>
      <Head>
        <title>Add Gear | ShootDrop</title>
      </Head>
      <Layout>
        <div className=" h-screen bg-gradient-to-t from-gray-900 to-gray-800">
          <div className="m-auto text-center">
            <ClientOnly>
              <GearEditor>
                <div className="my-20 text-gray-400">
                  {isAdding ? (
                    <p className="animate-bounce">
                      Almost there, keep adding details!
                    </p>
                  ) : (
                    <p>Please enter the details above</p>
                  )}
                </div>
              </GearEditor>
            </ClientOnly>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default AddGearPage
