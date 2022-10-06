import Head from "next/head"
import { useState } from "react"
import Layout from "../components/layout"

const Home = () => {
  const [colorChange, setColorChange] = useState(false)

  return (
    <Layout>
      <Head>
        <title>ShootDrop</title>
      </Head>
    </Layout>
  )
}

export default Home
