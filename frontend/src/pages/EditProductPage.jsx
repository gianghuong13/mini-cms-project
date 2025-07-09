import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import ProductForm from "../components/ProductForm";

const EditProductPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error("Fail to fetch product:", err.message));
    }, [id]);

    const handleEditProduct = async (product) => {
        try {
            await api.put(`/products/${id}`, product);
            navigate("/products");
        } catch (err) {
            console.error("Fail to update product:", err.message);
        }
    };
  return (
    <div>
        {product ? (
            <ProductForm productToEdit={product} onSubmit={handleEditProduct}/>
        ) : (
            <p>Loading..</p>
        )}

    </div>
  )
}

export default EditProductPage