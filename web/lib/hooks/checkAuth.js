import { useEffect } from "react"
import { ME } from "../../lib/apollo/queries"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"

const useCheckAuth = () => {
  const me = useQuery(ME)
  const router = useRouter()
  useEffect(() => {
    if (!me.loading) {
      if (!me.data.me) {
        router.push("/login")
      }
    }
  }, [me.data])
}

export default useCheckAuth
