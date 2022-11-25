import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { EDIT_LIST_ITEM } from "../../lib/apollo/queries"

const ItemQuantity = ({ listId, gearListItem, userInDrop }) => {
  const [editListItem, { data, loading, error }] = useMutation(EDIT_LIST_ITEM)
  const [quantityInput, setQuantityInput] = useState(gearListItem.quantity)

  useEffect(() => {
    if (quantityInput !== gearListItem.quantity) {
      console.log("updating quantity")
      editListItem({
        variables: {
          list: listId,
          id: gearListItem.id,
          quantity: quantityInput,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantityInput])

  return (
    <div className="flex gap-2 text-sm">
      <span className="font-light">QTY:</span>
      <span className="w-3 font-semibold">{quantityInput}</span>
      {userInDrop && (
        <div className="flex gap-1 rounded-md bg-black bg-opacity-50 px-2">
          <button
            className="pr-1"
            disabled={quantityInput <= 1}
            onClick={() => setQuantityInput(quantityInput - 1)}
          >
            -
          </button>
          <button
            className="pl-1"
            onClick={() => setQuantityInput(quantityInput + 1)}
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}
export default ItemQuantity
