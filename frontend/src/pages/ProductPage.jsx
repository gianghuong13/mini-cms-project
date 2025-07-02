import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
    <div>
        <div className='flex'>
            <Link to={`/products/add`}>
                <button className='bg-green-500 px-2 py-1 mx-2 rounded-md text-white'>
                    Add product
                </button>
            </Link>
        </div>
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && products && (
                <ProductList 
                    products={products}
                    onDelete={handleDeleteProduct}
                />
            )}
            </div>
    </div>
  )
}

export default ProductPage