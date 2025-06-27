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
        <div className="p-5 border shadow-lg">
            <form onSubmit={handleSubmit}>
                <h3 className="font-semibold text-lg">{editIndex !== null ? 'Edit Product' : 'Add product'}</h3>
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
                    {editIndex !== null ? "Edit" : "Add"}
                </button>
            </form>
        </div>
    </>
  )
}

export default ProductForm