import Link from 'next/link'
import React, { forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

type SharedProps = {
	className?: string
	href?: string
	label?: string
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & SharedProps

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & SharedProps

// Gaurd to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
	'href' in props

const isRelativeHref = (href: string): boolean => href.startsWith('/')

const buttonStyles = cva(
	'w-min relative rounded px-2 py-1 transition-all group',
	{
		variants: {
			variant: {
				blue: 'bg-size-200 bg-pos-0 hover:bg-pos-100 bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 duration-500',
				outline: 'border border-solid border-slate-600 hover:bg-slate-900',
				red: ' rounded bg-red-600 transition-colors hover:bg-red-800',
			},
			center: {
				true: 'flex items-center justify-center p-2',
			},
		},
		defaultVariants: {
			variant: 'blue',
		},
	}
)

const AnchorButton = forwardRef<
	HTMLAnchorElement,
	AnchorProps & VariantProps<typeof buttonStyles>
>(({ variant, center, className, ...rest }, ref) => (
	<a
		ref={ref}
		{...rest}
		className={cn(buttonStyles({ variant, center }), className)}
	>
		{rest.children}
	</a>
))
AnchorButton.displayName = 'AnchorButton'

const ButtonLabel = ({ label }: { label: string }) => (
	<div className="absolute top-7 -left-3 z-10 rounded-md bg-black bg-opacity-70 p-1 opacity-0 transition-opacity group-hover:opacity-100">
		{label}
	</div>
)

const NativeButton = forwardRef<
	HTMLButtonElement,
	ButtonProps & VariantProps<typeof buttonStyles>
>(({ variant, center, label, className, ...rest }, ref) => (
	<button
		ref={ref}
		{...rest}
		className={cn(buttonStyles({ variant, center }), className)}
	>
		{rest.children}
		{label && <ButtonLabel label={label} />}
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
					buttonStyles({ variant: props.variant, center: props.center }),
					props.className
				)}
			>
				{props.children}
				{props.label && <ButtonLabel label={props.label} />}
			</Link>
		) : (
			<AnchorButton ref={ref as React.Ref<HTMLAnchorElement>} {...props}>
				{props.children}
				{props.label && <ButtonLabel label={props.label} />}
			</AnchorButton>
		)
	}
	return (
		<NativeButton ref={ref as React.Ref<HTMLButtonElement>} {...props}>
			{props.children}
			{props.label && <ButtonLabel label={props.label} />}
		</NativeButton>
	)
})
Button.displayName = 'Button'

export default Button
