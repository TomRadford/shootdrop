import { useMutation } from "@apollo/client"
import { EDIT_LIST_ITEM } from "../../lib/apollo/queries"
import TextareaAutosize from "react-textarea-autosize"
import { useState, useEffect } from "react"
import useGetMe from "../../lib/hooks/getMe"

const ItemComment = ({ listId, gearListItem, userInDrop }) => {
  const me = useGetMe()
  const [editListItem, { data, loading, error }] = useMutation(EDIT_LIST_ITEM)
  const [comment, setComment] = useState(
    gearListItem.comment ? gearListItem.comment : ""
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (comment !== gearListItem.comment) {
        console.log("updating comment")
        editListItem({
          variables: {
            list: listId,
            id: gearListItem.id,
            comment: comment,
          },
        })
      }
    }, 1000)
    return () => clearTimeout(timeout)
  }, [comment])

  return (
    <div className="mt-1">
      {userInDrop || comment.length !== 0 ? (
        <TextareaAutosize
          name="Comment"
          className="w-full resize-none whitespace-pre-wrap bg-transparent text-left text-sm font-light text-gray-200 md:text-sm"
          placeholder="Add comment"
          autoComplete="off"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          disabled={!me || !userInDrop}
        />
      ) : null}
    </div>
  )
}

export default ItemComment
