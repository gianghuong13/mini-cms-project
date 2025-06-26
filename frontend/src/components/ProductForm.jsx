import { useState } from "react"

const ProductForm = ({ onAdd }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!productName || !productPrice) return; 
        onAdd({ name:productName, price: parseInt(productPrice)})
        setProductName('')
        setProductPrice('')
    };

  return (
    <>
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Add product</button>
            </form>
        </div>
    </>
  )
}

export default ProductForm