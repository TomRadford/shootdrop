import Layout from "../../components/layout"
import { useQuery } from "@apollo/client"
import { ME } from "../../lib/apollo/queries"
const DropsPage = () => {
  const me = useQuery(ME, {
    fetchPolicy: "network-only",
  })
  return (
    <Layout>
      <p>my drops go here</p>
    </Layout>
  )
}
export default DropsPage
