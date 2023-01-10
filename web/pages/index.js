import Head from "next/head"
import Link from "next/link"
import Button from "../components/elements/Button"
import Layout from "../components/layout"
import useGetMe from "../lib/hooks/getMe"

const Home = () => {
  const me = useGetMe()
  return (
    <Layout>
      <Head>
        <title>ShootDrop: Your next shoot starts here</title>
        <meta name="description" content="Gear lists simplified." />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ShootDrop: Your next shoot starts here"
          key="title"
        />
      </Head>
      <div className="flex h-screen bg-gradient-to-t from-gray-900 to-gray-800">
        <div className="m-auto text-center">
          <h1 className="mx-12 text-5xl font-bold">
            Your next shoot starts here.
          </h1>
          <p className="mt-3">
            Make an asset list with a{" "}
            <Link href={me ? `/drops/add` : `/login`}>
              <Button>
                  Drop!
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Home
