import { useState, useEffect, useMemo } from 'react'
import api from '../api/api'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const fetchProducts  = () => {
        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page")) || 1;
        
        setSearchText(search);
        setCurrentPage(page);

        setLoading(true);
        api.get("/products", {
            params: {search, page, limit: itemsPerPage}
        })
        .then(response => {
            setProducts(response.data.products);
            const totalItems = response.data.total;
            setTotalPages(Math.ceil(totalItems / itemsPerPage));
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    };

    useEffect(() => {
       fetchProducts();
    }, [searchParams]);

    const handleSearchSubmit = (e) => {
        if (e.key === "Enter") {
            const params = new URLSearchParams();
            if (searchText.trim() !== '') params.set('search', searchText);
            navigate(`/products?${params.toString()}`);
        }
    };

    const goToPage = (page) => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchText.trim() !== "") params.set('search', searchText);
        params.set('page', page);
        navigate(`/products?${params.toString()}`);
    };

    const handleDeleteRequest = (productId) => {
        setDeletedProductId(productId);
    }

    const confirmDeleteRequest = async () => {
        try {
            await api.delete(`/products/${deletedProductId}`);

            fetchProducts();

            setDeletedProductId(null);
        } catch (err) {
            console.error("Fail to delete product", err.message);
        }
    }


    return (
        <div>
            <div className='flex justify-between items-center'>
                <Input 
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    onKeyDown={handleSearchSubmit}
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
                        products={products}
                        onDelete={handleDeleteRequest}
                    />
                )}
            </div>

            <div className="mt-4 flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
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