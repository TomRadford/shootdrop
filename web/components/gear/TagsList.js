import useGetMe from "../../lib/hooks/getMe"
import { useEffect, useState } from "react"
import Card from "../Card"
import { useMutation, useQuery } from "@apollo/client"
import { EDIT_GEAR_ITEM, ALL_TAGS } from "../../lib/apollo/queries"
import { useGearQueryParams } from "../../lib/hooks/queryParams"

// Takes either GearItem (GearEditor) or setQuery & query (GearBrowser)
const GearTags = ({ gearItem, setTagsModalOpen }) => {
  const me = useGetMe()
  const [query, setQuery] = useGearQueryParams()

  const {
    data: allTagsData,
    loading: allTagsLoading,
    refetch: refetchTags,
  } = useQuery(ALL_TAGS, {
    variables: { tags: query.tags ? query.tags : [] },
  })

  const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
  let tags = []
  if (gearItem) {
    tags = gearItem.tags
  } else {
    //Get tag names from query.tags id's
    if (allTagsData) {
      tags = [...allTagsData.allTags]
    }
  }
  // console.log(query)

  return (
    <div className="flex flex-col gap-1 px-4 pb-4">
      <span className="mb-2 flex items-end gap-2">
        <h3 className="text-left text-base font-semibold">Tags</h3>
        {(me || !gearItem) && (
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
                        (filterTag) => filterTag !== tag.id
                      ),
                    })
              }}
              disabled={!me && gearItem}
              className={`flex items-center rounded bg-teal-600 px-2 py-1 text-sm transition-colors duration-300 ${
                (me || !gearItem) && `hover:bg-red-500`
              }`}
              key={tag.id}
            >
              <div>{tag.name}</div>
            </button>
          </div>
        ))}
        {(me || !gearItem) && (
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
  )
}

export default GearTags
