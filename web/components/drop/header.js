import Image from "next/image"
import TextareaAutosize from "react-textarea-autosize"
import { useQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { ME, ADD_DROP, UPDATE_DROP } from "../../lib/apollo/queries"
import { useRouter } from "next/router"
import useGetMe from "../../lib/hooks/getMe"

const getDateString = (value) => {
  const date = new Date(value)
  return `${date.getHours()}:${date.getMinutes()} ${date.toLocaleDateString()}`
}

const DropHeader = ({ drop }) => {
  const [dropName, setDropName] = useState(drop ? drop.project : "")
  const [clientName, setClientName] = useState(drop ? drop.client : "")
  const [addDrop, { data, loading, error }] = useMutation(ADD_DROP)
  const [updateDrop, updateDropResult] = useMutation(UPDATE_DROP)
  const me = useGetMe()
  const router = useRouter()
  useEffect(() => {
    if (!drop) {
      const timeout = setTimeout(() => {
        if (dropName.length > 3 && clientName.length > 0) {
          addDrop({
            variables: {
              project: dropName,
              client: clientName,
            },
          })
        }
      }, 2000)
      return () => clearTimeout(timeout)
    } else {
      if (drop.project !== dropName || drop.client !== clientName) {
        const timeout = setTimeout(() => {
          console.log("Updating headers")
          updateDrop({
            variables: {
              id: drop.id,
              project: dropName,
              client: clientName,
            },
          })
        }, 2000)
        return () => clearTimeout(timeout)
      }
    }
  }, [dropName, clientName])

  if (!drop) {
    if (!loading && data) {
      router.push(`/drops/${data.addDrop.id}`)
    }
  }

  return (
    <header className="mx-auto flex w-screen justify-between gap-1 align-bottom md:w-full">
      <div className="flex min-w-max items-center">
        {/* <Image
          src={`/img/roger.jfif`}
          width="30px"
          height="30px"
          className="rounded-full"
          objectFit="cover"
        /> */}
      </div>
      <div>
        <TextareaAutosize
          name="name"
          className="mx-2 resize-none whitespace-pre-wrap bg-transparent text-right text-xl font-bold md:text-3xl"
          placeholder="Project name"
          autoComplete="off"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          value={dropName}
          onChange={({ target }) => setDropName(target.value)}
          disabled={!me}
        />
        <div className="mr-3 flex flex-col justify-end text-right text-gray-300">
          <div className="flex">
            <p className="flex-1"></p>
            <input
              placeholder="Client name"
              className="bg-transparent text-right"
              value={clientName}
              onChange={({ target }) => setClientName(target.value)}
              disabled={!me}
            />
          </div>
        </div>
      </div>
      <div className="mr-1 flex items-center text-xs text-gray-300">
        {drop && <p>Last edited {getDateString(drop.updatedAt)}</p>}
      </div>
    </header>
  )
}

export default DropHeader
