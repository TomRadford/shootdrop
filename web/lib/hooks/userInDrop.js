import { useState, useEffect } from "react"
import useGetMe from "./getMe"

const useUserInDrop = (drop) => {
  const me = useGetMe()
  const [userInDrop, setUserInDrop] = useState(true)
  useEffect(() => {
    if (me && drop) {
      setUserInDrop(drop.users.find((user) => user.id === me.id))
    } else {
      setUserInDrop(true)
    }
  }, [me])
  return userInDrop
}

export default useUserInDrop
