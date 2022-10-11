import { useEffect, useState } from "react"

const Notification = ({ messageData, setMessageData }) => {
  const [timeoutId, setTimeoutID] = useState(null)
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setTimeoutID(
      setTimeout(() => {
        setMessageData({ message: "", type: "" })
      }, 2000)
    )
  }, [messageData])

  return (
    <p className={messageData.type === "error" ? "text-red-600" : "text-white"}>
      {messageData.message}
    </p>
  )
}
export default Notification
