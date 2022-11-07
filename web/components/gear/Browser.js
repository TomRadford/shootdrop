import { useQuery } from "@apollo/client"
import { ALL_GEAR_ITEMS } from "../../lib/apollo/queries"
import Image from "next/image"
import Link from "next/link"

const whitePixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="

//GearBrowser to be used on /gear and /list/[id]/add routes
const GearBrowser = ({ list }) => {
  const { data: allGearData, loading: allGearLoading } = useQuery(
    ALL_GEAR_ITEMS,
    //ToDo: update cache on local add / subscriptions
    { fetchPolicy: "network-only" }
  )
  return (
    <div className="flex h-full min-h-screen">
      <div className="mb-10 w-full pt-0 text-center md:mx-0 md:pt-0">
        <div className="w-full bg-gradient-to-b from-[#121212] to-transparent pb-8 pt-16 md:pt-8">
          <h1 className="text-lg font-semibold">filters will go here</h1>
        </div>
        {allGearLoading ? (
          <div className="mx-2 ">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
              {[...Array(20)].map((a, i) => (
                <div
                  key={i}
                  className="h-[330px] w-[300px] animate-pulse overflow-hidden rounded-xl bg-gray-500 shadow-lg"
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-2 ">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
              {allGearData.allGearItems.map((gearItem) => {
                return (
                  <div
                    className="overflow-hidden rounded-xl shadow-lg"
                    key={gearItem.id}
                  >
                    <Link href={`/gear/${gearItem.id}`}>
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
                      <button className="my-3 font-bold">Add Item +</button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GearBrowser
