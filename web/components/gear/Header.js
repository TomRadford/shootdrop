import useGetMe from "../../lib/hooks/getMe"
import { useRouter } from "next/router"
import { useState } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })

const GearHeader = ({ GearItem }) => {
  const [category, setCategory] = useState([])
  const [model, setModel] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const me = useGetMe()
  const router = useRouter()

  return (
    <>
      <header className="mx-auto flex justify-between gap-1 align-bottom">
        <div className=" flex flex-col items-center w-full">
          <div>
            <button className="flex text-xs text-gray-400" onClick={(e) => {
              e.preventDefault()
              setModalOpen(true)
            }}>{category.length > 0 ? formatter.format(category) : 'Select a category'}</button>

            <input
              placeholder="Manufacturer"
              className="bg-transparent text-left flex"
              value={model}
              onChange={({ target }) => setModel(target.value)}
              disabled={!me}
            />

            <TextareaAutosize
              name="name"
              className="resize-none whitespace-pre-wrap bg-transparent text-left text-xl font-bold md:text-3xl"
              placeholder="Model"
              autoComplete="off"
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
              value={manufacturer}
              onChange={({ target }) => setManufacturer(target.value)}
              disabled={!me}
            />
          </div>
        </div>
      </header>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setModalOpen(false)}>
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
                    Select categories
                  </Dialog.Title>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['CAMERA', 'LIGHTING', 'GRIPS', 'SOUND'].map(cat =>
                      <div className="flex flex-col items-center">
                        <button key={cat}
                          onClick={() => {
                            if (category.includes(cat)) {
                              setCategory(category.filter(item =>
                                item !== cat && item
                              ))
                            } else {
                              setCategory([...category, cat])
                            }
                          }}
                          className={`font-sm bg-slate-900 w-fit py-1 px-2 rounded-lg ${!category.includes(cat) && 'opacity-60'}`}
                        >{`${cat.charAt(0)}${cat.slice(1).toLowerCase()}`}</button>
                      </div>
                    )

                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default GearHeader