import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from "../components/layout"
import Card from "../components/Card"
import { LOGIN, ME } from '../lib/apollo/queries'
import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
const LoginCard = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const [login, result] = useMutation(LOGIN, {
    onError: (e) => setErrorMessage(e.graphQLErrors[0].message)
  })
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem("shootdrop-user-token", token)
      setUsername('')
      setPassword('')

      router.push('/drops')
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()
    login({
      variables: {
        username,
        password
      }
    })
  }
  return (
    <Card>
      <div className="p-10">
        <h2 className="text-xl font-bold mb-4">Please login</h2>
        <form onSubmit={handleLogin}>
          <input className="bg-transparent" placeholder="Email" type="email" value={username} onChange={({ target }) => setUsername(target.value)} />
          <br />
          <input
            className="block bg-transparent"
            placeholder="Password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            required
          />
          <p className='text-red-600'>{errorMessage}</p>
          <button type="submit" className='mt-4'>Login</button>
        </form>

      </div>
    </Card>
  )
}

const LoginPage = () => {
  const router = useRouter()
  const { loading, data } = useQuery(ME)

  if (loading) return (
    <Loading />
  )

  return (
    <>
      <Head>
        <title>ShootDrop: Login</title>
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
