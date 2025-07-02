import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import Button from '../components/Button'
import ModalConfirm from '../components/ModalConfirm'
import Input from '../components/Input'

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [deletedProductId, setDeletedProductId] = useState(null);

    const [searchText, setSearchText] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    const handleDeleteRequest = (productId) => {
        setDeletedProductId(productId);
    }

    const confirmDeleteRequest = async () => {
        try {
            const res = await axios.delete(`http://localhost:1337/api/products/${deletedProductId}`);
            const newList = products.filter(p => p.id !== deletedProductId);
            setProducts(newList);
            setDeletedProductId(null);
        } catch (err) {
            console.error("Fail to delete product", err.message);
        }
    }

    const filteredProducts = useMemo(() => {
        return products.filter(product => 
            product.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [products, searchText]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Input 
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Search products..."
                />
                <div className='flex'>
                    <Link to={`/products/add`}>
                        <Button className='bg-green-500'>
                            Add product
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && products && (
                    <ProductList 
                        products={paginatedProducts}
                        onDelete={handleDeleteRequest}
                    />
                )}
            </div>

            <div className="mt-4 flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-2 py-1 border rounded ${currentPage === i + 1 ? "bg-green-500 text-white" : ""}`}
                        >
                        {i + 1}
                    </button>
                ))}
            </div>

            <ModalConfirm 
                isOpen={deletedProductId !== null}
                message="You sure ?"
                onClose={() => setDeletedProductId(null)}
                onConfirm={confirmDeleteRequest}
            />

        </div>
  )
}

export default ProductPage