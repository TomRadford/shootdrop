import { useMutation, useQuery, useLazyQuery } from "@apollo/client"
import Layout from "../components/layout"
import Loading from "../components/Loading"
import Notification from "../components/Notification"
import { ME, EDIT_ME, GET_PROFILE_IMAGE_UPLOAD } from "../lib/apollo/queries"
import Card from "../components/Card"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"
import useCheckAuth from "../lib/hooks/checkAuth"
import { makeWEBP } from "../lib/image/resizer"
import axios from "axios"

const ImageInput = ({ className, stroke, onChange }) => (
  <label className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
    <input
      className="hidden"
      type="file"
      accept=".png,.jpg,.jpeg,.jfif"
      onChange={onChange}
    ></input>
  </label>
)

const MePage = () => {
  const [newPassword, setNewPassword] = useState("")
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [profilePictureBase64, setProfilePictureBase64] = useState("")
  const [messageData, setMessageData] = useState({ message: "", type: "" })
  useCheckAuth()
  const { data, loading } = useQuery(ME)
  const [editUser, editUserResult] = useMutation(EDIT_ME)
  const [getProfileImageUploadUrl, profileImageUpload] = useLazyQuery(
    GET_PROFILE_IMAGE_UPLOAD,
    { fetchPolicy: "network-only" }
  )
  useEffect(() => {
    if (!loading) {
      if (data.me) {
        setUsername(data.me.username)
        setFullName(data.me.fullName ? data.me.fullName : "")
        setProfilePicture(data.me.profilePicture ? data.me.profilePicture : "")
      }
    }
  }, [data])
  const handleSubmit = async (e) => {
    e.preventDefault()
    editUser({
      variables: {
        username: username,
        fullName: fullName,
      },
    })
    console.log(editUserResult)
    setMessageData({ message: "Account updated!", type: "info" })
  }

  useEffect(() => {
    if (profileImageUpload.data) {
      const uploadUrl = profileImageUpload.data.getProfileImageUpload
      axios.put(uploadUrl, profilePictureBase64).then((res) => {
        setProfilePicture(profileImageUpload.data)
      })
    }
  }, [profileImageUpload.data])

  const handleImage = async ({ target }) => {
    const newImage = await makeWEBP(target.files[0], 1024, 786)
    setProfilePictureBase64(newImage)
    getProfileImageUploadUrl()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Head>
        <title>My account | ShootDrop</title>
      </Head>
      <Layout>
        <div className="flex h-screen ">
          <div className="m-auto text-center">
            <form onSubmit={handleSubmit}>
              <div className="group relative mb-10 flex justify-center">
                {profilePicture ? (
                  <>
                    <Image
                      src={profilePicture}
                      width="150px"
                      height="150px"
                      objectFit="cover"
                      className="rounded-full"
                    />
                    <div className="absolute top-0 flex h-full w-[150px] justify-center rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-50">
                      <ImageInput
                        className="h-12 w-12"
                        stroke="black"
                        onChange={handleImage}
                      />
                    </div>
                  </>
                ) : (
                  <div className="group relative mb-10 flex flex-col items-center gap-5">
                    <p className="text-gray-300">
                      Click below to add a profile pic!
                    </p>
                    <div className="flex h-[150px] w-[150px] justify-center rounded-full  bg-black opacity-80 transition-opacity">
                      <ImageInput
                        className="h-12 w-12"
                        stroke="white"
                        onChange={handleImage}
                      />
                    </div>
                  </div>
                )}
              </div>
              <input
                className="mb-5 block w-full bg-transparent text-center text-lg font-bold text-white"
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                placeholder="Full Name"
              />
              <Card>
                <div className="">
                  <span className="mt-1 block text-left text-sm font-light after:ml-0.5 after:text-red-500 after:content-['*']">
                    Email
                  </span>
                  <input
                    className="block bg-transparent"
                    value={username}
                    autoComplete="email"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                  <span className=" mt-3 block text-left text-sm font-light after:ml-0.5 after:text-red-500 after:content-['*']">
                    Password
                  </span>
                  <input
                    className="block bg-transparent"
                    type="password"
                    autoComplete="new-password"
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
