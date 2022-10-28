import useGetMe from "../../lib/hooks/getMe"
import { useState } from "react"
import Card from "../Card"

const GearTags = ({ gearItem, setTagsModalOpen }) => {
  const me = useGetMe()
  const { tags } = gearItem
  return (
    <div className="mx-auto w-80 sm:w-96">
      <Card>
        <div className="flex flex-col gap-1 px-4 pb-4">
          <h3 className="pb-1 text-left text-base">Tags</h3>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <button
                onClick={(e) => {
                  e.preventDefault()
                }}
                disabled={!me}
                className="flex items-center rounded bg-teal-600 px-2 py-1 text-sm "
                key={tag.id}
              >
                <div>{tag.name}</div>
              </button>
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
