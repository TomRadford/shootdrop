import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import useGetMe from "../../lib/hooks/getMe"
import { useMutation } from "@apollo/client"
import { EDIT_LIST } from "../../lib/apollo/queries"
import { useEffect } from "react"

const ListComment = ({ list }) => {
  console.log(list)
  const [comment, setComment] = useState(
    list ? (list.comment ? list.comment : "") : ""
  )
  const me = useGetMe()
  const [editList, editListResult] = useMutation(EDIT_LIST)
  useEffect(() => {
    //If !gearItem.description, only update to description/"" if logged in
    if (list.comment !== comment) {
      const timeout = setTimeout(() => {
        console.log("updating description")
        editList({
          //Here
          variables: {
            id: list.id,
            comment,
          },
        })
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [comment])

  return (
    <TextareaAutosize
      name="Model"
      className="w-full resize-none whitespace-pre-wrap bg-transparent text-left text-sm font-light text-gray-200 md:text-sm"
      placeholder="Short description of this gear item, ideally from the manufacturer or a reputable website."
      autoComplete="off"
      data-gramm="false"
      data-gramm_editor="false"
      data-enable-grammarly="false"
      value={comment}
      onChange={({ target }) => setComment(target.value)}
      disabled={!me}
    />
  )
}

export default ListComment
