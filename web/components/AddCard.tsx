import Link from 'next/link'
import Card from './Card'
import LoadingSpinner from './elements/LoadingSpinner'
import { Fragment } from 'react'

//ToDo: make this one component

const wrapperClassName =
	'relative mx-auto w-80 transition-transform hover:scale-105 active:scale-95 sm:w-96'

export const AddButton = ({
	onClick,
	title,
	loading,
	as = 'button',
}: {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	title?: string
	loading?: boolean
	as?: 'button' | 'fragment'
}) => {
	const Component = as === 'button' ? 'button' : Fragment
	return (
		<Component
			{...(as === 'button' && { onClick })}
			{...(as === 'button' && { className: wrapperClassName })}
		>
			<Card>
				{title && (
					<div className="text-md font-semibold text-center">{`${
						title[0]
					}${title.slice(1).toLowerCase()}`}</div>
				)}
				<div className="flex h-44 items-center justify-center">
					{loading ? (
						<LoadingSpinner />
					) : (
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={4}
								stroke="currentColor"
								className="h-8 w-8"
							>
								<path strokeLinecap="square" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
						</>
					)}
				</div>
			</Card>
		</Component>
	)
}

const AddCard = ({ href, title, onClick }) =>
	href ? (
		<Link href={href} onClick={onClick} className={wrapperClassName}>
			<AddButton as="fragment" />
		</Link>
	) : (
		<AddButton as="button" onClick={onClick} title={title} />
	)

export default AddCard
