import Image from 'next/image'
import { User } from '../../__generated__/graphql'

const ModalUser = ({ user }: { user: User }) => (
	<div className="flex flex-row items-center gap-4">
		<Image
			src={user.profilePicture ? user.profilePicture : `/img/default_user.png`}
			key={user.id}
			width="40"
			height="40"
			className={`rounded-full`}
			objectFit="cover"
			alt={user.fullName}
		/>
		<div className="text-sm font-light">{user.fullName}</div>
	</div>
)

export default ModalUser
