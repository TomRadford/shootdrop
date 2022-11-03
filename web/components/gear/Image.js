import Image from "next/image"
import { useState } from "react"
import Card from "../Card"
const GearImage = ({ gearImage, alt }) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="first:ml-2">
      {!loaded && (
        <div className="animate-pulse rounded-lg  bg-slate-500 shadow-lg">
          <div className="flex h-72 w-72 items-center justify-center md:h-80 md:w-80 xl:h-96 xl:w-96"></div>
        </div>
      )}
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
