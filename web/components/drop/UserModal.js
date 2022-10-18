import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import Image from "next/image"
import useGetMe from "../../lib/hooks/getMe"
import { useMutation } from "@apollo/client"
import { UPDATE_DROP } from "../../lib/apollo/queries"

const UserModal = ({ modalOpen, setModalOpen, drop, userInDrop }) => {
  const me = useGetMe()
  const [updateDrop, updateDropResult] = useMutation(UPDATE_DROP)
  const closeModal = () => {
    setModalOpen(false)
  }
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
  if (me) {
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
                        <div className="flex flex-row gap-4" key={user.id}>
                          <Image
                            src={user.profilePicture}
                            key={user.id}
                            width="30px"
                            height="30px"
                            className={`rounded-full`}
                            objectFit="cover"
                          />
                          <div className="text-lg font-light">
                            {user.fullName}
                          </div>
                          {user.id !== me.id && userInDrop && (
                            <div className="flex-1">
                              <div className="flex justify-end">
                                <button onClick={() => handleRemove(user.id)}>
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
                      ))}
                    </div>

                    <div className="mt-4 ">search</div>
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
