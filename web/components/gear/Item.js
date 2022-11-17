import Link from "next/link"
import Image from "next/image"
import ItemQuantity from "../list/ItemQuantity"
import useUserInDrop from "../../lib/hooks/userInDrop"
import ItemComment from "../list/ItemComment"
import ItemPreference from "../list/ItemPreference"
const whitePixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="

const GearItem = ({ data, listToAdd, list }) => {
  const gearItem = list ? data.gearItem : data
  const userInDrop = list ? useUserInDrop(list.drop) : false
  console.log(data)
  return (
    <div className="h-full overflow-hidden rounded-xl bg-black bg-opacity-30 shadow-xl">
      <Link href={`/gear/${gearItem.id}`}>
        {/* ToDo: Consider target blank to open new tab
				Disadvantage would be reloading app in new tab
*/}
        <a>
          <div className="relative -mb-2 hover:cursor-pointer">
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
        </a>
      </Link>
      {listToAdd && <button className="my-3 font-bold">Add Item</button>}
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
        </div>
      )}
    </div>
  )
}

export default GearItem
