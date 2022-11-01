import { useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import {
  ADD_GEAR_PREF_OPT,
  EDIT_GEAR_ITEM,
  EDIT_GEAR_PREF,
  EDIT_GEAR_PREF_OPT,
  REMOVE_GEAR_PREF_OPT,
} from "../../lib/apollo/queries"
import { UPDATE_TIMEOUT } from "../../lib/config"
import useGetMe from "../../lib/hooks/getMe"
import Card from "../Card"

const Opt = ({ opt, gearPrefId }) => {
  const [optName, setOptName] = useState(opt ? opt.name : "")
  const [selected, setSelected] = useState(false)
  const me = useGetMe()
  const [editGearPrefOpt, editGearPrefOptResult] =
    useMutation(EDIT_GEAR_PREF_OPT)
  const [removeGearPrefOpt, removeGearPrefOptResult] =
    useMutation(REMOVE_GEAR_PREF_OPT)
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
      }, UPDATE_TIMEOUT)

      return () => clearTimeout(timeout)
    }
  }, [optName])

  const handleRemove = (e) => {
    e.preventDefault()
    console.log("removing opt")
    removeGearPrefOpt({
      variables: {
        id: opt.id,
        gearPref: gearPrefId,
      },
    })
  }

  return (
    <div className="relative flex justify-center">
      <input
        type="text"
        value={optName}
        disabled={!me}
        placeholder="Click to name me"
        onMouseEnter={() => setSelected(true)}
        onMouseOut={() => setSelected(false)}
        onChange={({ target }) => {
          setOptName(target.value)
        }}
        className="bg-transparent text-center text-sm font-light"
      />
      {me && (
        <button
          onClick={handleRemove}
          className={`absolute right-0 ${!selected && `opacity-0`}`}
          onMouseEnter={() => setSelected(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

const GearPreference = ({ gearPref, gearItem }) => {
  const me = useGetMe()
  // const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
  const [addGearPrefOpt, addGearPrefOptResult] = useMutation(ADD_GEAR_PREF_OPT)
  const [editGearPref, editGearPrefResult] = useMutation(EDIT_GEAR_PREF)
  const [gearPrefName, setGearPrefName] = useState(
    gearPref ? gearPref.name : ""
  )

  useEffect(() => {
    if (gearItem && gearPref) {
      if (gearPrefName !== gearPref.name) {
        const timeout = setTimeout(() => {
          console.log("updating pref name")
          editGearPref({
            variables: {
              id: gearPref.id,
              name: gearPrefName,
            },
          })

          // editGearItem({
          //   variables: {
          //     id: gearItem.id,
          //     prefs: [
          //       ...gearItem.allPrefs.filter((pref) => pref.id !== gearPref.id),
          //       {
          //         id: gearPref.id,
          //         name: gearPrefName,
          //         allOpts: gearPref.allOpts.map((opt) => opt.name),
          //       },
          //     ],
          //   },
          // })
        }, UPDATE_TIMEOUT)
        return () => clearTimeout(timeout)
      }
    }
  }, [gearPrefName])

  const handleAddOpt = (e) => {
    e.preventDefault()
    addGearPrefOpt({
      variables: {
        gearPref: gearPref.id,
      },
    })
  }

  return (
    <>
      {gearPref ? (
        <div className="w-80 sm:w-96">
          <Card>
            <div className="flex flex-col gap-1 px-4 pb-4">
              <input
                className="bg-transparent text-left text-base"
                value={gearPrefName}
                disabled={!me}
                onChange={({ target }) => {
                  setGearPrefName(target.value)
                }}
              />
              <div className="flex flex-col items-center gap-1">
                {gearPref.allOpts.map((opt) => (
                  <Opt key={opt.id} opt={opt} gearPrefId={gearPref.id} />
                ))}
                {me && (
                  <button className="text-sm" onClick={handleAddOpt}>
                    Click to add option
                  </button>
                )}
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
