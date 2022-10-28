import { useMutation, useQuery } from "@apollo/client"
import { ALL_TAGS, EDIT_GEAR_ITEM } from "../../lib/apollo/queries"
import { useState, Fragment, useEffect } from "react"
import useGetMe from "../../lib/hooks/getMe"
import { Transition, Dialog } from "@headlessui/react"

const TagsModal = ({ setTagsModalOpen, tagsModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const me = useGetMe()
  const allTags = useQuery(ALL_TAGS, {
    variables: {
      tag: searchTerm,
    },
  })
  console.log(allTags)
  useEffect(() => {
    //prevent all tags flashing upon modal close
    const timeout = setTimeout(() => {
      setSearchTerm("")
    }, 500)
    return () => clearTimeout(timeout)
  }, [tagsModalOpen])

  const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
  return (
    <Transition appear show={tagsModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setTagsModalOpen(false)}
      >
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
              <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-2xl bg-black px-10 py-5 text-left align-middle text-white shadow-xl transition-all sm:max-w-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Add a tag
                </Dialog.Title>
                <div>
                  <div className="mx-2 my-2">
                    <input
                      className="w-full bg-transparent text-white"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={({ target }) => setSearchTerm(target.value)}
                    />
                  </div>

                  {allTags.loading ? (
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
                    //Note: API limits to 7 list items
                    allTags.data && (
                      <div className="flex justify-center">
                        <div className="inline-grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {allTags.data.allTags.map((tag) => {
                            return (
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  setTagsModalOpen(false)
                                }}
                                key={tag.id}
                                className="flex items-center rounded bg-teal-600 px-2 py-1 text-sm "
                              >
                                {tag.name}
                              </button>
                            )
                          })}
                          {searchTerm && (
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                setTagsModalOpen(false)
                              }}
                              className="flex items-center rounded bg-teal-600 px-2 py-1 text-sm "
                            >
                              {searchTerm}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TagsModal
