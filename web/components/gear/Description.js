import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import useGetMe from "../../lib/hooks/getMe"
import { useMutation } from "@apollo/client"
import { EDIT_GEAR_ITEM } from "../../lib/apollo/queries"
import { useEffect } from "react"
import { UPDATE_TIMEOUT } from "../../lib/config"

const GearDescription = ({ gearItem }) => {
  const [description, setDescription] = useState(
    gearItem ? (gearItem.description ? gearItem.description : "") : ""
  )
  const me = useGetMe()
  const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
  useEffect(() => {
    //If !gearItem.description, only update to description/"" if logged in
    if (gearItem.description !== description) {
      const timeout = setTimeout(() => {
        console.log("updating description")
        editGearItem({
          variables: {
            id: gearItem.id,
            description,
          },
        })
      }, UPDATE_TIMEOUT)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description])

  return (
    <div className="mx-auto w-80 sm:w-96">
      <TextareaAutosize
        name="Model"
        className="w-full resize-none whitespace-pre-wrap bg-transparent text-left text-sm font-light text-gray-200 md:text-sm"
        placeholder="Short description of this gear item, ideally from the manufacturer or a reputable website."
        autoComplete="off"
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        disabled={!me}
      />
    </div>
  )
}

export default GearDescription
