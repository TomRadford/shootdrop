import Layout from "../../components/layout"
import { gql, useQuery } from "@apollo/client"
import Card from "../../components/Card"
import Loading from "../../components/Loading"
import Link from "next/link"
import { format } from "date-fns"
import useCheckAuth from "../../lib/hooks/checkAuth"
import Head from "next/head"
import Image from "next/image"

const ME_DROPS = gql`
  query {
    me {
      fullName
      id
      profilePicture
      drops {
        id
        project
        client
        director
        dop
        soundie
        gearCheckDate
        startDate
        endDate
        wrapDate
        updatedAt
        users {
          id
          profilePicture
        }
      }
    }
  }
`

const DropsPage = () => {
  const { data, loading } = useQuery(ME_DROPS)
  useCheckAuth()
  if (loading && !data) {
    return <Loading />
  }

  return (
    <>
      <Head>
        <title>My Drops | ShootDrop</title>
      </Head>
      <Layout>
        <div className="flex h-full min-h-screen">
          <div className="w-full pt-16 text-center md:mx-3 md:pt-6">
            <div className="flex">
              <div className="m-auto text-center">
                <div className="mx-4 mt-10 max-w-[60rem] md:mx-0">
                  <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
                    {data.me.drops.map((drop) => (
                      <Link href={`/drops/${drop.id}`} key={drop.id}>
                        <button className="mx-auto w-80 sm:w-96">
                          <Card>
                            <div className="flex flex-col gap-4 py-2 px-1 sm:px-4">
                              <div className="flex flex-col gap-0">
                                <h3 className="text-left text-base font-semibold">
                                  {drop.project}
                                </h3>
                                <p className="text-left text-xs font-light text-gray-300">
                                  {drop.client}
                                </p>
                              </div>
                              <div className="flex flex-row justify-between">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="text-left text-xs">
                                    <p className="font-light text-gray-300">
                                      Gear Check
                                    </p>
                                    {drop.gearCheckDate ? (
                                      <p className="font-bold">
                                        {format(
                                          new Date(drop.gearCheckDate),
                                          "d MMM yyyy"
                                        )}
                                      </p>
                                    ) : (
                                      <p>No date</p>
                                    )}
                                  </div>
                                  <div className="text-left text-xs">
                                    <p className="font-light text-gray-300">
                                      Start Date
                                    </p>
                                    {drop.startDate ? (
                                      <p className="font-bold">
                                        {format(
                                          new Date(drop.startDate),
                                          "d MMM yyyy"
                                        )}
                                      </p>
                                    ) : (
                                      <p>No date</p>
                                    )}
                                  </div>
                                  <div className="text-left text-xs">
                                    <p className="font-light text-gray-300">
                                      Gear Wrap
                                    </p>
                                    {drop.wrapDate ? (
                                      <p className="font-bold">
                                        {format(
                                          new Date(drop.wrapDate),
                                          "d MMM yyyy"
                                        )}
                                      </p>
                                    ) : (
                                      <p>No date</p>
                                    )}
                                  </div>
                                  <div className="text-left text-xs">
                                    <p className="font-light text-gray-300">
                                      Gear Check
                                    </p>
                                    {drop.gearCheckDate ? (
                                      <p className="font-bold">
                                        {format(
                                          new Date(drop.gearCheckDate),
                                          "d MMM yyyy"
                                        )}
                                      </p>
                                    ) : (
                                      <p>No date</p>
                                    )}
                                  </div>
                                </div>
                                <div className="text-left text-xs">
                                  {drop.director && (
                                    <div className="flex">
                                      <p className="font-light text-gray-300">
                                        Dir
                                      </p>
                                      <p className="font-bold">
                                        &#160; {drop.director}
                                      </p>
                                    </div>
                                  )}
                                  {drop.dop && (
                                    <div className="flex">
                                      <p className="font-light text-gray-300">
                                        DP
                                      </p>
                                      <p className="font-bold">
                                        &#160; {drop.dop}
                                      </p>
                                    </div>
                                  )}
                                  {drop.soundie && (
                                    <div className="flex">
                                      <p className="font-light text-gray-300">
                                        SND
                                      </p>
                                      <p className="font-bold">
                                        &#160; {drop.soundie}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-end gap-2 pb-0">
                                <p className="text-right text-xs text-gray-300">
                                  Last edited{" "}
                                  {format(
                                    new Date(drop.updatedAt),
                                    "HH:mm d/M/yy"
                                  )}
                                </p>
                                <div className="flex -space-x-2 self-start ">
                                  {drop &&
                                    drop.users.map((user) => (
                                      <div key={user.id}>
                                        <Image
                                          src={user.profilePicture}
                                          key={user.id}
                                          width="20px"
                                          height="20px"
                                          className={`rounded-full`}
                                          objectFit="cover"
                                        />
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </button>
                      </Link>
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
