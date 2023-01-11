import { useEffect, useState } from 'react'

const Notification = ({ messageData, setMessageData }) => {
	useEffect(() => {
		if (messageData.message) {
			const timeout = setTimeout(() => {
				setMessageData({ message: '', type: '' })
			}, 2000)
			return () => clearTimeout(timeout)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageData])
	if (messageData.message) {
		return (
			<div className="mt-5">
				<p
					className={
						messageData.type === 'error' ? 'text-red-600' : 'text-white'
					}
				>
					{messageData.message}
				</p>
			</div>
		)
	}
}
export default Notification
