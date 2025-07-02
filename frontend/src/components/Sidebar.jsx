import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='bg-emerald-500 text-white w-64 p-4 overflow-y-auto rounded-md'>
        <nav className='space-y-2'>
            <Link to={`/dashboard`} className='block p-2 rounded-2xl hover:bg-green-400'>Dashboard</Link>
            <Link to={`/products`} className='block p-2 rounded-2xl hover:bg-green-400'>Products</Link>
            <Link to={`/about`} className='block p-2 rounded-2xl hover:bg-green-400'>About</Link>
        </nav>
    </aside>
  )
}

export default Sidebar