import { useEffect, useState } from "react"
import {
  useQueryParams,
  StringParam,
  ArrayParam,
  withDefault,
} from "use-query-params"

// Debounced query params used for search state
const GearFilter = ({ setRefetching, refetch }) => {
  const [query, setQuery] = useQueryParams({
    manufacturer: withDefault(StringParam, ""),
    model: withDefault(StringParam, ""),
  })
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
      console.log(newParams)
      const timeout = setTimeout(() => {
        //resets previous values with push over default pushIn
        setQuery(newParams, "push")
      }, 1200)
      return () => clearTimeout(timeout)
    }
  }, [debouncedModel, debouncedManufacturer])

  return (
    <div className="flex w-full flex-wrap justify-center bg-gradient-to-b from-[#121212] to-transparent pb-8 pt-16 md:pt-8">
      <form className="flex flex-col gap-1">
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
      </form>
    </div>
  )
}

export default GearFilter
