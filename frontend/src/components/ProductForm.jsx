import { useEffect, useState } from "react"
import axios from 'axios'

const ProductForm = ({ onAdd, onEdit, productToEdit }) => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setProductId(productToEdit.id);
            setProductName(productToEdit.name);
            setProductPrice(productToEdit.price);
        }
    }, [productToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!productId || !productName || !productPrice) return;

        const newProduct = {  id:productId, name:productName, price: parseInt(productPrice) };

        try {
            if (productToEdit !== null) {
                const res = await axios.put(`http://localhost:1337/api/products/${productToEdit.id}`, newProduct);
                onEdit(res.data.product);
            } else {
                const res = await axios.post("http://localhost:1337/api/products", newProduct);
                onAdd(res.data.product);
            }

            setProductId('');
            setProductName('');
            setProductPrice('');

        } catch (err) {
            console.error("Fail to submit form", err.message);
        }

    };

  return (
    <>
        <div className="p-5 border shadow-lg">
            <form onSubmit={handleSubmit}>
                <h3 className="font-semibold text-lg">{productToEdit ? 'Edit Product' : 'Add product'}</h3>
                
                <div>
                    <input 
                        type="text" 
                        id="product_id"
                        placeholder="Product Id"
                        value={productId}
                        disabled={!!productToEdit}
                        onChange={e => setProductId(e.target.value)}
                        className="p-2 rounded-md bg-green-200 m-2"
                    />
                </div>
                
                <div>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Product Name"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        className="p-2 rounded-md bg-green-200 m-2"
                    />
    
                </div>

                <div>
                    <input 
                        type="number" 
                        id="price"
                        placeholder="Product Price"
                        value={productPrice}
                        onChange={e => setProductPrice(e.target.value)}
                        className="p-2 rounded-md bg-green-200 m-2"
                    />
                </div>

                <button 
                    type="submit"
                    className='bg-green-500 px-2 py-1 mx-2 rounded-md text-white'
                >
                    {productToEdit ? "Edit" : "Add"}
                </button>
            </form>
        </div>
    </>
  )
}

export default ProductForm