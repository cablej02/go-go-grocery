const AvailableProducts = ({ products }) => (
    <div>
        <h3>Available Products</h3>
        <ul className="list-group">
            {products.map((product) => (
                <li key={product.id} className="list-group-item">
                    {product.name}
                </li>
            ))}
        </ul>
    </div>
);

export default AvailableProducts;