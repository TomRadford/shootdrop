import useGetMe from "../../lib/hooks/getMe"
import GearHeader from "./Header"
const GearEditor = ({ children, gearItem }) => {
  const me = useGetMe()

  return (
    <div className="flex h-full min-h-screen">
      <div className="w-full pt-16 text-center md:mx-3 md:pt-6">
        <form>
          <GearHeader />
          {children}
        </form>
      </div>
    </div>

  )
}

export default GearEditor