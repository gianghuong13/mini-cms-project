import { useState, useEffect } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  const [theme, setTheme] = useState("light");

  useEffect (() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.className = initialTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  return (

    <div className='h-screen flex flex-col px-3'>
        <Header onToggleItem={toggleTheme} theme={theme}/>

        <div className='flex flex-1 overflow-hidden'>
            <Sidebar />
            <main className='flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-900 dark:text-white'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default MainLayout