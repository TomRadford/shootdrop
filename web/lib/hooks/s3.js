// import { gql, useQuery } from "@apollo/client"
// import { useEffect, useState } from "react"

// const useGetProfileImageUpload = () => {
//   const [url, setUrl] = useState(null)
//   const { data, loading } = useQuery(GET_PROFILE_IMAGE_UPLOAD, {
//     fetchPolicy: "network-only",
//   })
//   useEffect(() => {
//     if (!loading) {
//       setUrl(data.getProfileImageUpload)
//     }
//   }, [data])
//   return url
// }

// export { useGetProfileImageUpload }
