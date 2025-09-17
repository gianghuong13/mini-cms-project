import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Sun, Moon } from "lucide-react"

const Header = ({ onToggleItem, theme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white shadow px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 dark:bg-gray-800 dark:text-white">
      <div className="text-green-600 font-bold text-xl">MyCMS</div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleItem}
          className="bg-gray-100 text-gray-500  rounded-full p-2 hover:bg-green-200 transition"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
        {user ? (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://ui-avatars.com/api/?name=User"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700">Account</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
              <a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
              <hr />
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
        ) : (
          <p>Login</p>
        )}
      </div>
    </header>
  );
};

export default Header;
