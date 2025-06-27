import { useEffect, useState } from "react"

const ProductForm = ({ onAdd, onEdit, productToEdit, editIndex }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setProductName(productToEdit.name);
            setProductPrice(productToEdit.price);
        }
    }, [productToEdit])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!productName || !productPrice) return; 
        const newProduct = {  name:productName, price: parseInt(productPrice) };
        if (editIndex !== null) {
            onEdit(editIndex, newProduct);
        } else {
            onAdd(newProduct);
        }

        setProductName('')
        setProductPrice('')
    };

  return (
    <>
        <div>
            <form onSubmit={handleSubmit}>
                <h3>{editIndex !== null ? 'Edit Product' : 'Add product'}</h3>
                <div>
                    <label htmlFor="name">Product Name:
                        <input 
                            type="text" 
                            id="name" 
                            value={productName}
                            onChange={e => setProductName(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="price">Product Price:
                        <input 
                            type="number" 
                            id="price"
                            value={productPrice}
                            onChange={e => setProductPrice(e.target.value)}/>
                    </label>
                </div>
                <button type="submit">{editIndex !== null ? "Edit" : "Add"}</button>
            </form>
        </div>
    </>
  )
}

export default ProductForm