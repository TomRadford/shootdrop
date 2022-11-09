import Head from "next/head"
import Layout from "../../components/layout"
import GearBrowser from "../../components/gear/Browser"
import ClientOnly from "../../components/ClientOnly"
const GearPage = () => {
  return (
    <>
      <Head>
        <title>Browse Gear | Shoot Drop</title>
      </Head>
      <Layout>
        <GearBrowser />
      </Layout>
    </>
  )
}

export default GearPage
