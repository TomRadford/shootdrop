import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import Image from "next/image"
import useGetMe from "../../lib/hooks/getMe"
import { useMutation, useLazyQuery } from "@apollo/client"
import { ALL_DROPS, ALL_USERS, UPDATE_DROP } from "../../lib/apollo/queries"

const User = ({ user, onClick, userInDrop }) => {
  const me = useGetMe()
  if (me) {
    return (
      <div className="flex flex-row gap-4">
        <Image
          src={
            user.profilePicture ? user.profilePicture : `/img/default_user.png`
          }
          key={user.id}
          width="30px"
          height="30px"
          className={`rounded-full`}
          objectFit="cover"
          alt={user.fullName}
        />
        <div className="text-lg font-light">{user.fullName}</div>
        {user.id !== me.id && userInDrop && (
          <div className="flex-1">
            <div className="flex justify-end">
              <button onClick={onClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const UserModal = ({ modalOpen, setModalOpen, drop, userInDrop }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const me = useGetMe()
  const [updateDrop, updateDropResult] = useMutation(UPDATE_DROP)
  const [loading, setLoading] = useState(false)
  const [getUsers, userResults] = useLazyQuery(ALL_USERS)
  const closeModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      if (searchTerm !== "") {
        getUsers({
          variables: {
            fullName: searchTerm,
          },
          onCompleted: () => setLoading(false),
        })
      }
    }, 500)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const handleRemove = (userIDToRemove) => {
    const newUsers = drop.users.reduce(
      (p, c) => (c.id !== userIDToRemove ? p.concat(c.id) : p),
      []
    )
    updateDrop({
      variables: {
        id: drop.id,
        users: newUsers,
      },
    })
  }
  const userIds = drop ? drop.users.map((user) => user.id) : []

  const handleAdd = (userIDtoAdd) => {
    updateDrop({
      variables: {
        id: drop.id,
        users: userIds.concat(userIDtoAdd),
      },
    })
  }
  if (me && drop) {
    return (
      <>
        <Transition appear show={modalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto md:ml-72">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black px-10 py-5 text-left align-middle text-white shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-white"
                    >
                      Members
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col gap-3">
                      {drop.users.map((user) => (
                        <User
                          onClick={() => handleRemove(user.id)}
                          user={user}
                          key={user.id}
                          userInDrop={userInDrop}
                        />
                      ))}
                    </div>
                    {userInDrop && (
                      <>
                        <div className="mt-4 ">
                          <input
                            className="w-full bg-transparent text-white"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={({ target }) =>
                              setSearchTerm(target.value)
                            }
                          />
                        </div>
                        <div>
                          {searchTerm.length > 0 && (
                            <div className="mt-2 flex flex-col gap-3">
                              {loading ? (
                                <div className="mx-auto">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="#616060"
                                    className="h-4 w-4 animate-spin"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                userResults.data &&
                                userResults.data.allUsers.map((user) => {
                                  if (!userIds.includes(user.id)) {
                                    return (
                                      <button
                                        onClick={() => handleAdd(user.id)}
                                        key={user.id}
                                      >
                                        <User
                                          user={user}
                                          onClick={(e) => e.preventDefault()}
                                        />
                                      </button>
                                    )
                                  }
                                })
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  }
}

export default UserModal
