import Layout from "../../components/layout"
import { gql, useQuery } from "@apollo/client"
import Loading from "../../components/Loading"
import Head from "next/head"
import useCheckAuth from "../../lib/hooks/checkAuth"
import DropSummaryCard from "../../components/drop/SummaryCard"
import { ME_DROPS } from "../../lib/apollo/queries"

const DropsPage = () => {
  const { data, loading } = useQuery(ME_DROPS)
  useCheckAuth()

  if (loading) {
    return <Loading title="My Drops | ShootDrop" />
  }

  console.log(data.me.drops)

  return (
    <>
      <Head>
        <title>My Drops | ShootDrop</title>
      </Head>
      <Layout>
        <div className="flex h-full min-h-screen">
          <div className="mb-10 w-full pt-16 text-center md:mx-3 md:pt-6">
            <div className="flex">
              <div className="m-auto text-center">
                <div className="mx-4 mt-10 max-w-[60rem] md:mx-0">
                  <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
                    {data.me &&
                      [...data.me.drops]
                        .sort((a, b) => {
                          if (!a.startDate) {
                            return -1
                          }

                          if (a.startDate < b.startDate) {
                            return -1
                          }
                          if (a.startDate > b.startDate) {
                            return 1
                          }
                          return 0
                        })
                        .map((drop) => (
                          <DropSummaryCard drop={drop} key={drop.id} />
                        ))}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default DropsPage
