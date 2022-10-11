const Card = ({ children }) => {
  return (
    <div className=" rounded-xl bg-black bg-opacity-30  shadow-lg">
      <div className="px-6 py-4">{children}</div>
    </div>
  )
}
export default Card
