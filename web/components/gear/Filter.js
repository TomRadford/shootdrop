import { UPDATE_TIMEOUT } from "../../lib/config"
import { useLazyQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const GearFilter = ({ setRefetching }) => {
  const router = useRouter()

  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")

  const removeParam = (param) => {
    delete router.query[param]
    router.push({
      query: {
        ...router.query,
      },
    })
  }

  // useEffect(() => {
  //   if (router.query.manufacturer !== undefined && manufacturer === "") {
  //   }
  // }, [router.query])

  // console.log(manufacturer)
  // console.log(model)
  console.log(router.query)

  //working:
  // useEffect(() => {
  //   if (
  //     manufacturer !== router.query.manufacturer ||
  //     model !== router.query.model
  //   ) {
  //     console.log("updating query params")
  //     setRefetching(true)
  //     let newParams = {}
  //     manufacturer.length > 0
  //       ? (newParams.manufacturer = manufacturer)
  //       : removeParam("manufacturer")
  //     model.length > 0 ? (newParams.model = model) : removeParam("model")
  //     const timeout = setTimeout(() => {
  //       router.push({
  //         query: {
  //           ...router.query,
  //           ...newParams,
  //         },
  //       })
  //       setRefetching(false)
  //     }, 1000)
  //     return () => clearTimeout(timeout)
  //   }
  // }, [manufacturer, model])

  // useEffect(() => {
  //   if (model.length === 0) {
  //     removeParam("model")
  //   } else {
  //     if (model !== router.query.model) {
  //       const timeout = setTimeout(() => {
  //         router.push({
  //           query: { ...router.query, model },
  //         })
  //       }, UPDATE_TIMEOUT)
  //       return () => clearTimeout(timeout)
  //     }
  //   }
  // }, [model])

  return (
    <div className="flex w-full flex-wrap justify-center bg-gradient-to-b from-[#121212] to-transparent pb-8 pt-16 md:pt-8">
      <form className="flex flex-col gap-1">
        <input
          placeholder="Manufacturer"
          type="search"
          className=" bg-gray-800 bg-opacity-40 py-1 px-2"
          value={manufacturer}
          onChange={({ target }) => setManufacturer(target.value)}
        />
        <input
          placeholder="Model"
          type="search"
          className=" bg-gray-800 bg-opacity-40 py-1 px-2"
          value={model}
          onChange={({ target }) => setModel(target.value)}
        />
      </form>
    </div>
  )
}

export default GearFilter
