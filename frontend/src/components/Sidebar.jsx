import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Info, User } from 'lucide-react'
import { useHasRole } from '../hooks/useRole'

const Sidebar = () => {
  const location = useLocation()

  const linkClasses = (path) =>
    `flex items-center space-x-2 p-2 rounded-xl transition ${
      location.pathname === path
        ? 'bg-green-700 font-semibold'
        : 'hover:bg-green-400'
    }`

  const isAdmin = useHasRole('admin');
  const isEditor = useHasRole('editor');
  const isViewer = useHasRole('viewer'); 

  return (
    <aside className='bg-green-600 text-white w-64 min-h-screen p-5 shadow-md rounded-r-2xl'>
      <nav className='space-y-4'>
        <Link to="/dashboard" className={linkClasses('/dashboard')}>
          <LayoutDashboard className='w-5 h-5' />
          <span>Dashboard</span>
        </Link>

        {isAdmin && (
          <Link to="/users" className={linkClasses('/users')}>
            <User className='w-5 h-5'/>
            <span>Users</span>
          </Link>
        )}

        <Link to="/products" className={linkClasses('/products')}>
          <Package className='w-5 h-5' />
          <span>Products</span>
        </Link>

        <Link to="/about" className={linkClasses('/about')}>
          <Info className='w-5 h-5' />
          <span>About</span>
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
