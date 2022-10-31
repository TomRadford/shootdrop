import { useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import { EDIT_GEAR_ITEM, EDIT_GEAR_PREF_OPT } from "../../lib/apollo/queries"
import useGetMe from "../../lib/hooks/getMe"
import Card from "../Card"

const Opt = ({ opt, gearItem }) => {
  const [optName, setOptName] = useState(opt ? opt.name : "")
  const [editGearPrefOpt, editGearPrefOptResult] =
    useMutation(EDIT_GEAR_PREF_OPT)
  //make new edit opt mutation
  useEffect(() => {
    if (opt && optName !== opt.name) {
      const timeout = setTimeout(() => {
        console.log("updating opt name")
        editGearPrefOpt({
          variables: {
            id: opt.id,
            name: optName,
          },
        })
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [optName])

  return (
    <input
      type="text"
      value={optName}
      onChange={({ target }) => {
        setOptName(target.value)
      }}
      className="bg-transparent text-sm font-light"
    />
  )
}

const GearPreference = ({ gearPref, gearItem }) => {
  const me = useGetMe()
  const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
  const [gearPrefName, setGearPrefName] = useState(
    gearPref ? gearPref.name : ""
  )

  useEffect(() => {
    if (gearItem && gearPref) {
      if (gearPrefName !== gearPref.name) {
        const timeout = setTimeout(() => {
          console.log("updating pref name")
          //ToDo: create a editGearPref mutation
          //instead of passing through entire gearItem
          editGearItem({
            variables: {
              id: gearItem.id,
              prefs: [
                ...gearItem.allPrefs.filter((pref) => pref.id !== gearPref.id),
                {
                  id: gearPref.id,
                  name: gearPrefName,
                  allOpts: gearPref.allOpts.map((opt) => opt.name),
                },
              ],
            },
          })
        }, 2000)
        return () => clearTimeout(timeout)
      }
    }
  }, [gearPrefName])

  return (
    <>
      {gearPref ? (
        <div className="w-80 sm:w-96">
          <Card>
            <div className="flex flex-col gap-1 px-4 pb-4">
              <input
                className="bg-transparent text-left text-base"
                value={gearPrefName}
                onChange={({ target }) => {
                  setGearPrefName(target.value)
                }}
              />
              <div className="flex flex-col gap-1">
                {gearPref.allOpts.map((opt) => (
                  <Opt key={opt.id} opt={opt} gearItem={gearItem} />
                ))}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <>add</>
      )}
    </>
  )
}

export default GearPreference
