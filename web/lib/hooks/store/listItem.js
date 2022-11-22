import create from "zustand"

//Note: because Zustand lives outside of apollo any mutations to data
// will not reflect in store without manually settig them
//ToDo: look into Apollo's reactive variables
const useListItemStore = create((set) => ({
  listItem: undefined,
  setListItem: (newListItem) => set({ listItem: newListItem }),
}))

export default useListItemStore
