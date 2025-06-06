import Link from 'next/link'
import React, { forwardRef } from 'react'

type SharedProps = {
	className?: string
	href?: string
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & SharedProps

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & SharedProps

//Input/output options
type Overload = {
	(props: ButtonProps, ref: React.Ref<string>): JSX.Element
	(props: AnchorProps, ref: React.Ref<string>): JSX.Element
}

// Gaurd to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
	'href' in props

const isRelativeHref = (href: string): boolean => href.startsWith('/')

const style = `bg-size-200 bg-pos-0 hover:bg-pos-100 rounded bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 px-3 py-1 font-bold transition-all duration-500`

const Button: Overload = (props: ButtonProps | AnchorProps) => {
	//render anchor
	if (hasHref(props))
		return isRelativeHref(props.href) ? (
			<Link href={props.href} className={style}>
				{props.children}
			</Link>
		) : (
			<a {...props} className={style}>
				{props.children}
			</a>
		)
	//render button
	return <button {...props} className={style} />
}

export default forwardRef(Button)
