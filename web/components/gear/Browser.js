import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_GEAR_ITEMS } from "../../lib/apollo/queries"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

const whitePixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="

const GearListSkeleton = ({ length = 20 }) => (
  <>
    {[...Array(length)].map((a, i) => (
      <div
        key={i}
        className="h-[330px] w-[300px] animate-pulse overflow-hidden rounded-xl bg-gray-500 shadow-lg"
      ></div>
    ))}
  </>
)

const GearFilter = ({ manufacturer, setManufacturer, refetch }) => {

  // const [loadNewGearItems, gearResults] = useLazyQuery(ALL_GEAR_ITEMS, {
  //   fetchPolicy: 'network-only', variables: {
  //     manufacturer
  //   }
  // })

  useEffect(() => {
    if (manufacturer.length > 0) {
      refetch({ manufacturer })
    }
  }, [manufacturer])

  return (
    <div className="flex flex-col">
      <input
        className="bg-transparent"
        value={manufacturer} onChange={({ target }) => setManufacturer(target.value)} />
      <input />
    </div>
  )
}

//GearBrowser to be used on /gear and /list/[id]/add routes
const GearBrowser = ({ list }) => {
  const [manufacturer, setManufacturer] = useState('')
  const [fetchingMore, setFetchingMore] = useState(false)
  const {
    data: allGearData,
    loading: allGearLoading,
    refetch,
    fetchMore: fetchMoreGear,
  } = useQuery(
    ALL_GEAR_ITEMS,
    //ToDo: update cache on local/subscription-based gearItem add
    {
      fetchPolicy: "network-only",
      onCompleted: () => setFetchingMore(false)
    }
  )
  const { ref: inViewRef, inView, entry } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (
      inView &&
      allGearData.allGearItems.gearItems.length <
      allGearData.allGearItems.totalDocs
    ) {
      setFetchingMore(true)
      fetchMoreGear({
        variables: {
          offset: allGearData.allGearItems.gearItems.length,
        },
      })
    }
  }, [inView])

  return (
    <div className="flex h-full min-h-screen">
      <div className="mb-10 w-full pt-0 text-center md:mx-0 md:pt-0">
        <div className="flex flex-wrap w-full bg-gradient-to-b from-[#121212] to-transparent pb-8 pt-16 md:pt-8">
          <GearFilter manufacturer={manufacturer} setManufacturer={setManufacturer} refetch={refetch} />
        </div>
        {allGearLoading ? (
          <div className="mx-2 ">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
              <GearListSkeleton />
            </div>
          </div>
        ) : (
          <div className="mx-2 ">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
              {allGearData.allGearItems.gearItems.map((gearItem) => {
                return (
                  <div
                    className="overflow-hidden rounded-xl shadow-lg"
                    key={gearItem.id}
                  >
                    <Link href={`/gear/${gearItem.id}`}>
                      {/* ToDo: Consider target blank to open new tab
															Disadvantage would be reloading app in new tab
											*/}
                      <div className="relative -mb-1 hover:cursor-pointer">
                        {gearItem.images.length > 0 ? (
                          <Image
                            src={gearItem.images[0].url}
                            width="300px"
                            height="330px"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={whitePixel}
                          />
                        ) : (
                          <Image
                            src={`/img/default_gear.jpg`}
                            width="300px"
                            height="330px"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={whitePixel}
                          />
                        )}
                        <div className="absolute bottom-[6px] flex w-full flex-col bg-gradient-to-t from-[#000000b9] to-transparent px-3 pb-2 pt-12 text-left ">
                          <h3 className="font-bold">{gearItem.manufacturer}</h3>
                          <h3>{gearItem.model}</h3>
                        </div>
                      </div>
                    </Link>
                    {list && (
                      <button className="my-3 font-bold">Add Item</button>
                    )}
                  </div>
                )
              })}
              {fetchingMore && <GearListSkeleton length={4} />}
            </div>
            {/* Empty div at end of list to trigger fetchMore */}
            <div ref={inViewRef}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GearBrowser
