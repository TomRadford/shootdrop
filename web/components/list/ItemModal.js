import { Fragment } from "react"
import { Transition, Dialog } from "@headlessui/react"
import ItemQuantity from "./ItemQuantity"
import ItemPreference from "./ItemPreference"
import ItemComment from "./ItemComment"

const ItemModal = ({ list, gearListItem, userInDrop }) => {
  return (
    <Transition
      appear
      show={tagsModalOpen}
      as={Fragment}
      // afterLeave={() => setSearchTerm("")}
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
                  Choose your preferences
                </Dialog.Title>
                <div className="mx-4 my-2 flex flex-col ">
                  <ItemQuantity
                    listId={list.id}
                    gearListItem={data}
                    userInDrop={userInDrop}
                  />
                  <ItemComment
                    listId={list.id}
                    gearListItem={data}
                    userInDrop={userInDrop}
                  />
                  <ItemPreference
                    listId={list.id}
                    gearListItem={data}
                    userInDrop={userInDrop}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ItemModal
