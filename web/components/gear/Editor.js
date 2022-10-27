import useGetMe from "../../lib/hooks/getMe"
import GearDescription from "./Description"
import GearHeader from "./Header"
const GearEditor = ({ children, gearItem }) => {
  const me = useGetMe()

  return (
    <div className="flex h-full min-h-screen">
      <div className="w-full pt-16 text-center md:mx-3 md:pt-6">
        <form>
          <GearHeader gearItem={gearItem} />
          {gearItem && (
            <div className="flex">
              <div className="m-auto text-center">
                <div className="w-full">
                  <div className="w-full">
                    <GearDescription />
                  </div>
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

export default GearEditor
