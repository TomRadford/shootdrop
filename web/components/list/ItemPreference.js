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
  gearListItem
}) => {
  const [selected, setSelected] = useState(optSelected)
  const [editListItem, { data, loading, error }] = useMutation(EDIT_LIST_ITEM)
  useEffect(() => {
    if (optSelected !== selected) {
      const existingPref = listItemPrefs.find(
        (listItemPref) => listItemPref.pref.id === pref.id
      )
      //ToDo: relook creating a mutation for add/remove listItemPref
      let newListItemPref = {}
      if (selected) {
        newListItemPref = existingPref
          ? { id: existingPref.pref.id, opts: [...existingPref.opts.map(existingOpt => existingOpt.id), opt.id] }
          : { id: pref.id, opts: [opt.id] }
      } else {
        newListItemPref = { id: existingPref.pref.id, opts: [...existingPref.opts.filter(existingOpt => existingOpt.id !== opt.id).map(opt => opt.id)] }
      }
      console.log(newListItemPref) //HERE
      editListItem({
        variables: {
          list: listId,
          id: gearListItem.id,
          prefs: newListItemPref
        }
      })
    }
  }, [selected])
  return (
    <div className="ml-2 flex gap-2" key={opt.id}>
      <input
        type="checkbox"
        checked={selected}
        disabled={!userInDrop}
        onChange={() => setSelected(!selected)}
      />
      <label className="text-sm">{opt.name}</label>
    </div>
  )
}

const ItemPreference = ({ listId, gearListItem, userInDrop }) => {
  // console.log(
  //   gearListItem.gearItem.id === "6368d2052b2cf28e1c31ae5d"
  //     ? console.log(gearListItem)
  //     : ""
  // )
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
      ))}
    </div>
  )
}

export default ItemPreference
