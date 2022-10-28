import { useMutation, useQuery } from "@apollo/client"
import { ALL_TAGS, EDIT_GEAR_ITEM } from "../../lib/apollo/queries"
import { useState, Fragment } from "react"
import useGetMe from "../../lib/hooks/getMe"
import { Transition, Dialog } from "@headlessui/react"

const TagsModal = ({ setTagsModalOpen, tagsModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const me = useGetMe()
  const allTags = useQuery(ALL_TAGS, {
    variables: {
      tag: searchTerm,
    },
  })
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black px-10 py-5 text-left align-middle text-white shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Add a tag
                </Dialog.Title>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  tag search
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
