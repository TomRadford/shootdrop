import { useRef, useEffect } from "react"

// Hook to create ref to implement horizontal scroll on div

export const useHorizontalScroll = () => {
  const elRef = useRef()
  useEffect(() => {
    const el = elRef.current
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return
        e.preventDefault()
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behaviour: "smooth",
        })
      }
      el.addEventListener("wheel", onWheel)
      return () => el.removeEventListener("wheel", onWheel)
    }
  }, [])
  return elRef
}
