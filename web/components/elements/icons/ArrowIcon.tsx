import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../../lib/utils'

const styles = cva('', {
	variants: {
		direction: {
			up: 'rotate-180',
			down: '',
			left: 'rotate-90',
			right: '-rotate-90',
		},
		size: {
			sm: 'w-4 h-4',
			md: 'w-6 h-6',
			lg: 'w-8 h-8',
		},
	},
})

const ArrowIcon = ({
	direction,
	className,
	size,
}: VariantProps<typeof styles> & { className?: string }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(styles({ direction, size }), className)}
		>
			<path
				d="M12 5V19M12 19L18 13M12 19L6 13"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	)
}

export default ArrowIcon
