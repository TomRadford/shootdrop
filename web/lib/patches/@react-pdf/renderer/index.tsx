import ReactPDF from '@react-pdf/renderer'
import { FC, PropsWithChildren } from 'react'

// Custom variants of `@react-pdf/renderer` components, which accept a `children` prop.
//
// Credits: Special thanks to GitHub user @antoineharel for sharing this solution at:
//          https://github.com/diegomura/react-pdf/pull/1798#issuecomment-1259552615

export const Svg: FC<PropsWithChildren<ReactPDF.SVGProps>> = ({ ...props }) => (
	<ReactPDF.Svg {...props} />
)

export const G: FC<PropsWithChildren<ReactPDF.GProps>> = ({ ...props }) => (
	<ReactPDF.G {...props} />
)

export const ClipPath: FC<PropsWithChildren<ReactPDF.ClipPathProps>> = ({
	...props
}) => <ReactPDF.ClipPath {...props} />
