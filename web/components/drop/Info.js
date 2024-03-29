import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { UPDATE_DROP } from '../../lib/apollo/queries'
import { UPDATE_TIMEOUT } from '../../lib/config'
import useGetMe from '../../lib/hooks/getMe'
import Card from '../Card'

const DropOption = ({ label, value, setValue, userInDrop }) => {
	const me = useGetMe()
	return (
		<div className="flex flex-row justify-between">
			<p className="text-left font-light text-gray-300">{label}</p>
			<input
				placeholder={me && userInDrop ? 'Click to add' : 'Join to add'}
				className="w-[10rem] bg-transparent text-right font-semibold sm:w-[14rem]"
				value={value}
				onChange={({ target }) => setValue(target.value)}
				disabled={!me || !userInDrop}
			/>
		</div>
	)
}

const DropInfo = ({ drop, userInDrop }) => {
	const [director, setDirector] = useState(drop.director ? drop.director : '')
	const [dop, setDop] = useState(drop.dop ? drop.dop : '')
	const [soundie, setSoundie] = useState(drop.soundie ? drop.soundie : '')
	const [updateDrop, updateDropResult] = useMutation(UPDATE_DROP)

	useEffect(() => {
		if (
			drop.director !== director ||
			drop.dop !== dop ||
			drop.soundie !== soundie
		) {
			const timeout = setTimeout(() => {
				console.log('Updating info')
				updateDrop({
					variables: {
						id: drop.id,
						dop,
						director,
						soundie,
					},
				})
			}, UPDATE_TIMEOUT)
			return () => clearTimeout(timeout)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [director, dop, soundie, drop])

	return (
		<div className="mx-auto w-80 sm:w-96">
			<Card>
				<div className="pb-13 flex flex-col gap-4 px-4 py-2 pb-[3.2rem]">
					<h3 className="pb-1 text-left text-xl">Info</h3>
					<DropOption
						label="Director"
						value={director}
						setValue={setDirector}
						userInDrop={userInDrop}
					/>
					<DropOption
						label="DP"
						value={dop}
						setValue={setDop}
						userInDrop={userInDrop}
					/>
					<DropOption
						label="Soundie"
						value={soundie}
						setValue={setSoundie}
						userInDrop={userInDrop}
					/>
				</div>
			</Card>
		</div>
	)
}

export default DropInfo
