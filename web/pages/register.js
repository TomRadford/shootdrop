import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../components/layout"
import Notification from "../components/Notification"
import Card from "../components/Card"
import { CREATE_USER, ME } from "../lib/apollo/queries"
import { useMutation, useQuery } from "@apollo/client"
import { useCallback, useEffect, useRef, useState } from "react"
import Loading from "../components/Loading"
import Link from "next/link"
import HCaptcha from "@hcaptcha/react-hcaptcha"

const RegisterCard = () => {
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [captchaToken, setCaptchaToken] = useState(null)
  const captchaRef = useRef(null)
  const [messageData, setMessageData] = useState({ message: "", type: "" })
  const router = useRouter()
  const me = useQuery(ME)
  const [login, result] = useMutation(CREATE_USER, {
    onError: (e) => {
      setMessageData({ message: e.graphQLErrors[0].message, type: "error" })
      captchaRef.current.resetCaptcha()
    },
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
  }, [me, router])

  useEffect(() => {
    if (result.loading) {
      setMessageData({ message: "Registering...", type: "info" })
    }
  }, [result.loading])
  useEffect(() => {
    if (result.data) {
      setFullName("")
      setUsername("")
      setPassword("")
      setCaptchaToken(null)
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!captchaToken) {
      setMessageData({
        message: `Please prove you're a human above`,
        type: "error",
      })
      return
    }
    login({
      variables: {
        fullName,
        username,
        password,
        captchaToken,
      },
    })
  }

  return (
    <div className="w-[17rem]">
      <div className="mb-4">
        <h2 className="mb-3 text-xl font-semibold">
          Register or{" "}
          <Link href="/login">
            <a className="font-bold underline">login</a>
          </Link>
        </h2>
        {!result.data && (
          <p className="font-light">
            Fill in the details below to join early access!
          </p>
        )}
      </div>
      {result.data ? (
        <Card>
          <div>
            <h1 className="mb-2 font-bold">Thanks for registering!</h1>
            <p className="text-sm">
              We'll send a mail to{" "}
              <span className="font-semibold">
                {result.data.createUser.username}
              </span>{" "}
              once your account is activated.
            </p>
          </div>
        </Card>
      ) : (
        <Card>
          <form onSubmit={handleLogin} className="flex flex-col gap-1">
            <input
              className="bg-transparent"
              placeholder="Your full name"
              type="text"
              value={fullName}
              autoComplete="name"
              onChange={({ target }) => setFullName(target.value)}
              required
            />

            <input
              className="bg-transparent lowercase"
              placeholder="Email"
              type="email"
              value={username}
              autoComplete="email"
              onChange={({ target }) => setUsername(target.value)}
              required
            />

            <input
              className="block bg-transparent"
              placeholder="Password"
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              autoComplete="current-password"
              required
            />
            <div className="mx-auto mt-2">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onVerify={(token, ekay) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                size="compact"
                theme="dark"
                ref={captchaRef}
              />
            </div>
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
      )}
    </div>
  )
}

const LoginPage = () => {
  const { loading, data } = useQuery(ME)

  if (loading) return <Loading />

  return (
    <>
      <Head>
        <title>Registration | ShootDrop</title>
      </Head>
      <Layout>
        <div className="flex h-screen flex-col">
          <div className="m-auto text-center">
            <RegisterCard />
            <div className="mx-auto mt-2 w-[10rem]">
              <p className="text-[10px] font-light">
                By registering you agree to our{" "}
                <Link href="/terms">
                  <a className="font-semibold">Terms and privacy policy</a>
                </Link>
              </p>
            </div>
            <p className="mt-5">
              Made by{" "}
              <a
                target="_blank"
                className="font-semibold"
                href="https://tomradford.co.za"
                rel="noreferrer"
              >
                Tom
              </a>{" "}
              🎥
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default LoginPage
export { RegisterCard }
