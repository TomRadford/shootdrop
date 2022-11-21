import { useMutation, useQuery } from "@apollo/client"
import { ADD_LIST, GET_LIST_ITEMS } from "../../lib/apollo/queries"
import { AddButton } from "../AddCard"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Card from "../Card"
import useUserInDrop from "../../lib/hooks/userInDrop"
import useGetMe from "../../lib/hooks/getMe"
import Link from "next/link"

const DropListInfo = ({ drop, category, listEntry }) => {
  const router = useRouter()
  const userInDrop = useUserInDrop(drop)
  const getListItems = useQuery(GET_LIST_ITEMS, {
    variables: { id: listEntry.id },
  })
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
        <Link href={`/list/${listEntry.id}`}>
          <a>
            <div className="mx-auto w-80 sm:w-96">
              <Card>
                <div className="pb-13 flex flex-col gap-2 px-4 py-2 pb-[3.2rem]">
                  <h3 className="text-md text-left font-semibold">
                    {`${category[0]}${category.slice(1).toLowerCase()}`}
                  </h3>
                  <p className="text-left text-sm font-light text-gray-300">
                    {listEntry.comment}
                  </p>
                </div>
              </Card>
            </div>
          </a>
        </Link>
      ) : userInDrop && me ? (
        <AddButton title={category} onClick={handleAdd} />
      ) : null}
    </>
  )
}

export default DropListInfo
