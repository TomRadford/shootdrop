import Link from "next/link"
import Card from "./Card"
const AddCard = ({ href, title }) => {
  return (
    <Link href={href}>
      <button className="mx-auto w-80 sm:w-96">
        <Card>
          <div className="flex h-44 items-center justify-center">
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
    </Link>
  )
}

export default AddCard
