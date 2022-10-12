import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ME } from "../apollo/queries"

const useGetMe = () => {
  const { data, loading } = useQuery(ME)
  const [me, setMe] = useState(null)
  useEffect(() => {
    if (!loading) {
      setMe(data.me)
    }
  }, [data])
  return me
}

export default useGetMe
