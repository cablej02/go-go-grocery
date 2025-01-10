const GroceryItems = ({ items }) => {
    return (
        <div>
            <h3>Grocery List Items</h3>
            <ul className="list-group">
                {items.map((item) => (
                    <li key={item.id} className="list-group-item">
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroceryItems;