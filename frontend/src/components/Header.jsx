const Header = ({ onToggleItem, theme }) => {
  return (
    <header className='bg-gray-200 shadow px-6 py-5 flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Welcome to CMS</h1>
        <div className="flex">
          <div>Tài khoản</div>
          <div>
            <button
              onClick={onToggleItem}
              className="bg-blue-500 text-white px-3 py-1 mx-5 rounded"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </div>
    </header>
  )
}

export default Header