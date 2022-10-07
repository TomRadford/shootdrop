import { useMutation, useQuery } from "@apollo/client"
import Layout from "../components/layout"
import Loading from "../components/Loading"
import { ME, EDIT_ME } from "../lib/apollo/queries"
import Card from "../components/Card"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"

const MePage = () => {
  const [newPassword, setNewPassword] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { data, loading } = useQuery(ME)
  const [editUser, editUserResult] = useMutation(EDIT_ME)
  const handleSubmit = (e) => {
    e.preventDefault()
    editUser({
      variables: {
        username: (username !== '') ? username : null,
        password: (newPassword !== '') ? newPassword : null,
        fullName: fullName
      }
    })
    console.log(editUserResult)
    setMessage('Account updated!')
  }
  useEffect(() => {
    if (data) {
      setUsername(data.me.username)
      setFullName((data.me.fullName) ? data.me.fullName : '')
    }
  }, [data])

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!data.me) {
    router.push('/login')
  }

  return (
    <>
      <Head>
        <title>ShootDrop: My account</title>
      </Head>
      <Layout>
        <div className="flex h-screen ">
          <div className="m-auto text-center">

            <form onSubmit={handleSubmit}>
              <Image
                src={data.me.profilePicture ? data.me.profilePicture : `/img/roger.jfif`}
                width="100px"
                height="100px"
                className="rounded-full mb-10"
                objectFit="cover"
              />
              <input className="font-bold text-lg text-white text-center block bg-transparent" value={fullName} onChange={({ target }) => setFullName(target.value)} placeholder="Full Name" />
              <Card>
                <div className="p-3">
                  <span className="mt-1 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-light text-left">
                    Email
                  </span>
                  <input className="block bg-transparent" value={username} onChange={({ target }) => setUsername(target.value)} />
                  <span className=" mt-3 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-light text-left">
                    Password
                  </span>
                  <input className="block bg-transparent" type="password" value={newPassword} onChange={({ target }) => setNewPassword(target.value)} />
                </div>

              </Card>
              <button type="submit" className="bg-gray-900 px-4 py-2 rounded-lg">Save</button>
            </form>
            <p>{message}</p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MePage