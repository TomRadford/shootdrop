import { Menu as HeadlessMenu, Transition } from '@headlessui/react'

const Menu = ({
	children,
	button,
}: {
	children: React.ReactNode
	button: React.ReactNode
}) => {
	return (
		<div className="relative w-24">
			<HeadlessMenu>
				<HeadlessMenu.Button className=" rounded border border-solid border-slate-600 p-2 transition-colors duration-300 hover:bg-slate-900">
					{button}
				</HeadlessMenu.Button>
				<Transition
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<HeadlessMenu.Items className="absolute mt-1 flex w-full flex-col justify-center gap-2 overflow-hidden rounded  border border-solid  border-slate-600">
						{children}
					</HeadlessMenu.Items>
				</Transition>
			</HeadlessMenu>
		</div>
	)
}

const Item = ({ children }: { children: React.ReactNode }) => {
	return (
		<HeadlessMenu.Item>
			<button className="transition-colors hover:bg-slate-900">
				{children}
			</button>
		</HeadlessMenu.Item>
	)
}

Menu.Item = Item

export default Menu
