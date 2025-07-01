import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [productToEdit, setProductToEdit] = useState(null);

    useEffect(() => {
      axios.get("http://localhost:1337/api/products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
    }, []);

    const handleAddProduct = (newProduct) => {
      setProducts([...products, newProduct]);
    }

    const selectEditProduct = (productId) => {
      const product = products.find(p => p.id === productId)
      setProductToEdit(product);
    }

    const handleEditProduct = (editedProduct) => {
      const updatedList = products.map(p => p.id === editedProduct.id ? editedProduct : p);
      setProducts(updatedList);
      setProductToEdit(null);
    }

    const handleDeleteProduct = async (productId) => {
      try {
        const res = await axios.delete(`http://localhost:1337/api/products/${productId}`);
        const newList = products.filter(p => p.id !== productId);
        setProducts(newList);
      } catch (err) {
        console.error("Fail to delete product", err.message);
      }
    }
    
  return (
    <div className='h-screen flex flex-col px-3'>
        <header className='bg-gray-200 shadow px-6 py-5 flex justify-between items-center'>
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
            />

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && products && (
              <ProductList 
                products={products}
                onEdit={selectEditProduct}
                onDelete={handleDeleteProduct}
              />
            )}

          </main>
        </div>
    </div>
  );
}

export default App
