import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_GEAR_ITEMS, GET_LIST_ITEMS } from "../../lib/apollo/queries"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import TagsModal from "./TagsModal"
import GearFilter from "./Filter"
import { useGearQueryParams } from "../../lib/hooks/queryParams"
import GearItem from "./Item"

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

const NoResults = () => (
  <h3 className="font-light text-gray-300">No results :(</h3>
)

//GearBrowser to be used on /gear and /list/[id]/add routes

const GearBrowser = ({ listToAdd, list }) => {
  const [query, setQuery] = useGearQueryParams()
  const [fetchingMore, setFetchingMore] = useState(false)
  const [refetching, setRefetching] = useState(false)
  const [tagsModalOpen, setTagsModalOpen] = useState(false)

  const [
    getGear,
    {
      data: allGearData,
      loading: allGearLoading,
      refetch,
      fetchMore: fetchMoreGear,
    },
  ] = useLazyQuery(
    list ? GET_LIST_ITEMS : ALL_GEAR_ITEMS,
    //ToDo: update cache on local/subscription-based gearItem add
    {
      variables: list ? { ...query, list: list.id } : query, //use queryParams to filter & list.id if list
      fetchPolicy: "network-only",
      onCompleted: () => {
        setFetchingMore(false)
        setRefetching(false)
      },
    }
  )

  const {
    ref: inViewRef,
    inView,
    entry,
  } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    //refetch when url query params change from filter
    //getGear not used to prevent issues mismatched queries
    //ToDo: relook at this issue
    refetch()
  }, [query])

  useEffect(() => {
    if (
      inView &&
      (list
        ? allGearData.getListItems.gearListItems.length <
          allGearData.getListItems.totalDocs
        : allGearData.allGearItems.gearItems.length <
          allGearData.allGearItems.totalDocs)
    ) {
      setFetchingMore(true)
      fetchMoreGear({
        variables: {
          offset: list
            ? allGearData.getListItems.gearListItems.length
            : allGearData.allGearItems.gearItems.length,
        },
      })
    }
  }, [inView])

  return (
    <div className="flex h-full min-h-screen">
      <div className="mb-10 w-full pt-0 text-center md:mx-0 md:pt-0">
        <TagsModal
          tagsModalOpen={tagsModalOpen}
          listCategory={list ? list.category : null}
          setTagsModalOpen={setTagsModalOpen}
        />

        <GearFilter
          setRefetching={setRefetching}
          refetch={refetch}
          setTagsModalOpen={setTagsModalOpen}
          list={list}
          listToAdd={listToAdd}
        />

        {allGearLoading || refetching ? (
          <div className="mx-2 ">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
              <GearListSkeleton />
            </div>
          </div>
        ) : (
          <div className="mx-2 ">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4">
              {list ? (
                allGearData &&
                allGearData.getListItems.gearListItems.length > 0 ? (
                  allGearData.getListItems.gearListItems.map((gearListItem) => (
                    <GearItem
                      key={gearListItem.id}
                      data={gearListItem}
                      list={list}
                    />
                  ))
                ) : (
                  <NoResults />
                )
              ) : null}
              {!list ? (
                allGearData && allGearData.allGearItems.gearItems.length > 0 ? (
                  allGearData.allGearItems.gearItems.map((gearItem) => (
                    <GearItem
                      key={gearItem.id}
                      data={gearItem}
                      listToAdd={listToAdd}
                    />
                  ))
                ) : (
                  <>
                    <NoResults />
                  </>
                )
              ) : null}

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
