import { useEffect, useState } from "react"

const ProductForm = ({ productToEdit = null, onSubmit }) => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setProductId(productToEdit.id);
            setProductName(productToEdit.name);
            setProductPrice(productToEdit.price);
        } else {
            setProductId('');
            setProductName('');
            setProductPrice('');
        }
    }, [productToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!productId || !productName || !productPrice) return;

        const product = {  id:productId, name:productName, price: parseInt(productPrice) };

        onSubmit(product);

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