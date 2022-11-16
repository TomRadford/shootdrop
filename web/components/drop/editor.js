import DropHeader from "./Header"
import Loading from "../Loading"
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import DropDates from "./Dates"
import DropInfo from "./Info"
import DropListInfo from "./List"
import useGetMe from "../../lib/hooks/getMe"
import useUserInDrop from "../../lib/hooks/userInDrop"

const DropEditor = ({ children, drop }) => {
  const userInDrop = useUserInDrop(drop)

  return (
    <div className="flex h-full min-h-screen">
      <div className="mb-10 w-full pt-16 text-center md:mx-3 md:pt-6">
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
                    <DropListInfo
                      dropId={drop.id}
                      listEntry={
                        drop.lists.filter(
                          (list) => list.category === "CAMERA"
                        )[0]
                      }
                      category="CAMERA"
                    />
                    <DropListInfo
                      dropId={drop.id}
                      listEntry={
                        drop.lists.filter(
                          (list) => list.category === "SOUND"
                        )[0]
                      }
                      category="SOUND"
                    />
                    <DropListInfo
                      dropId={drop.id}
                      listEntry={
                        drop.lists.filter(
                          (list) => list.category === "LIGHTING"
                        )[0]
                      }
                      category="LIGHTING"
                    />
                    <DropListInfo
                      dropId={drop.id}
                      listEntry={
                        drop.lists.filter(
                          (list) => list.category === "GRIPS"
                        )[0]
                      }
                      category="GRIPS"
                    />
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
