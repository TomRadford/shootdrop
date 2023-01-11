import useHasMounted from '../lib/hooks/mounted'

const ClientOnly = ({ children, ...delegated }) => {
	const hasMounted = useHasMounted
	if (!hasMounted) {
		return null
	}

	return <div {...delegated}>{children}</div>
}

export default ClientOnly
