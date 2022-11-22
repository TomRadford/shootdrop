import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { EDIT_LIST_ITEM } from "../../lib/apollo/queries"

const PrefOpt = ({
  opt,
  optSelected,
  listItemPrefs,
  listId,
  userInDrop,
  pref,
  gearListItem,
}) => {
  const [selected, setSelected] = useState(optSelected)
  const [editListItem, { data, loading, error }] = useMutation(EDIT_LIST_ITEM)
  useEffect(() => {
    if (optSelected !== selected) {
      const existingPref = listItemPrefs.find(
        (listItemPref) => listItemPref.pref.id === pref.id
      )

      //ToDo: relook creating a mutation for add/remove listItemPref
      // instead of passing through all prefs each time
      let newListItemPref = {}

      if (selected) {
        console.log("selected")
        newListItemPref = existingPref
          ? {
              id: existingPref.pref.id,
              opts: [
                ...existingPref.opts.map((existingOpt) => existingOpt.id),
                opt.id,
              ],
            }
          : { id: pref.id, opts: [opt.id] }
      } else {
        console.log("deselected")
        newListItemPref = {
          id: existingPref.pref.id,
          opts: [
            ...existingPref.opts
              .filter((existingOpt) => existingOpt.id !== opt.id)
              .map((opt) => opt.id),
          ],
        }
      }
      console.log(listItemPrefs)
      const newPrefs = [
        ...listItemPrefs
          .filter((listItemPref) => listItemPref.pref.id !== newListItemPref.id)
          .map((listItemPref) => {
            return {
              id: listItemPref.pref.id,
              opts: listItemPref.opts.map((existingOpt) => existingOpt.id),
            }
          }),
        newListItemPref,
      ]
      console.log(newPrefs)
      console.log("updating options")
      editListItem({
        variables: {
          list: listId,
          id: gearListItem.id,
          prefs: newPrefs,
        },
      })
    }
  }, [selected])
  return (
    <div className="flex">
      <input
        type="checkbox"
        checked={selected}
        disabled={!userInDrop}
        onChange={() => setSelected(!selected)}
      />
      <label className="form-control ml-2 flex items-center gap-2 text-sm ">
        {opt.name}
      </label>
    </div>
  )
}

const ItemPreference = ({ listId, gearListItem, userInDrop }) => {
  const { gearItem } = gearListItem
  const listItemPrefs = gearListItem.prefs ? gearListItem.prefs : []

  const isPrefSelected = (pref, opt) => {
    const selectedPref = listItemPrefs.find(
      (listItemPref) => listItemPref.pref.id === pref.id
    )
    if (selectedPref) {
      if (selectedPref.opts.find((listItemOpt) => opt.id === listItemOpt.id)) {
        return true
      } else return false
    } else return false
  }

  return (
    <div className="flex flex-col gap-2 text-left">
      {gearItem.allPrefs.map((pref) => (
        <div key={pref.id}>
          <h4 className="mb-1 font-semibold">{pref.name}</h4>
          <div className="flex flex-col gap-2">
            {pref.allOpts.map((opt) => (
              <PrefOpt
                key={opt.id}
                pref={pref}
                opt={opt}
                optSelected={isPrefSelected(pref, opt)}
                listItemPrefs={listItemPrefs}
                listId={listId}
                gearListItem={gearListItem}
                userInDrop={userInDrop}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemPreference
