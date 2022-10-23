import Head from "next/head"
import useCheckAuth from "../../lib/hooks/checkAuth"
import Layout from "../../components/layout"
import ClientOnly from "../../components/ClientOnly"
import GearEditor from "../../components/gear/Editor"
const AddGearPage = () => {
  useCheckAuth()
  return (
    <>
      <Head>
        <title>
          Add Gear | ShootDrop
        </title>
      </Head>
      <Layout>
        <div className=" h-screen bg-gradient-to-t from-gray-900 to-gray-800">
          <div className="m-auto text-center">
            <ClientOnly>
              <GearEditor>
                <div className="my-20 text-gray-400">
                  Please enter the details above
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