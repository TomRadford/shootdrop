import useGetMe from "../../lib/hooks/getMe"

const GearEditor = ({ children, gearItem }) => {
  const me = useGetMe()

  return (
    <div className="flex h-full min-h-screen">
      <div className="w-full pt-16 text-center md:mx-3 md:pt-6">
        <form>
          {children}
        </form>
      </div>
    </div>

  )
}

export default GearEditor