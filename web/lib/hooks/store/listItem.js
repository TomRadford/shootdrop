import create from "zustand"

const useListItemStore = create((set) => ({
  listItem: undefined,
  setListItem: (newListItem) => set({ listItem: newListItem }),
}))

export default useListItemStore
