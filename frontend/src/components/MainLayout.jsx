import Header from "./Header"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className='h-screen flex flex-col px-3'>
        <Header />

        <div className='flex flex-1 overflow-hidden'>
            <Sidebar />
            <main className='flex-1 p-6 overflow-y-auto bg-white'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default MainLayout