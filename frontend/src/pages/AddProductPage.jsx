import { useNavigate } from "react-router-dom";
import api from "../api/api";
import ProductForm from "../components/ProductForm"

const AddProductPage = () => {
    const navigate = useNavigate();
    
    const handleAddProduct = async (product) => {
        try {
            await api.post('/products', product);
            navigate('/products');
        } catch (err) {
            console.error("Fail to add product:", err.message);
        }
    };
    
    return (
        <div>
            <ProductForm onSubmit={handleAddProduct} />
        </div>
    )
}

export default AddProductPage