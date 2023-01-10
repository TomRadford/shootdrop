import Layout from "./layout"
import LoadingSpinner from "./elements/LoadingSpinner"
const Loading = ({ title }) => {
  return (
    <Layout>
      <div className="flex h-screen ">
        <div className="m-auto text-center">
          <div className="flex h-screen ">
            <div className="m-auto flex flex-col items-center gap-3 text-center">
              <p className="mx-4 text-sm text-gray-300">{title}</p>
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Loading
