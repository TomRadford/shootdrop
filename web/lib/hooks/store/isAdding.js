import { create } from 'zustand'

const useIsAddingStore = create((set) => ({
	isAdding: 0,
	setIsAdding: (value) => set({ isAdding: value }),
}))

export default useIsAddingStore
