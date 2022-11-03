import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import Layout from "../components/layout"

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>ShootDrop</title>
        <meta
          name="description"
          content="Shoot asset organisation simplified."
        />
      </Head>
      <div className="flex h-screen bg-gradient-to-t from-gray-900 to-gray-800">
        <div className="m-auto text-center">
          <h1 className="mx-12 text-5xl font-bold">
            Your next shoot starts here.
          </h1>
          <p className="mt-3">
            Make an asset list with a{" "}
            <Link href="/drops/add">
              <a>
                <button className="bg-size-200 bg-pos-0 hover:bg-pos-100 ml-1 rounded bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 px-3 py-1 font-bold transition-all duration-500">
                  Drop!
                </button>
              </a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Home
