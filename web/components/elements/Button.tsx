import React, { forwardRef } from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	href?: undefined
}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	href?: string
}

//Input/output options
type Overload = {
	(props: ButtonProps, ref: React.Ref<string>): JSX.Element
	(props: AnchorProps, ref: React.Ref<string>): JSX.Element
}

// Gaurd to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
	'href' in props

const style = `bg-size-200 bg-pos-0 hover:bg-pos-100 rounded bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 px-3 py-1 font-bold transition-all duration-500`

const Button: Overload = (
	props: ButtonProps | AnchorProps,
	ref: React.Ref<string>
) => {
	//render anchor
	if (hasHref(props)) return <a {...props} className={style} />
	//render button
	return <button {...props} className={style} />
}

export default forwardRef(Button)
