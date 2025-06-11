import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const textInputStyles = cva('bg-transparent', {
	variants: {
		variant: {
			primary: '',
		},
	},
})

const TextInput = ({
	className,
	placeholder,
	value,
	onChange,
	variant = 'primary',
	required = false,
}: {
	className?: string
	placeholder?: string
	value?: string
	required?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & VariantProps<typeof textInputStyles>) => {
	return (
		<input
			className={cn(textInputStyles({ variant }), className)}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			required={required}
		/>
	)
}

export default TextInput
