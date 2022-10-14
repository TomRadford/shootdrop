import Resizer from "react-image-file-resizer"

const makeWEBP = (file, maxHeight, maxWidth) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri)
      }
    )
  })

export { makeWEBP }
