import create from "zustand"

//Note: because Zustand lives outside of apollo, any mutations to data
// will not reflect in this store without manually setting them
//ToDo: look into Apollo's reactive variables as more 'reactive'
// option or remove this comment
const useListItemStore = create((set) => ({
  listItem: undefined,
  setListItem: (newListItem) => set({ listItem: newListItem }),
}))

export default useListItemStore
