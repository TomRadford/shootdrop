import { useState } from "react"
import { useMutation } from "@apollo/client"
import { REMOVE_GEAR_IMAGE } from "../../lib/apollo/queries"
const GearImage = ({ gearImage, alt, gearItemId }) => {
  const [removeGearImage, removeGearImageResult] =
    useMutation(REMOVE_GEAR_IMAGE)
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
    <div className="first:ml-2">
      {!loaded && (
        <div className="animate-pulse rounded-lg  bg-slate-500 shadow-lg">
          <div className="flex h-72 w-72 items-center justify-center md:h-80 md:w-80 xl:h-96 xl:w-96"></div>
        </div>
      )}
      <button onClick={handleRemove}>x</button>
      <img
        className="h-72 max-w-min rounded-lg md:h-80 xl:h-96"
        style={loaded ? { display: "block" } : { display: "none" }}
        alt={alt}
        onLoad={() => setLoaded(true)}
        src={gearImage.url}
      />
    </div>
  )
}

export default GearImage
