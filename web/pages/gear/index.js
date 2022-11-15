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

//ToDo: Potential feature: prefil query values
// export const getServerSideProps = (context) => {
//   const { query } = context
//   return {
//     props: {
//       serverQuery: query,
//     },
//   }
// }

export default GearPage
