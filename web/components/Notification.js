import { useEffect, useState } from "react"

const Notification = ({ message }) => {
  [message, setMessage] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setMessage('')
    }, 1000)
  }, [message])
  return (
    <p>{message}</p>
  )

}