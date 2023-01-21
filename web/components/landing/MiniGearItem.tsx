import Image from 'next/image'
import Link from 'next/link'
import { GearItem } from '../../__generated__/graphql'
const whitePixel =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='

const MiniGearItem = ({ gearItem }: { gearItem: GearItem }) => (
	// Custom gearItem display for landing forked from GearItem
	<Link href={`/gear/${gearItem.id}`}>
		{/* ToDo: Consider target blank to open new tab
Disadvantage would be reloading app in new tab
*/}
		<a>
			<div className="relative overflow-hidden rounded-2xl hover:cursor-pointer">
				{gearItem.images.length > 0 ? (
					<>
						<Image
							src={gearItem.images[0].url}
							width="150px"
							height="150x"
							objectFit="cover"
							placeholder="blur"
							blurDataURL={whitePixel}
							alt={gearItem.model}
							className="rounded-2xl"
						/>
					</>
				) : (
					<Image
						src={`/img/default_gear.jpg`}
						width="150px"
						height="155px"
						objectFit="cover"
						placeholder="blur"
						blurDataURL={whitePixel}
						alt={gearItem.model}
					/>
				)}
				<div className="absolute bottom-[6px] flex w-full flex-col rounded-2xl bg-gradient-to-t from-[#000000b9] to-transparent px-3 pb-2 pt-12 text-left text-xs ">
					<h3 className="font-bold">{gearItem.manufacturer}</h3>
					<h3>{gearItem.model}</h3>
				</div>
			</div>
		</a>
	</Link>
)

export default MiniGearItem
