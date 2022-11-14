import Link from "next/link"
import Card from "./Card"

export const AddButton = ({ onClick, title }) => (
  <button className={`relative mx-auto w-80 sm:w-96`}>
    <Card>
      {title && (
        <div className="text-md absolute top-5 left-10 flex font-semibold">{`${
          title[0]
        }${title.slice(1).toLowerCase()}`}</div>
      )}
      <div className="flex h-44 items-center justify-center" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={4}
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="square"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </Card>
  </button>
)

const AddCard = ({ href, title, onClick }) =>
  href ? (
    <Link href={href}>
      <a>
        <AddButton />
      </a>
    </Link>
  ) : (
    <AddButton onClick={onClick} title={title} />
  )

export default AddCard
