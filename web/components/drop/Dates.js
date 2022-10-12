import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { UPDATE_DROP } from "../../lib/apollo/queries"
import useGetMe from "../../lib/hooks/getMe"
import Card from "../Card"
import DatePickerTailwind from "../elements/DatePicker"

const DateOption = ({ label, date, setDate, dropDate }) => {
  const me = useGetMe()
  return (
    <div className="flex justify-between">
      <p className="text-left font-light text-gray-300">{label}</p>
      <div>
        {date ? (
          <DatePickerTailwind
            date={date}
            setDate={setDate}
            startOpen={!dropDate}
            disabled={!me}
          />
        ) : (
          <button
            onClick={(e) => {
              me ? setDate(new Date()) : e.preventDefault()
            }}
            className={`text-lg ${!me && `cursor-default`}`}
          >
            {me ? "Click to add" : "Login to add"}
          </button>
        )}
      </div>
    </div>
  )
}

const DropDates = ({ drop }) => {
  const [gearCheckDate, setGearCheckDate] = useState(
    drop.gearCheckDate ? new Date(drop.gearCheckDate) : null
  )
  const [startDate, setStartDate] = useState(
    drop.startDate ? new Date(drop.startDate) : null
  )
  const [endDate, setEndDate] = useState(
    drop.endDate ? new Date(drop.endDate) : null
  )
  const [wrapDate, setWrapDate] = useState(
    drop.wrapDate ? new Date(drop.wrapDate) : null
  )
  const [updateDrop, updateDropResult] = useMutation(UPDATE_DROP)

  const compareDate = (dropDate, date) => {
    if (!date) return false
    return new Date(dropDate).getTime() !== date.getTime()
  }

  useEffect(() => {
    if (
      compareDate(drop.gearCheckDate, gearCheckDate) ||
      compareDate(drop.startDate, startDate) ||
      compareDate(drop.endDate, endDate) ||
      compareDate(drop.wrapDate, wrapDate)
    ) {
      const timeout = setTimeout(() => {
        console.log("Updating dates")

        updateDrop({
          variables: {
            id: drop.id,
            gearCheckDate: gearCheckDate ? gearCheckDate.getTime() : null,
            startDate: startDate ? startDate.getTime() : null,
            endDate: endDate ? endDate.getTime() : null,
            wrapDate: wrapDate ? wrapDate.getTime() : null,
          },
        })
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [gearCheckDate, startDate, endDate, wrapDate])

  return (
    <div className="w-96">
      <Card>
        <div className="flex flex-col gap-4 py-2 px-4">
          <h3 className="pb-1 text-left text-xl">Dates</h3>

          <DateOption
            label="Gear Check"
            date={gearCheckDate}
            setDate={setGearCheckDate}
            dropDate={drop.gearCheckDate}
          />
          <DateOption
            label="Shoot Start"
            date={startDate}
            setDate={setStartDate}
            dropDate={drop.startDate}
          />
          <DateOption
            label="Shoot End"
            date={endDate}
            setDate={setEndDate}
            dropDate={drop.endDate}
          />
          <DateOption
            label="Gear Wrap"
            date={wrapDate}
            setDate={setWrapDate}
            dropDate={drop.wrapDate}
          />
        </div>
      </Card>
    </div>
  )
}
export default DropDates
