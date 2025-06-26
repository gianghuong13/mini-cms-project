import { useState, useEffect } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {
    const [products, setProducts] = useState([{name: "iphone", price: 12345},
        {name: "macbook", price: 124356},
        {name: "airpods", price: 1234656}])

    const handleAddProduct = (newProduct) => {
      setProducts([...products, newProduct]);
    };
    
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
          <ProductForm onAdd={handleAddProduct}/>
          <ProductList products={products} />
        </main>
      </div>
    </>
  )
}

export default App
