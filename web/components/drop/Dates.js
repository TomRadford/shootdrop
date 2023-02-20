import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { UPDATE_DROP } from '../../lib/apollo/queries'
import { UPDATE_TIMEOUT } from '../../lib/config'
import useGetMe from '../../lib/hooks/getMe'
import Card from '../Card'
import DatePickerTailwind from '../elements/DatePicker'

const DateOption = ({
	label,
	date,
	setDate,
	dropDate,
	userInDrop,
	previousDate,
}) => {
	const me = useGetMe()
	return (
		<div className="flex justify-between">
			<p className="text-left font-light text-gray-300">{label}</p>
			<div>
				{date ? (
					<>
						<DatePickerTailwind
							date={date}
							setDate={setDate}
							startOpen={!dropDate}
							disabled={!me || !userInDrop}
							previousDate={previousDate}
						/>
					</>
				) : (
					<button
						onClick={(e) => {
							const newDate = new Date()
							if (previousDate) {
								newDate.setDate(previousDate.getDate() + 1)
							}
							me ? setDate(newDate) : e.preventDefault()
						}}
						disabled={!me || !userInDrop}
						className={`text-lg ${!me && `cursor-default`}`}
					>
						{me && userInDrop ? 'Click to add' : 'Join to add'}
					</button>
				)}
			</div>
		</div>
	)
}

const DropDates = ({ drop, userInDrop }) => {
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
			console.log('Updating dates')
			updateDrop({
				variables: {
					id: drop.id,
					gearCheckDate: gearCheckDate ? gearCheckDate.getTime() : null,
					startDate: startDate ? startDate.getTime() : null,
					endDate: endDate ? endDate.getTime() : null,
					wrapDate: wrapDate ? wrapDate.getTime() : null,
				},
			})
		}
	}, [gearCheckDate, startDate, endDate, wrapDate])

	return (
		<div className="mx-auto w-80 sm:w-96">
			<Card>
				<div className="flex flex-col gap-4 py-2 px-4">
					<h3 className="pb-1 text-left text-xl">Dates</h3>

					<DateOption
						label="Gear Check"
						date={gearCheckDate}
						setDate={setGearCheckDate}
						dropDate={drop.gearCheckDate}
						userInDrop={userInDrop}
					/>
					<DateOption
						label="Shoot Start"
						date={startDate}
						setDate={setStartDate}
						dropDate={drop.startDate}
						userInDrop={userInDrop}
						previousDate={gearCheckDate}
					/>
					<DateOption
						label="Shoot End"
						date={endDate}
						setDate={setEndDate}
						dropDate={drop.endDate}
						userInDrop={userInDrop}
						previousDate={startDate}
					/>
					<DateOption
						label="Gear Wrap"
						date={wrapDate}
						setDate={setWrapDate}
						dropDate={drop.wrapDate}
						userInDrop={userInDrop}
						previousDate={endDate}
					/>
				</div>
			</Card>
		</div>
	)
}
export default DropDates
