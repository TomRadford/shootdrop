import useGetMe from "../../lib/hooks/getMe"
import { useEffect, useState } from "react"
import Card from "../Card"
import { useMutation, useLazyQuery } from "@apollo/client"
import { EDIT_GEAR_ITEM, ALL_TAGS } from "../../lib/apollo/queries"

// Takes either GearItem (GearEditor) or setQuery & query (GearBrowser)
const GearTags = ({ gearItem, setTagsModalOpen, setQuery, query }) => {
  const me = useGetMe()
  const [getTags, tagsResults] = useLazyQuery(ALL_TAGS)
  const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
  let tags = []
  if (gearItem) {
    tags = gearItem.tags
  } else {
    //will get all tags,
    //ToDo: refactor to get just tags in query
  }

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
                    gearItem
                      ? editGearItem({
                          variables: {
                            id: gearItem.id,
                            tags: gearItem.tags
                              .filter((itemTag) => itemTag.id !== tag.id)
                              .map((tag) => tag.name),
                          },
                        })
                      : setQuery({
                          //remove this tag from queryParams
                          tags: query.tags.filter(
                            (filterTag) => filterTag.name !== tag.name
                          ),
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
