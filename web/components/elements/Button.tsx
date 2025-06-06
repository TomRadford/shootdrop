import Link from 'next/link'
import React, { forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

type SharedProps = {
	className?: string
	href?: string
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & SharedProps

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & SharedProps

// Gaurd to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
	'href' in props

const isRelativeHref = (href: string): boolean => href.startsWith('/')

const buttonStyles = cva('rounded px-3 py-1 transition-all', {
	variants: {
		variant: {
			blue: 'bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 duration-500',
			outline:
				'border border-solid border-slate-600 transition-colors duration-300 hover:bg-slate-900',
		},
	},
	defaultVariants: {
		variant: 'blue',
	},
})

const AnchorButton = forwardRef<
	HTMLAnchorElement,
	AnchorProps & VariantProps<typeof buttonStyles>
>(({ variant, className, ...rest }, ref) => (
	<a ref={ref} {...rest} className={cn(buttonStyles({ variant }), className)}>
		{rest.children}
	</a>
))
AnchorButton.displayName = 'AnchorButton'

const NativeButton = forwardRef<
	HTMLButtonElement,
	ButtonProps & VariantProps<typeof buttonStyles>
>(({ variant, className, ...rest }, ref) => (
	<button
		ref={ref}
		{...rest}
		className={cn(buttonStyles({ variant }), className)}
	>
		{rest.children}
	</button>
))
NativeButton.displayName = 'NativeButton'

const Button = forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	(ButtonProps | AnchorProps) & VariantProps<typeof buttonStyles>
>((props, ref) => {
	if (hasHref(props)) {
		return isRelativeHref(props.href) ? (
			<Link
				href={props.href}
				className={cn(
					buttonStyles({ variant: props.variant }),
					props.className
				)}
			>
				{props.children}
			</Link>
		) : (
			<AnchorButton ref={ref as React.Ref<HTMLAnchorElement>} {...props} />
		)
	}
	return <NativeButton ref={ref as React.Ref<HTMLButtonElement>} {...props} />
})
Button.displayName = 'Button'

export default Button
