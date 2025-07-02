const Button = ({ children, onClick, className="" }) => {
  return (
    <button
        onClick={onClick}
        className={`px-2 py-1 mx-2 rounded-md text-white ${className}`}
    >
        {children}
    </button>
  )
}

export default Button