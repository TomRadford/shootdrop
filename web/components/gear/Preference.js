import { useMutation, useApolloClient } from "@apollo/client"
import { useState, useEffect } from "react"
import {
  ADD_GEAR_PREF_OPT,
  ADD_GEAR_PREF,
  EDIT_GEAR_PREF,
  REMOVE_GEAR_PREF,
  EDIT_GEAR_PREF_OPT,
  REMOVE_GEAR_PREF_OPT,
  ALL_DROPS,
  ALL_GEAR_ITEMS,
} from "../../lib/apollo/queries"
import { UPDATE_TIMEOUT } from "../../lib/config"
import useGetMe from "../../lib/hooks/getMe"
import AddCard from "../AddCard"
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
    } // eslint-disable-next-line react-hooks/exhaustive-deps
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
          onMouseLeave={() => setSelected(false)}
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
  const [addGearPref, addGearPrefResult] = useMutation(ADD_GEAR_PREF, {
    update: (cache, response) => {
      cache.updateQuery(
        { query: ALL_GEAR_ITEMS, variables: { id: gearItem.id } },
        ({ allGearItems }) => {
          return {
            allGearItems: {
              gearItems: [
                {
                  ...allGearItems.gearItems[0],
                  allPrefs: [
                    ...allGearItems.gearItems[0].allPrefs,
                    response.data.addGearPref,
                  ],
                },
              ],
              totalDocs: null,
            },
          }
        }
      )
    },
  })

  const [addGearPrefOpt, addGearPrefOptResult] = useMutation(ADD_GEAR_PREF_OPT)
  const [editGearPref, editGearPrefResult] = useMutation(EDIT_GEAR_PREF)
  const [removeGearPref, removeGearPrefResult] = useMutation(REMOVE_GEAR_PREF, {
    update: (cache, response) => {
      cache.updateQuery(
        { query: ALL_GEAR_ITEMS, variables: { id: gearItem.id } },
        ({ allGearItems }) => {
          return {
            allGearItems: {
              gearItems: [
                {
                  ...allGearItems.gearItems[0],
                  allPrefs: allGearItems.gearItems[0].allPrefs.filter(
                    (pref) => pref.id !== response.data.removeGearPref
                  ),
                },
              ],
              totalDocs: null,
            },
          }
        }
      )
      //Remove GearPref & any GearPrefOpt's from cache
      cache.gc()
    },
  })
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

  const handleAddPref = (e) => {
    e.preventDefault()
    addGearPref({
      variables: {
        gearItem: gearItem.id,
      },
    })
  }

  const handleRemovePref = (e) => {
    e.preventDefault()
    removeGearPref({
      variables: {
        gearItem: gearItem.id,
        id: gearPref.id,
      },
    })
  }

  return (
    <>
      {gearPref ? (
        <div className=" w-80">
          <Card>
            <div className="flex flex-col gap-1 px-4 pb-4">
              {me && (
                <button onClick={handleRemovePref} className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute -right-4 h-4 w-4 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              <input
                className="bg-transparent text-left text-base"
                value={gearPrefName}
                placeholder="Name of preference"
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
        <button className={`w-80`} onClick={handleAddPref}>
          <Card>
            <div className="flex h-36 items-center justify-center">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="square"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </button>
      )}
    </>
  )
}

export default GearPreference
