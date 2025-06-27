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
    <div className='h-screen flex flex-col px-3'>
        <header className='bg-gray-200 shadow px-6 py-10 flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Welcome to CMS</h1>
          <div>Tài khoản</div>
        </header>

        <div className='flex flex-1 overflow-hidden'>
          <aside className='bg-emerald-500 text-white w-64 p-4 overflow-y-auto rounded-md'>
            <nav className='space-y-2'>
              <a href="#" className='block p-2 rounded-2xl hover:bg-green-400'>Dashboard</a>
              <a href="#" className='block p-2 rounded-2xl hover:bg-green-400'>Products</a>
            </nav>
          </aside>
          <main className='flex-1 p-6 overflow-y-auto bg-white'>
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
    </div>
  );
}

export default App
