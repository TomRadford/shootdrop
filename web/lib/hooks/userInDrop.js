import { useState, useEffect } from "react"
import useGetMe from "./getMe"

const useUserInDrop = (drop) => {
  const me = useGetMe()
  const [userInDrop, setUserInDrop] = useState(false)
  useEffect(() => {
    if (me && drop) {
      //ToDo: evaluate if boolean return is maybe a better fit
      setUserInDrop(drop.users.find((user) => user.id === me.id))
    } else {
      setUserInDrop(false)
    }
  }, [me, drop])
  return userInDrop
}

export default useUserInDrop
