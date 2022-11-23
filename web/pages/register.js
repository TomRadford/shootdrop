import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../components/layout"
import Notification from "../components/Notification"
import Card from "../components/Card"
import { CREATE_USER, LOGIN, ME } from "../lib/apollo/queries"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { useCallback, useEffect, useState } from "react"
import Loading from "../components/Loading"
import Link from "next/link"
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3"

const RegisterCard = () => {
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [messageData, setMessageData] = useState({ message: "", type: "" })
  const { executeRecaptcha } = useGoogleReCaptcha()
  const router = useRouter()
  const me = useQuery(ME)
  const [login, result] = useMutation(CREATE_USER, {
    onError: (e) =>
      setMessageData({ message: e.graphQLErrors[0].message, type: "error" }),
  })
  useEffect(() => {
    if (!me.loading) {
      if (me.data.me) {
        //replace used instead of push
        //to prevent /login from being
        //added to history stack
        // router.replace("/drops")
      }
    }
  }, [me.data])
  useEffect(() => {
    if (result.loading) {
      setMessageData({ message: "Registering!", type: "info" })
    }
  }, [result.loading])
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem("shootdrop-user-token", token)
      me.refetch() //To invalidate null "me" in cache
      setFullName("")
      setUsername("")
      setPassword("")
    }
  }, [result.data])

  const handleLogin = () => {
    login({
      variables: {
        fullName,
        username,
        password,
      },
    })
  }

  const handleReCaptchaVerify = useCallback(
    async (e) => {
      e.preventDefault()
      if (executeRecaptcha) {
        console.log(await executeRecaptcha("createUser"))
      } else {
        setMessageData({
          message: "Unable to ReCaptcha, please try again.",
          type: "error",
        })
      }
    },
    [executeRecaptcha]
  )

  return (
    <div className="w-[17rem]">
      <div className="mb-4">
        <h2 className="mb-3 text-xl font-semibold">
          Register or{" "}
          <Link href="/login">
            <a className="font-bold underline">login</a>
          </Link>
        </h2>
        <p className="font-light">
          Fill in the details below to join early access!
        </p>
      </div>
      <Card>
        <form onSubmit={handleReCaptchaVerify}>
          <input
            className="bg-transparent"
            placeholder="Your full name"
            type="text"
            value={fullName}
            autoComplete="name"
            onChange={({ target }) => setFullName(target.value)}
            required
          />
          <br />
          <input
            className="bg-transparent"
            placeholder="Email"
            type="email"
            value={username}
            autoComplete="email"
            onChange={({ target }) => setUsername(target.value)}
            required
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
            Register
          </button>
          <div id="registerCaptchaContainer"></div>
        </form>
      </Card>
    </div>
  )
}

const LoginPage = () => {
  const { loading, data } = useQuery(ME)

  if (loading) return <Loading />

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      container={{
        element: "registerCaptchaContainer",
        parameters: {
          badge: "inline",
          theme: "dark",
        },
      }}
    >
      <Head>
        <title>Registration | ShootDrop</title>
      </Head>
      <Layout>
        <div className="flex h-screen ">
          <div className="m-auto text-center">
            <RegisterCard />
          </div>
        </div>
      </Layout>
    </GoogleReCaptchaProvider>
  )
}

export default LoginPage
export { RegisterCard }
