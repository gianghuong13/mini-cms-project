import iphoneImage from '../assets/iphone.jpg'

const ProductList = ({ products, onEdit, onDelete }) => {

    return (
        <div className="flex">
            {products.map((p, idx) => (
                <div key={idx} className="w-60 border border-gray-300 rounded-lg p-3 m-3 shadow-lg">
                    <img 
                        src={iphoneImage} 
                        alt="product image"
                    />
                    <h4 className="text-lg font-semibold mt-2">{p.name}</h4>
                    <p className='text-gray-400 mb-2'>{p.price} VND</p>
                    <button 
                        onClick={() => onEdit(p, idx)}
                        className='bg-green-500 px-2 py-1 mx-2 rounded-md text-white'
                        >Edit
                    </button>
                    <button 
                        onClick={() => onDelete(idx)}
                        className='bg-gray-500 px-2 py-1 rounded-md text-white'
                        >Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ProductList