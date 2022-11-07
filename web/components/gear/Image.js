import { useState } from "react"
import { useMutation } from "@apollo/client"
import { REMOVE_GEAR_IMAGE, ALL_GEAR_ITEMS } from "../../lib/apollo/queries"
import useGetMe from "../../lib/hooks/getMe"
const GearImage = ({ gearImage, alt, gearItemId }) => {
  const me = useGetMe()
  const [removeGearImage, removeGearImageResult] = useMutation(
    REMOVE_GEAR_IMAGE,
    {
      update: (cache, response) => {
        cache.updateQuery(
          { query: ALL_GEAR_ITEMS, variables: { id: gearItemId } },
          ({ allGearItems }) => {
            return {
              allGearItems: [
                {
                  ...allGearItems[0],
                  images: allGearItems[0].images.filter(
                    (image) => image.id !== response.data.removeGearImage
                  ),
                },
              ],
            }
          }
        )
      },
    }
  )
  const [loaded, setLoaded] = useState(false)
  const handleRemove = (e) => {
    e.preventDefault()
    removeGearImage({
      variables: {
        id: gearImage.id,
        gearItem: gearItemId,
      },
    })
  }
  return (
    <div className="relative first:ml-2">
      {!loaded && (
        <div className="animate-pulse rounded-lg  bg-slate-500 shadow-lg">
          <div className="flex h-72 w-72 items-center justify-center md:h-80 md:w-80 xl:h-96 xl:w-96"></div>
        </div>
      )}
      <div
        style={loaded ? { display: "block" } : { display: "none" }}
        className="min-w-[300px]"
      >
        {me && (
          <button
            onClick={handleRemove}
            className="absolute right-4 top-1 md:right-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#676767"
              className="h-6 w-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
        <img
          className="h-72 rounded-lg object-cover md:h-80 xl:h-96"
          alt={alt}
          onLoad={() => setLoaded(true)}
          src={gearImage.url}
        />
      </div>
    </div>
  )
}

export default GearImage
