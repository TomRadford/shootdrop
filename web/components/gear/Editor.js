import { useState } from 'react'
import useGetMe from '../../lib/hooks/getMe'
import AddCard from '../AddCard'
import GearDescription from './Description'
import GearHeader from './Header'
import GearPreference from './Preference'
import GearTags from './TagsList'
import TagsModal from './TagsModal'
import GearImage from './Image'
import ImageInput from '../ImageInput'
import Card from '../Card'
import { makeWEBP, toBase64 } from '../../lib/image/resizer'
import { getGearImageUpload } from '../../lib/image/upload'
import axios from 'axios'
import { useMutation } from '@apollo/client'
import { ADD_GEAR_IMAGE, ALL_GEAR_ITEMS } from '../../lib/apollo/queries'
import { useHorizontalScroll } from '../../lib/hooks/scroll'
const GearEditor = ({ children, gearItem }) => {
	const [tagsModalOpen, setTagsModalOpen] = useState(false)
	const [uploading, setUploading] = useState(false)
	const [addGearImage, addGearImageResult] = useMutation(ADD_GEAR_IMAGE, {
		update: (cache, response) => {
			cache.updateQuery(
				{ query: ALL_GEAR_ITEMS, variables: { id: gearItem.id } },
				({ allGearItems }) => {
					return {
						allGearItems: {
							gearItems: [
								{
									...allGearItems.gearItems[0],
									images: [
										...allGearItems.gearItems[0].images,
										response.data.addGearImage,
									],
								},
							],
							totalDocs: null,
						},
					}
				}
			)
		},
	})
	const me = useGetMe()
	const scrollRef = useHorizontalScroll()

	const handleImageChange = async ({ target }) => {
		if (target.files.length === 0) {
			return
		}
		// Resizes image to 2MP/1080p image which should be
		// good enough for long-term image database
		try {
			setUploading(true)
			const newImage = await makeWEBP(target.files[0], 1920, 1080)
			const uploadUrl = await getGearImageUpload(gearItem.id)
			await axios.put(uploadUrl, newImage)
			//reformat upload url to use images.shootdrop.com for public access
			//through cloudflare
			let publicUrl = ''
			if (process.env.NODE_ENV === 'production') {
				publicUrl = `https://${uploadUrl.slice(35).split('?')[0]}`
			} else {
				publicUrl = `${uploadUrl.split('?')[0]}`
			}
			addGearImage({
				variables: {
					gearItem: gearItem.id,
					url: publicUrl,
				},
			})
			setUploading(false)
			target.value = null
		} catch (e) {
			console.error(e)
			window.alert(e.message)
			setUploading(false)
		}
	}

	return (
		<div className="flex h-full min-h-screen">
			<div className="mb-10 w-full pt-16 text-center md:mx-3 md:pt-6">
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
									<div className="mx-auto w-80 sm:w-96">
										<Card>
											<GearTags
												gearItem={gearItem}
												setTagsModalOpen={setTagsModalOpen}
											/>
										</Card>
									</div>
								</div>
							</div>
							<div className="mx-6 2xl:mx-48">
								<h3 className="my-4 text-center  text-lg text-gray-200">
									{gearItem.allPrefs.length > 0 ? (
										<>Preferences</>
									) : (
										me && <>Preferences</>
									)}
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
							<div>
								<h3 className="my-4 text-center text-lg text-gray-200">
									{gearItem.images.length > 0 ? <>Photos</> : me && <>Photos</>}
								</h3>
								<div className="flex justify-center">
									<div
										// hack to get regular scroll working on 2xl viewport
										// ToDo: relook this hack, currently only changes on render
										ref={window.innerWidth < 1536 ? scrollRef : undefined}
										className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 whitespace-wrap mx-2 flex  items-center gap-3 overflow-x-scroll py-2 md:gap-6 2xl:flex-wrap 2xl:justify-center"
									>
										{gearItem.images.map((gearImage, i) => (
											<GearImage
												key={gearImage.id}
												gearImage={gearImage}
												alt={`Image ${i + 1} of the ${gearItem.model} `}
												gearItemId={gearItem.id}
											/>
										))}
										{me && (
											<div className="rounded-lg last:mr-4 only:mr-0">
												<ImageInput onChange={handleImageChange}>
													<Card>
														<div className="flex h-[16rem] w-[16rem] items-center justify-center md:h-[18rem] md:w-[18rem] xl:h-[22rem] xl:w-[22rem]">
															{uploading ? (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth="1.5"
																	stroke="currentColor"
																	className="h-8 w-8 animate-spin stroke-slate-500"
																	aria-label="Loading content"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
																	/>
																</svg>
															) : (
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
																		d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
																	/>
																</svg>
															)}
														</div>
													</Card>
												</ImageInput>
											</div>
										)}
									</div>
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
