import Image from 'next/image'
import { GearItem } from '../../__generated__/graphql'

const getSpan = (items: GearItem[], keyOffset: string) =>
	items.map((item) => (
		<span
			key={`${item.id}${keyOffset}`}
			className=" h-[200px] w-[200px] overflow-hidden  rounded-lg 2xl:h-[300px] 2xl:w-[300px]"
		>
			<Image
				src={item.images[0].url}
				width="300"
				height="300"
				alt=""
				objectFit="cover"
				draggable={false}
			/>
		</span>
	))

//One instance of Marquee
const MarqueeSection = ({ items }: { items: GearItem[] }) => (
	<>
		{getSpan(items, '')}
		{getSpan(items, 's')}
	</>
)
export default MarqueeSection
