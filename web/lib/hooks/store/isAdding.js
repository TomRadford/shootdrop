import create from "zustand"

const useIsAddingStore = create((set) => ({
  isAdding: false,
  setIsAdding: (value) => set({ isAdding: value }),
}))

export default useIsAddingStore
