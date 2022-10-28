import { useState } from "react"
import useGetMe from "../../lib/hooks/getMe"
import GearDescription from "./Description"
import GearHeader from "./Header"
import GearTags from "./TagsList"
import TagsModal from "./TagsModal"

const GearEditor = ({ children, gearItem }) => {
  const [tagsModalOpen, setTagsModalOpen] = useState(false)
  const me = useGetMe()

  return (
    <div className="flex h-full min-h-screen">
      <div className="w-full pt-16 text-center md:mx-3 md:pt-6">
        <form>
          <GearHeader gearItem={gearItem} />
          <TagsModal
            tagsModalOpen={tagsModalOpen}
            setTagsModalOpen={setTagsModalOpen}
          />
          {gearItem && (
            <div className="">
              <div className="m-auto mx-6 text-center">
                <div>
                  <GearDescription gearItem={gearItem} />
                </div>
                <div>
                  <GearTags
                    gearItem={gearItem}
                    setTagsModalOpen={setTagsModalOpen}
                  />
                </div>
              </div>
            </div>
          )}
          {children}
        </form>
      </div>
    </div>
  )
}

export default GearEditor
