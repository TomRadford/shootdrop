import useGetMe from "../../lib/hooks/getMe"
import { useState } from "react"
import Card from "../Card"
import { useMutation } from "@apollo/client"
import { EDIT_GEAR_ITEM } from "../../lib/apollo/queries"

const GearTags = ({ gearItem, setTagsModalOpen }) => {
  const me = useGetMe()
  const { tags } = gearItem
  const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
  return (
    <div className="mx-auto w-80 sm:w-96">
      <Card>
        <div className="flex flex-col gap-1 px-4 pb-4">
          <span className="mb-2 flex items-end gap-2">
            <h3 className="text-left text-base">Tags</h3>
            {me && (
              <p className="text-xs font-light text-gray-300">tap to remove</p>
            )}
          </span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag.id}>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    editGearItem({
                      variables: {
                        id: gearItem.id,
                        tags: gearItem.tags
                          .filter((itemTag) => itemTag.id !== tag.id)
                          .map((tag) => tag.name),
                      },
                    })
                  }}
                  disabled={!me}
                  className={`flex items-center rounded bg-teal-600 px-2 py-1 text-sm transition-colors duration-300 ${
                    me && `hover:bg-red-500`
                  }`}
                  key={tag.id}
                >
                  <div>{tag.name}</div>
                </button>
              </div>
            ))}
            {me && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setTagsModalOpen(true)
                }}
                className="flex items-center rounded bg-teal-600 px-2 py-1 text-sm "
              >
                <div>+</div>
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default GearTags
