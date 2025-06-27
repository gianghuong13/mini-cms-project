

const ProductList = ({ products, onEdit, onDelete }) => {

    return (
        <div style={{display: 'flex'}}>
            {products.map((p, idx) => (
                <div key={idx} style={{border: '2px solid', margin: '5px', padding: '12px', borderRadius: '25px', width: '150px'}}>
                    <h4>{p.name}</h4>
                    <p>{p.price} VND</p>
                    <button onClick={() => onEdit(p, idx)}>Edit</button>
                    <button onClick={() => onDelete(idx)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default ProductList