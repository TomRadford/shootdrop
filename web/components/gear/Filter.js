import { useEffect, useState } from "react"
import GearTags from "./TagsList"
import { useGearQueryParams } from "../../lib/hooks/queryParams"

// Debounced query params used for search state
const GearFilter = ({ setRefetching, refetch }) => {
  const [query, setQuery] = useGearQueryParams()
  // const [refetchGearData, ] = useLazyQuery(ALL_GEAR_ITEMS, { variables: query })
  const [debouncedManufacturer, setDebouncedManufacturer] = useState("")
  const [debouncedModel, setDebouncedModel] = useState("")

  //set debouce values on history navigate / page load
  useEffect(() => {
    if (query.manufacturer !== undefined) {
      setDebouncedManufacturer(query.manufacturer)
    }
    if (query.model !== undefined) {
      setDebouncedModel(query.model)
    }
    // refetch(query) happening in browser
  }, [query])
  // console.log(query)
  useEffect(() => {
    if (
      query.manufacturer !== debouncedManufacturer ||
      query.model !== debouncedModel
    ) {
      console.log("updating query params")
      setRefetching(true)
      let newParams = {}
      if (debouncedManufacturer.length > 0) {
        newParams.manufacturer = debouncedManufacturer
      }
      if (debouncedModel.length > 0) {
        newParams.model = debouncedModel
      }
      //prevent any tags from being reset
      newParams.tags = query.tags

      // console.log(newParams)
      const timeout = setTimeout(() => {
        //resets previous values with push over default pushIn
        setQuery(newParams, "push")
      }, 1200)
      return () => clearTimeout(timeout)
    }
  }, [debouncedModel, debouncedManufacturer])

  return (
    <form className="flex w-full flex-wrap items-center justify-center gap-8 bg-gradient-to-b from-[#121212] to-transparent pb-8 pt-16 md:pt-8">
      <div className="flex flex-col gap-1">
        <input
          placeholder="Manufacturer"
          type="search"
          className=" bg-gray-800 bg-opacity-40 py-1 px-2"
          value={debouncedManufacturer}
          onChange={({ target }) => setDebouncedManufacturer(target.value)}
        />
        <input
          placeholder="Model"
          type="search"
          className=" bg-gray-800 bg-opacity-40 py-1 px-2"
          value={debouncedModel}
          onChange={({ target }) => setDebouncedModel(target.value)}
        />
      </div>
      <div className="w-64 lg:w-96">
        <div className="rounded-3xl bg-gray-800 bg-opacity-40 py-4 px-4">
          <GearTags />
        </div>
      </div>
    </form>
  )
}

export default GearFilter
