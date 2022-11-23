import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../components/layout"
import Notification from "../components/Notification"
import Card from "../components/Card"
import { LOGIN, ME } from "../lib/apollo/queries"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import Link from "next/link"

const LoginCard = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [messageData, setMessageData] = useState({ message: "", type: "" })
  const router = useRouter()
  const me = useQuery(ME)
  const [login, result] = useMutation(LOGIN, {
    onError: (e) =>
      setMessageData({ message: e.graphQLErrors[0].message, type: "error" }),
  })
  useEffect(() => {
    if (!me.loading) {
      if (me.data.me) {
        //replace used instead of push
        //to prevent /login from being
        //added to history stack
        router.replace("/drops")
      }
    }
  }, [me.data])
  useEffect(() => {
    if (result.loading) {
      setMessageData({ message: "Logging in!", type: "info" })
    }
  }, [result.loading])
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem("shootdrop-user-token", token)
      me.refetch() //To invalidate null "me" in cache
      setUsername("")
      setPassword("")
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()
    login({
      variables: {
        username,
        password,
      },
    })
  }
  return (
    <div className="">
      <h2 className="mb-4 text-xl font-semibold">
        Please login or{" "}
        <Link href="/register">
          <a className="font-bold underline">register</a>
        </Link>
      </h2>
      <Card>
        <form onSubmit={handleLogin}>
          <input
            className="bg-transparent"
            placeholder="Email"
            type="email"
            value={username}
            autoComplete="email"
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <input
            className="block bg-transparent"
            placeholder="Password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            autoComplete="current-password"
            required
          />
          <Notification
            messageData={messageData}
            setMessageData={setMessageData}
          />
          <button type="submit" className="mt-4">
            Login
          </button>
        </form>
      </Card>
    </div>
  )
}

const LoginPage = () => {
  const { loading, data } = useQuery(ME)

  if (loading) return <Loading />

  return (
    <>
      <Head>
        <title>Login | ShootDrop</title>
      </Head>
      <Layout>
        <div className="flex h-screen ">
          <div className="m-auto text-center">
            <LoginCard />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default LoginPage
export { LoginCard }
