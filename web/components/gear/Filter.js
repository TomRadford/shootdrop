import { useEffect, useState } from "react"
import GearTags from "./TagsList"
import { useGearQueryParams } from "../../lib/hooks/queryParams"
import { Listbox } from "@headlessui/react"
// Debounced query params used for search state
const GearFilter = ({ setRefetching, refetch, setTagsModalOpen }) => {
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
    // refetch(query) happening in GearBrowser
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
      //prevent any tags / category from being reset
      newParams.tags = query.tags
      newParams.category = query.category
      const timeout = setTimeout(() => {
        //resets previous values with push over default pushIn
        setQuery(newParams, "push")
      }, 1200)
      return () => clearTimeout(timeout)
    }
  }, [debouncedModel, debouncedManufacturer])
  // console.log(query.category)

  const handleCategoryChange = (e, newCategory) => {
    e.preventDefault()
    console.log(newCategory)
    if (newCategory === "All categories") {
      setQuery({
        category: null,
      })
    } else {
      setQuery({
        category: newCategory.toUpperCase(),
      })
    }
  }

  return (
    <form className="flex w-full flex-wrap items-center justify-center gap-8 bg-gradient-to-b from-[#121212] to-transparent pb-8 pt-16 md:pt-8">
      <div className="flex flex-col gap-1 px-3 xl:flex-row">
        <div className="relative z-40 mb-14 flex w-full justify-center sm:justify-start xl:mr-40">
          <div className="group absolute rounded-xl bg-[#191f29]">
            <div className="w-32 cursor-pointer py-1 px-2 ">
              {query.category ? query.category : `All categories`}
            </div>
            <div className="hidden flex-col justify-center gap-1  group-hover:flex">
              {["All categories", "Camera", "Grips", "Lighting", "Sound"].map(
                (categoryOption) =>
                  query.category
                    ? categoryOption.toUpperCase() !== query.category && (
                        <button
                          key={categoryOption}
                          className="border-t-[1px] border-gray-400 px-2"
                          onClick={(e) =>
                            handleCategoryChange(e, categoryOption)
                          }
                        >
                          {categoryOption}
                        </button>
                      )
                    : categoryOption !== "All categories" && (
                        <button
                          key={categoryOption}
                          className="border-t-[1px] border-gray-400 px-2"
                          onClick={(e) =>
                            handleCategoryChange(e, categoryOption)
                          }
                        >
                          {categoryOption}
                        </button>
                      )
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <input
            placeholder="Manufacturer"
            type="search"
            className=" bg-gray-800 bg-opacity-40 py-1 px-2 xl:w-96"
            value={debouncedManufacturer}
            onChange={({ target }) => setDebouncedManufacturer(target.value)}
          />
          <input
            placeholder="Model"
            type="search"
            className=" bg-gray-800 bg-opacity-40 py-1 px-2 xl:w-96"
            value={debouncedModel}
            onChange={({ target }) => setDebouncedModel(target.value)}
          />
        </div>
      </div>
      <div className="w-64 lg:w-96">
        <div className="rounded-3xl bg-gray-800 bg-opacity-40 py-4 px-4">
          <GearTags setTagsModalOpen={setTagsModalOpen} />
        </div>
      </div>
    </form>
  )
}

export default GearFilter
