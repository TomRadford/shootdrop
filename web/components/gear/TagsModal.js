import { useMutation, useLazyQuery } from "@apollo/client"
import { ADD_TAG, ALL_TAGS, EDIT_GEAR_ITEM } from "../../lib/apollo/queries"
import { useState, Fragment, useEffect } from "react"
import useGetMe from "../../lib/hooks/getMe"
import { Transition, Dialog } from "@headlessui/react"
import { andFormatter } from "../../lib/text/formatter"

const TagsModal = ({ setTagsModalOpen, tagsModalOpen, gearItem }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const me = useGetMe()
  const [getTags, tagsResults] = useLazyQuery(ALL_TAGS)

  useEffect(() => {
    getTags()
  }, [])

  useEffect(() => {
    if (searchTerm.length === 0) {
      setLoading(true)
      getTags({
        variables: {
          category: gearItem.category,
        },
      })
      setLoading(false)
    }
    if (searchTerm.length > 0) {
      setLoading(true)
      const timeout = setTimeout(() => {
        getTags({
          variables: {
            category: gearItem.category, //array of categories
            tag: searchTerm,
          },
        })
        setLoading(false)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [searchTerm])

  const tagIds = gearItem.tags.map((tag) => tag.id)

  const [editGearItem, editGearItemResult] = useMutation(EDIT_GEAR_ITEM)
  const [addTag, addTagResult] = useMutation(ADD_TAG)

  return (
    <Transition
      appear
      show={tagsModalOpen}
      as={Fragment}
      afterLeave={() => setSearchTerm("")}
    >
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
                  <div className="mx-2 mt-2 mb-2">
                    <input
                      className="w-full bg-transparent text-white"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={({ target }) => setSearchTerm(target.value)}
                    />
                  </div>

                  {loading ? (
                    <div className="mt-5 flex justify-center">
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
                    //Note: API limits to 10 list items
                    tagsResults.data && (
                      <div>
                        <div className="mb-2 flex justify-center">
                          <div className="flex flex-wrap gap-2">
                            {tagsResults.data.allTags.map((tag) => {
                              if (!tagIds.includes(tag.id)) {
                                return (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setTagsModalOpen(false)
                                      editGearItem({
                                        variables: {
                                          id: gearItem.id,
                                          tags: [
                                            ...gearItem.tags.map(
                                              (tag) => tag.name
                                            ),
                                            tag.name,
                                          ],
                                        },
                                      })
                                    }}
                                    key={tag.id}
                                    className="flex items-center rounded bg-teal-600 px-2 py-1 text-sm "
                                  >
                                    {tag.name}
                                  </button>
                                )
                              }
                            })}
                          </div>
                        </div>

                        {searchTerm && (
                          <div className="mt-0">
                            <p className="mb-2 text-center text-xs text-gray-500">
                              Add a new tag
                            </p>
                            <div className="items-left flex w-full flex-col justify-center gap-2 text-sm">
                              <div className="flex  gap-3">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setTagsModalOpen(false)
                                    editGearItem({
                                      variables: {
                                        id: gearItem.id,
                                        tags: [
                                          ...gearItem.tags.map(
                                            (tag) => tag.name
                                          ),
                                          searchTerm,
                                        ],
                                      },
                                    })
                                  }}
                                  className="flex items-center rounded bg-teal-600 px-2 py-1 align-middle text-sm "
                                >
                                  {searchTerm}
                                </button>
                                <p className="flex items-center">
                                  for {andFormatter.format(gearItem.category)}
                                </p>
                              </div>
                              <div className="flex  gap-3 ">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setTagsModalOpen(false)
                                    addTag({
                                      variables: {
                                        name: searchTerm,
                                      },
                                    }).then(() => {
                                      //above query needs to complete before executing editGearItem
                                      //ToDo: refactor into useEffect with addTagResult.data
                                      editGearItem({
                                        variables: {
                                          id: gearItem.id,
                                          tags: [
                                            ...gearItem.tags.map(
                                              (tag) => tag.name
                                            ),
                                            searchTerm,
                                          ],
                                        },
                                      })
                                    })
                                  }}
                                  className="flex items-center rounded bg-teal-600 px-2 py-1 align-middle text-sm "
                                >
                                  {searchTerm}
                                </button>
                                <p className="flex items-center">
                                  for all items
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
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