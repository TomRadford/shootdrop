const ImageInput = ({ onChange, children }) => (
  <label className="flex cursor-pointer items-center">
    {children}
    <input
      className="hidden"
      type="file"
      accept=".png,.jpg,.jpeg,.jfif,.webp"
      onChange={onChange}
    />
  </label>
)

export default ImageInput
