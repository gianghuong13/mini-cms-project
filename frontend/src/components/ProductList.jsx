

const ProductList = () => {
    const products = [
        {name: "iphone", price: 12345},
        {name: "macbook", price: 124356},
        {name: "airpods", price: 1234656}
    ];

    return (
        <div style={{display: 'flex'}}>
            {products.map( (p, idx) => (
                <div key={idx} style={{border: '2px solid', margin: '5px', padding: '12px', borderRadius: '25px', width: '150px'}}>
                    <h4>{p.name}</h4>
                    <p>{p.price.toLocaleString()} VND</p>
                </div>
            ))}
        </div>
    )
}

export default ProductList