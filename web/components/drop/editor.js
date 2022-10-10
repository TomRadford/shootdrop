import DropHeader from "../../components/drop/header"
import Loading from "../../components/Loading"
import { useState } from "react"

const DropEditor = ({ children, drop }) => {
  return (
    <div className="flex h-screen ">
      <div className="w-full pt-16 text-center md:mx-3 md:pt-6 lg:mx-20">
        <form>
          <DropHeader drop={drop} />
          {children}
        </form>
      </div>
    </div>
  )
}
export default DropEditor
