import Card from "../Card"
const DropListInfo = ({ label, listEntry }) => {
  return (
    <div className="w-96">
      <Card>
        <div className="pb-13 flex flex-col gap-4 px-4 py-2 pb-[3.2rem]">
          <h3 className="pb-1 text-left text-xl">Type</h3>
        </div>
      </Card>
    </div>
  )
}

export default DropListInfo