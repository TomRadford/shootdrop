import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { ADD_LIST, GET_LIST_ITEMS } from "../../lib/apollo/queries"
import { AddButton } from "../AddCard"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Card from "../Card"
import useUserInDrop from "../../lib/hooks/userInDrop"
import useGetMe from "../../lib/hooks/getMe"
import Link from "next/link"
import Image from "next/image"
import { formatDistance } from "date-fns"
const DropListInfo = ({ drop, category, listEntry }) => {
  const router = useRouter()
  const userInDrop = useUserInDrop(drop)
  const [getListItems, { data: itemsData, loading: itemsLoading }] =
    useLazyQuery(GET_LIST_ITEMS, { fetchPolicy: "network-only" })
  const me = useGetMe()
  const [addList, { data, loading, error }] = useMutation(ADD_LIST)
  const handleAdd = (e) => {
    e.preventDefault()
    addList({
      variables: {
        category,
        drop: drop.id,
      },
    })
  }
  useEffect(() => {
    if (listEntry) {
      getListItems({ variables: { list: listEntry.id } })
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (data) {
    router.push(`/list/${data.addList.id}`)
  }

  return (
    <>
      {listEntry ? (
        <Link href={`/list/${listEntry.id}`}>
          <a>
            <div className="mx-auto w-80 sm:w-96">
              <Card>
                <div className="pb-13 flex flex-col gap-1 px-4 py-2 ">
                  <h3 className="text-md text-left font-semibold">
                    {`${category[0]}${category.slice(1).toLowerCase()}`}
                  </h3>
                  <p className="text-left text-sm font-light text-gray-300">
                    {listEntry.comment}
                  </p>
                  {itemsLoading ? (
                    <div className="flex -space-x-3 md:-space-x-2">
                      {[...new Array(5)].map((a, i) => (
                        <div
                          key={i}
                          className="z-10 flex h-[30px] w-[30px] animate-pulse items-center justify-center rounded-full bg-gray-800 text-[10px]"
                        ></div>
                      ))}
                    </div>
                  ) : itemsData && itemsData.getListItems.totalDocs === 0 ? (
                    <p className="mb-2 text-left text-sm font-light text-gray-300">
                      No items yet
                    </p>
                  ) : (
                    itemsData && (
                      <div className="flex -space-x-3 md:-space-x-2">
                        {itemsData.getListItems.gearListItems.map(
                          (listItem, i) => {
                            if (i < 12) {
                              return (
                                <Image
                                  alt={listItem.gearItem.model}
                                  src={
                                    listItem.gearItem.images[0]
                                      ? listItem.gearItem.images[0].url
                                      : `/img/default_gear.jpg`
                                  }
                                  width="30px"
                                  height="30px"
                                  objectFit="cover"
                                  className="rounded-full"
                                  key={listItem.id}
                                />
                              )
                            } else {
                              if (i === 12) {
                                return (
                                  <div
                                    key={listItem.id} //ToDo: double check this works okay on rerenders
                                    className="z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-800 text-[10px]"
                                  >
                                    +{itemsData.getListItems.totalDocs - 8}
                                  </div>
                                )
                              }
                            }
                          }
                        )}
                      </div>
                    )
                  )}
                  <p className="text-right text-[8px] font-light">
                    Last edited{" "}
                    {formatDistance(new Date(listEntry.updatedAt), new Date())}{" "}
                    ago
                  </p>
                </div>
              </Card>
            </div>
          </a>
        </Link>
      ) : userInDrop && me ? (
        <AddButton title={category} onClick={handleAdd} />
      ) : null}
    </>
  )
}

export default DropListInfo
