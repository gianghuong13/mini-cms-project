import { useState, useEffect } from 'react'
import './App.css'
import ProductList from './components/ProductList'

function App() {
  
  return (
    <>
      <header>
        <h1>This is header</h1>
      </header>
      <div className='main-layout'>
        <aside className='sidebar'>
          <ul>
            <li>Dashboard</li>
            <li>Products</li>
          </ul>
        </aside>
        <main className='content'>
          <ProductList />
        </main>
      </div>
    </>
  )
}

export default App
