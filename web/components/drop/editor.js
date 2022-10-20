import DropHeader from "./Header"
import Loading from "../Loading"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import DropDates from "./Dates"
import DropInfo from "./Info"
import DropListsInfo from "./Lists"
import useGetMe from "../../lib/hooks/getMe"

const DropEditor = ({ children, drop }) => {
  const me = useGetMe()
  const [userInDrop, setUserInDrop] = useState(true)
  useEffect(() => {
    if (me && drop) {
      setUserInDrop(drop.users.find((user) => user.id === me.id))
    } else {
      setUserInDrop(true)
    }
  }, [me])
  return (
    <div className="flex h-full min-h-screen">
      <div className="w-full pt-16 text-center md:mx-3 md:pt-6">
        <form>
          <DropHeader drop={drop} userInDrop={userInDrop} />
          {drop && (
            <div className="flex">
              <div className="m-auto text-center">
                <div className="mx-4 mt-10 max-w-[60rem] md:mx-0">
                  <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
                    <DropDates drop={drop} userInDrop={userInDrop} />
                    <DropInfo drop={drop} userInDrop={userInDrop} />
                  </section>
                  <h2 className="py-5 text-xl font-semibold">Lists</h2>
                  <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-16">
                    <DropListsInfo />
                  </section>
                </div>
              </div>
            </div>
          )}
          {children}
        </form>
      </div>
    </div>
  )
}
export default DropEditor
