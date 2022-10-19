import Image from "next/image"
import TextareaAutosize from "react-textarea-autosize"
import { useQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { ME, ADD_DROP, UPDATE_DROP } from "../../lib/apollo/queries"
import { useRouter } from "next/router"
import useGetMe from "../../lib/hooks/getMe"
import UserModal from "./UserModal"
import { format } from "date-fns"

const DropHeader = ({ drop, userInDrop }) => {
  const [modalOpen, setModalOpen] = useState(false)
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
    <>
      <header className="mx-auto flex justify-between gap-1 align-bottom md:w-full">
        <div className="flex min-w-max items-center pl-3 md:pl-0">
          <button
            className={!me ? "cursor-default" : ""}
            onClick={(e) => {
              e.preventDefault()
              setModalOpen(true)
            }}
          >
            <div className="mb-5 flex -space-x-4 md:-space-x-2">
              {drop &&
                drop.users.map((user) => (
                  <div key={user.id}>
                    <Image
                      src={user.profilePicture}
                      key={user.id}
                      width="30px"
                      height="30px"
                      className={`rounded-full`}
                      objectFit="cover"
                    />
                  </div>
                ))}
            </div>
          </button>
        </div>

        <div className=" flex flex-col items-end">
          <TextareaAutosize
            name="name"
            className="mx-2 w-2/3 resize-none whitespace-pre-wrap bg-transparent text-right text-xl font-bold sm:w-full md:w-full md:text-3xl"
            placeholder="Project name"
            autoComplete="off"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            value={dropName}
            onChange={({ target }) => setDropName(target.value)}
            disabled={!me || !userInDrop}
          />
          <div className="mr-3 flex flex-col justify-end text-right text-gray-300 md:w-full">
            <div className="flex">
              <p className="flex-1"></p>
              <input
                placeholder="Client name"
                className="w-2/3 bg-transparent text-right"
                value={clientName}
                onChange={({ target }) => setClientName(target.value)}
                disabled={!me || !userInDrop}
              />
            </div>
          </div>
        </div>
        <div className="mr-1 flex items-center text-xs text-gray-300">
          {drop && (
            <p>
              Last edited {format(new Date(drop.updatedAt), "HH:mm d/M/yy")}
            </p>
          )}
        </div>
      </header>
      <UserModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        drop={drop}
        userInDrop={userInDrop}
      />
    </>
  )
}

export default DropHeader
