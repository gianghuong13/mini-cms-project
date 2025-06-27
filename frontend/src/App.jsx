import { useState, useEffect } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {
    const [products, setProducts] = useState([{name: "iphone", price: 12345},
        {name: "macbook", price: 124356},
        {name: "airpods", price: 1234656}])

    const [productToEdit, setProductToEdit] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    const handleAddProduct = (newProduct) => {
      setProducts([...products, newProduct]);
    };

    const selectEditProduct = (product, idx) => {
      setProductToEdit(product);
      setEditIndex(idx)
    }

    const handleEditProduct = (idx, editedProduct) => {
      const newList = [...products];
      newList[idx] = editedProduct;
      setProducts(newList);

      setProductToEdit(null);
      setEditIndex(null);
    }

    const handleDeleteProduct = (idx) => {
      const newList = [...products];
      newList.splice(idx, 1);
      setProducts(newList);
    }
    
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
          <ProductForm 
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            productToEdit={productToEdit}
            editIndex={editIndex}/>
          <ProductList 
            products={products} 
            onEdit={selectEditProduct}
            onDelete={handleDeleteProduct}/>
        </main>
      </div>
    </>
  )
}

export default App
