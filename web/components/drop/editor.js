import DropHeader from "./Header"
import Loading from "../Loading"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import DropDates from "./Dates"

const DropEditor = ({ children, drop }) => {
  return (
    <div className="flex h-screen ">
      <div className="w-full pt-16 text-center md:mx-3 md:pt-6 lg:mx-20">
        <form>
          <DropHeader drop={drop} />
          {drop && (
            <section className="mx-4 mt-10">
              <DropDates drop={drop} />
            </section>
          )}
          {children}
        </form>
      </div>
    </div>
  )
}
export default DropEditor
