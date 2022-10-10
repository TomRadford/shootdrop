import { useMutation, useQuery } from "@apollo/client"
import Layout from "../components/layout"
import Loading from "../components/Loading"
import Notification from "../components/Notification"
import { ME, EDIT_ME } from "../lib/apollo/queries"
import Card from "../components/Card"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"

const MePage = () => {
  const [newPassword, setNewPassword] = useState("")
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [messageData, setMessageData] = useState({ message: "", type: "" })
  const router = useRouter()
  const { data, loading } = useQuery(ME)
  const [editUser, editUserResult] = useMutation(EDIT_ME)
  useEffect(() => {
    if (!loading) {
      if (data.me) {
        setUsername(data.me.username)
        setFullName(data.me.fullName ? data.me.fullName : "")
        setProfilePicture(
          data.me.profilePicture ? data.me.profilePicture : `/img/roger.jfif`
        )
      } else {
        router.push("/login")
      }
    }
  }, [data])
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({
      variables: {
        username: username,
        fullName: fullName,
      },
    })
    editUser({
      variables: {
        username: username,
        fullName: fullName,
      },
    })
    console.log(editUserResult)
    setMessageData({ message: "Account updated!", type: "info" })
  }
  if (loading) {
    console.log("loading")
    return <Loading />
  }
  console.log(profilePicture)

  return (
    <>
      <Head>
        <title>My account | ShootDrop</title>
      </Head>
      <Layout>
        <div className="flex h-screen ">
          <div className="m-auto text-center">
            <form onSubmit={handleSubmit}>
              {profilePicture && (
                <Image
                  src={profilePicture}
                  width="100px"
                  height="100px"
                  className="mb-10 rounded-full"
                  objectFit="cover"
                />
              )}
              <input
                className="block bg-transparent text-center text-lg font-bold text-white"
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                placeholder="Full Name"
              />
              <Card>
                <div className="mt-10 p-3">
                  <span className="mt-1 block text-left text-sm font-light after:ml-0.5 after:text-red-500 after:content-['*']">
                    Email
                  </span>
                  <input
                    className="block bg-transparent"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  <span className=" mt-3 block text-left text-sm font-light after:ml-0.5 after:text-red-500 after:content-['*']">
                    Password
                  </span>
                  <input
                    className="block bg-transparent"
                    type="password"
                    value={newPassword}
                    onChange={({ target }) => setNewPassword(target.value)}
                  />
                </div>
              </Card>
              <button
                type="submit"
                className="mt-10 rounded-lg bg-gray-900 px-4 py-2"
              >
                Save
              </button>
            </form>
            <div className="mt-4">
              <Notification
                messageData={messageData}
                setMessageData={setMessageData}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MePage
