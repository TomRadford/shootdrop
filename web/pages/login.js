import Layout from "../components/layout"
import Card from "../components/Card"
const LoginCard = () => {
  return (
    <Card>
      <div className="p-4">
        <h2 className="text-xl font-bold">Please login</h2>
        <form>
          <input className="bg-transparent" placeholder="Email" type="email" />
          <br />
          <input
            className="block bg-transparent"
            placeholder="Password"
            type="password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </Card>
  )
}

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex h-screen ">
        <div className="m-auto text-center">
          <LoginCard />
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage
export { LoginCard }
