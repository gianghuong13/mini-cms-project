import { useState, useEffect } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const MainLayout = () => {
  const [theme, setTheme] = useState("light");
  const [visitTime, setVisitTime] = useState('');

  useEffect (() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.className = initialTheme;
  }, []);

  localStorage.setItem('lastVisit', new Date().toISOString());
    
  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit) {
      setVisitTime(new Date(lastVisit).toLocaleString());
    } else {
      setVisitTime("This is your first time");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  return (

    <div className='flex flex-col min-h-screen dark:bg-gray-900'>
        <Header onToggleItem={toggleTheme} theme={theme}/>

        <div className='flex flex-1 overflow-hidden'>
            <Sidebar />
            <main className='flex-1 flex-col p-6 overflow-y-auto bg-white dark:bg-gray-900 dark:text-white'>
                <Outlet />
            </main>
        </div>

        <Footer>
          {visitTime}
        </Footer>
    </div>
  )
}

export default MainLayout