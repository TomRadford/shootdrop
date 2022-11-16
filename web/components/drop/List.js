import { useMutation, useQuery } from "@apollo/client"
import { ADD_LIST } from "../../lib/apollo/queries"
import { AddButton } from "../AddCard"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Card from "../Card"
import useUserInDrop from "../../lib/hooks/userInDrop"
import useGetMe from "../../lib/hooks/getMe"
const DropListInfo = ({ drop, category, listEntry }) => {
  const router = useRouter()
  const userInDrop = useUserInDrop(drop)
  const me = useGetMe()
  const [addList, { data, loading, error }] = useMutation(ADD_LIST)
  const handleAdd = (e) => {
    e.preventDefault()
    addList({
      variables: {
        category,
        drop: drop.id,
      },
    })
  }

  useEffect(() => {
    if (data) {
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
      ) : userInDrop && me ? (
        <AddButton title={category} onClick={handleAdd} />
      ) : null}
    </>
  )
}

export default DropListInfo
