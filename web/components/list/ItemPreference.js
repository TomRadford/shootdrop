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
}) => {
  const [selected, setSelected] = useState(optSelected)
  const [editListItem, { data, loading, error }] = useMutation(EDIT_LIST_ITEM)
  useEffect(() => {
    if (optSelected !== selected) {
      const existingPref = listItemPrefs.find(
        (listItemPref) => listItemPref.pref.id === pref.id
      )

      const prefToAdd = existingPref
        ? { id: existingPref.pref.id, opts: existingPref.opts }
        : { id: pref.id, opts: [opt.id] }
      console.log(prefToAdd) //HERE
      // editListItem({
      // 	variables: {
      // 		list: listId,
      // 		id: gearListItem.id,
      // 		prefs: gearListItem.prefs.concat()
      // 	}
      // })
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
              userInDrop={userInDrop}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ItemPreference
