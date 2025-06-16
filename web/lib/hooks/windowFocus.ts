import { useEffect, useRef } from 'react'

/**
 * Calls the provided callback when the window becomes visible (using the Page Visibility API).
 */
const useWindowFocus = (callback: () => void) => {
	// Use a ref to always have the latest callback
	const callbackRef = useRef(callback)
	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		function handleVisibilityChange() {
			if (document.visibilityState === 'visible') {
				callbackRef.current()
			}
		}
		document.addEventListener('visibilitychange', handleVisibilityChange)
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
		}
	}, [])
}

export default useWindowFocus
