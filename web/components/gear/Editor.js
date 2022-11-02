import { useState } from "react"
import useGetMe from "../../lib/hooks/getMe"
import AddCard from "../AddCard"
import GearDescription from "./Description"
import GearHeader from "./Header"
import GearPreference from "./Preference"
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

          {gearItem && (
            <>
              <TagsModal
                tagsModalOpen={tagsModalOpen}
                setTagsModalOpen={setTagsModalOpen}
                gearItem={gearItem}
              />
              <div className="mt-5 flex flex-wrap justify-center gap-4">
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
              <div className="mx-6 2xl:mx-48">
                <h3 className="my-4 text-left text-base text-gray-200">
                  Preferences
                </h3>
                <div className="flex flex-wrap justify-center gap-5">
                  {gearItem.allPrefs.map((gearPref) => (
                    <GearPreference
                      key={gearPref.id}
                      gearItem={gearItem}
                      gearPref={gearPref}
                    />
                  ))}
                  {me && <GearPreference gearItem={gearItem} />}
                </div>
              </div>
            </>
          )}
          {children}
        </form>
      </div>
    </div>
  )
}

export default GearEditor
