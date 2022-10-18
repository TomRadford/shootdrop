import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { UPDATE_DROP } from "../../lib/apollo/queries"
import useGetMe from "../../lib/hooks/getMe"
import Card from "../Card"

const DropOption = ({ label, value, setValue, userInDrop }) => {
  const me = useGetMe()
  return (
    <div className="flex justify-between">
      <p className="text-left font-light text-gray-300">{label}</p>
      <input
        placeholder={me ? "Click to add" : "Login to add"}
        className="bg-transparent text-right font-semibold"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        disabled={!me || !userInDrop}
      />
    </div>
  )
}

const DropInfo = ({ drop, userInDrop }) => {
  const [director, setDirector] = useState(drop.director ? drop.director : "")
  const [dop, setDop] = useState(drop.dop ? drop.dop : "")
  const [soundie, setSoundie] = useState(drop.soundie ? drop.soundie : "")
  const [updateDrop, updateDropResult] = useMutation(UPDATE_DROP)

  useEffect(() => {
    if (
      drop.director !== director ||
      drop.dop !== dop ||
      drop.soundie !== soundie
    ) {
      const timeout = setTimeout(() => {
        console.log("Updating info")
        updateDrop({
          variables: {
            id: drop.id,
            dop,
            director,
            soundie,
          },
        })
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [director, dop, soundie])

  return (
    <div className="w-96">
      <Card>
        <div className="pb-13 flex flex-col gap-4 px-4 py-2 pb-[3.2rem]">
          <h3 className="pb-1 text-left text-xl">Info</h3>
          <DropOption
            label="Director"
            value={director}
            setValue={setDirector}
            userInDrop={userInDrop}
          />
          <DropOption
            label="DP"
            value={dop}
            setValue={setDop}
            userInDrop={userInDrop}
          />
          <DropOption
            label="Soundie"
            value={soundie}
            setValue={setSoundie}
            userInDrop={userInDrop}
          />
        </div>
      </Card>
    </div>
  )
}

export default DropInfo
