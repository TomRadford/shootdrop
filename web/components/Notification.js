import { useEffect, useState } from "react"

const Notification = ({ messageData, setMessageData }) => {
  useEffect(() => {
    if (messageData.message) {
      const timeout = setTimeout(() => {
        setMessageData({ message: "", type: "" })
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [])

  return (
    <p className={messageData.type === "error" ? "text-red-600" : "text-white"}>
      {messageData.message}
    </p>
  )
}
export default Notification
