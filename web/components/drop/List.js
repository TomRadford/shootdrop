import { useMutation, useQuery } from "@apollo/client"
import { ADD_LIST } from "../../lib/apollo/queries"
import { AddButton } from "../AddCard"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Card from "../Card"
const DropListInfo = ({ dropId, category, listEntry }) => {
  const router = useRouter()
  const [addList, { data, loading, error }] = useMutation(ADD_LIST)
  const handleAdd = (e) => {
    e.preventDefault()
    addList({
      variables: {
        category,
        drop: dropId,
      },
    })
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      router.push(`/list/${data.addList.id}`)
    }
  }, [data])

  return (
    <>
      {listEntry ? (
        <div className="mx-auto w-80 sm:w-96">
          <Card>
            <div className="pb-13 flex flex-col gap-4 px-4 py-2 pb-[3.2rem]">
              <h3 className="text-md pb-1 text-left font-semibold">
                {`${category[0]}${category.slice(1).toLowerCase()}`}
              </h3>
            </div>
          </Card>
        </div>
      ) : (
        <AddButton title={category} onClick={handleAdd} />
      )}
    </>
  )
}

export default DropListInfo
