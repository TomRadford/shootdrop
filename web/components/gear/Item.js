import Link from "next/link"
import Image from "next/image"
import ItemQuantity from "../list/ItemQuantity"
import useUserInDrop from "../../lib/hooks/userInDrop"
import ItemComment from "../list/ItemComment"
import ItemPreference from "../list/ItemPreference"
import { formatDistance } from "date-fns"
import ItemRemove from "../list/ItemRemove"
import { useMutation } from "@apollo/client"
import { ADD_LIST_ITEM, GET_LIST_ITEMS } from "../../lib/apollo/queries"
import useListItemStore from "../../lib/hooks/store/listItem"
import { useEffect } from "react"
const whitePixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="

const GearItem = ({ data, listToAdd, list }) => {
  const gearItem = list ? data.gearItem : data
  const userInDrop = useUserInDrop(list ? list.drop : undefined)
  const listItem = useListItemStore((state) => state.listItem)
  const setListItem = useListItemStore((state) => state.setListItem)
  const [
    addListItem,
    {
      data: addListItemData,
      loading: addListItemLoading,
      error: addListItemError,
    },
  ] = useMutation(ADD_LIST_ITEM, {
    update: (cache, response) => {
      // ToDo: update gearListItems using cache,
      //currently using cache-and-network fetch policy due to
      // not being able to merge dupes (quantity > 1) on client
      // cache.updateQuery(
      //   {
      //     query: GET_LIST_ITEMS,
      //     variables: { list: listToAdd.id },
      //   },
      //   ({ getListItems }) => {
      //     return {
      //       getListItems: {
      //         totalDocs: getListItems.totalDocs + 1,
      //         gearListItems: getListItems.gearListItems.concat(
      //           response.data.addListItem
      //         ),
      //       },
      //     }
      //   }
      // )
    },
  })
  // ToDo: cache update

  const handleAddListItem = (e) => {
    e.preventDefault()
    //Adds new GearListItem then opens ListItem modal to edit prefs
    addListItem({ variables: { list: listToAdd.id, gearItem: gearItem.id } })
  }

  useEffect(() => {
    if (addListItemData) {
      setListItem(addListItemData.addListItem)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addListItemData])

  return (
    <div
      // Double overflow on parent and child for
      className={`relative h-full rounded-xl bg-black bg-opacity-30 shadow-xl ${
        list || listToAdd ? `` : "overflow-hidden"
      }`}
    >
      {userInDrop && <ItemRemove list={list} gearListItemId={data.id} />}
      <Link href={`/gear/${gearItem.id}`}>
        {/* ToDo: Consider target blank to open new tab
				Disadvantage would be reloading app in new tab
*/}
        <a>
          <div className="relative -mb-2 overflow-hidden rounded-2xl hover:cursor-pointer">
            {gearItem.images.length > 0 ? (
              <>
                <Image
                  src={gearItem.images[0].url}
                  width="300px"
                  height="330px"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={whitePixel}
                  alt={gearItem.model}
                />
              </>
            ) : (
              <Image
                src={`/img/default_gear.jpg`}
                width="300px"
                height="330px"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={whitePixel}
                alt={gearItem.model}
              />
            )}
            <div className="absolute bottom-[6px] flex w-full flex-col bg-gradient-to-t from-[#000000b9] to-transparent px-3 pb-2 pt-12 text-left ">
              <h3 className="font-bold">{gearItem.manufacturer}</h3>
              <h3>{gearItem.model}</h3>
            </div>
          </div>
        </a>
      </Link>
      {listToAdd && (
        <button className="my-3 font-bold" onClick={handleAddListItem}>
          Add Item
        </button>
      )}
      {list && (
        <div className="mx-4 my-2 flex flex-col ">
          <ItemQuantity
            listId={list.id}
            gearListItem={data}
            userInDrop={userInDrop}
          />
          <ItemComment
            listId={list.id}
            gearListItem={data}
            userInDrop={userInDrop}
          />
          <ItemPreference
            listId={list.id}
            gearListItem={data}
            userInDrop={userInDrop}
          />
          <div className="my-2 flex items-center justify-end gap-2 text-[0.6rem] text-gray-300">
            <p className="font-light">
              Last updated{" "}
              <span className="font-semibold">
                {formatDistance(new Date(data.updatedAt), new Date())} ago
              </span>
            </p>
            <div className="group relative">
              <Image
                className="rounded-full"
                src={
                  data.userThatUpdated.profilePicture
                    ? data.userThatUpdated.profilePicture
                    : "/img/default_user.png"
                }
                height="20px"
                width="20px"
                alt={data.userThatUpdated.fullName}
              />
              <div className="absolute top-7 -left-3 z-10 rounded-md bg-black bg-opacity-70 p-1 opacity-0 transition-opacity  group-hover:opacity-100">
                {data.userThatUpdated.fullName}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GearItem
