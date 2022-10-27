import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import useGetMe from "../../lib/hooks/getMe"

const GearDescription = () => {
  const [description, setDescription] = useState("")
  const me = useGetMe()
  return (
    <TextareaAutosize
      name="Model"
      className=" resize-none whitespace-pre-wrap bg-transparent text-left text-sm font-medium md:text-sm"
      placeholder="Short description of this gear item, ideally from the manufacturer or reputable website."
      autoComplete="off"
      data-gramm="false"
      data-gramm_editor="false"
      data-enable-grammarly="false"
      value={description}
      onChange={({ target }) => setDescription(target.value)}
      disabled={!me}
    />
  )
}

export default GearDescription
