import iphoneImage from '../assets/iphone.jpg'
import { Link } from 'react-router-dom';
import Button from './Button'
import { useAuth } from '../contexts/AuthContext';

const ProductList = ({ products, onDelete }) => {

    const { user } = useAuth();
    const canEditOrDelete = () => {
        if (!user || !user.roles) return false;
        return user.roles.includes('admin') || user.roles.includes('editor');
    };

    return (
        <div className="flex">
            {products.map(product => (
                <div key={product.id} className="w-60 border border-gray-300 rounded-lg p-3 m-3 shadow-lg">
                    <img 
                        src={iphoneImage} 
                        alt="product image"
                    />
                    <h4 className="text-lg font-semibold mt-2">{product.name}</h4>
                    <p className='text-gray-400 mb-2'>{product.price} VND</p>
                    {canEditOrDelete() && (
                        <Link to={`/products/edit/${product.id}`}>
                            {/* <button 
                                className='bg-green-500 px-2 py-1 mx-2 rounded-md text-white'
                            >
                                Edit
                            </button> */}
                            <Button className='bg-green-500'>
                                Edit
                            </Button>
                        </Link>
                    )}

                    
                    {/* <button 
                        onClick={() => onDelete(product.id)}
                        className='bg-gray-500 px-2 py-1 rounded-md text-white'
                        >Delete
                    </button> */}
                    {canEditOrDelete() && (
                    <Button 
                        onClick={() => onDelete(product.id)}
                        className='bg-gray-500'
                    >
                        Delete
                    </Button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ProductList