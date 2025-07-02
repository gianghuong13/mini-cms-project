import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductForm from "../components/ProductForm"

const AddProductPage = () => {
    const navigate = useNavigate();
    
    const handleAddProduct = async (product) => {
        try {
            await axios.post('http://localhost:1337/api/products', product);
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