import { useMutation } from "@apollo/client"
import { GET_LIST_ITEMS, REMOVE_LIST_ITEM } from "../../lib/apollo/queries"

const ItemRemove = ({ list, gearListItemId }) => {
  const [removeListItem, { data, error, loading }] = useMutation(
    REMOVE_LIST_ITEM,
    {
      update: (cache, response) => {
        cache.updateQuery(
          {
            query: GET_LIST_ITEMS,
            variables: { list: list.id },
            overwrite: true, //Ignores merge function defined in client setup
          },
          ({ getListItems }) => {
            return {
              getListItems: {
                totalDocs: getListItems.totalDocs - 1,
                gearListItems: getListItems.gearListItems.filter(
                  (gearListItem) =>
                    gearListItem.id !== response.data.removeListItem
                ),
              },
            }
          }
        )
      },
    }
  )
  const handleRemove = () => {
    removeListItem({
      variables: {
        list: list.id,
        id: gearListItemId,
      },
    })
  }
  return (
    <button
      onClick={handleRemove}
      className="absolute right-1 top-1 z-10 mix-blend-difference"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#ffffff"
        className="h-6 w-6 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  )
}
export default ItemRemove
