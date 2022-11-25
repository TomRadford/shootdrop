import Card from "../../components/Card"
import { formatDistance, format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
const DropSummaryCard = ({ drop }) => {
  return (
    <Link href={`/drops/${drop.id}`} key={drop.id}>
      <a>
        <button className="mx-auto w-80 sm:w-96">
          <Card>
            <div className="flex flex-col gap-4 py-2 px-1 sm:px-4">
              <div className="flex flex-col gap-0">
                <h3 className="text-left text-base font-semibold">
                  {drop.project}
                </h3>
                <p className="text-left text-xs font-light text-gray-300">
                  {drop.client}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-left text-xs">
                    <p className="font-light text-gray-300">Gear Check</p>
                    {drop.gearCheckDate ? (
                      <p className="font-bold">
                        {format(new Date(drop.gearCheckDate), "d MMM yyyy")}
                      </p>
                    ) : (
                      <p>No date</p>
                    )}
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-light text-gray-300">Start Date</p>
                    {drop.startDate ? (
                      <p className="font-bold">
                        {format(new Date(drop.startDate), "d MMM yyyy")}
                      </p>
                    ) : (
                      <p>No date</p>
                    )}
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-light text-gray-300">Gear Wrap</p>
                    {drop.wrapDate ? (
                      <p className="font-bold">
                        {format(new Date(drop.wrapDate), "d MMM yyyy")}
                      </p>
                    ) : (
                      <p>No date</p>
                    )}
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-light text-gray-300">End Date</p>
                    {drop.endDate ? (
                      <p className="font-bold">
                        {format(new Date(drop.endDate), "d MMM yyyy")}
                      </p>
                    ) : (
                      <p>No date</p>
                    )}
                  </div>
                </div>
                <div className="text-left text-xs">
                  {drop.director && (
                    <div className="flex">
                      <p className="font-light text-gray-300">Dir</p>
                      <p className="font-bold">&#160; {drop.director}</p>
                    </div>
                  )}
                  {drop.dop && (
                    <div className="flex">
                      <p className="font-light text-gray-300">DP</p>
                      <p className="font-bold">&#160; {drop.dop}</p>
                    </div>
                  )}
                  {drop.soundie && (
                    <div className="flex">
                      <p className="font-light text-gray-300">SND</p>
                      <p className="font-bold">&#160; {drop.soundie}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pb-0">
                <p className="text-right text-xs text-gray-300">
                  Last edited{" "}
                  {formatDistance(new Date(drop.updatedAt), new Date())} ago
                </p>
                <div className="flex -space-x-2 self-start ">
                  {drop &&
                    drop.users.map((user) => (
                      <div key={user.id}>
                        <Image
                          alt={user.fullName}
                          src={user.profilePicture}
                          key={user.id}
                          width="20px"
                          height="20px"
                          className={`rounded-full`}
                          objectFit="cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        </button>
      </a>
    </Link>
  )
}

export default DropSummaryCard
