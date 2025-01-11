import { createGroceryListItem } from '../api/groceryListAPI.jsx';

const AvailableProducts = ({ products, selectedList, listItems, setListItems }) => {
    const handleAddListItem = async (listId, productId) => {
        try {
            const result = await createGroceryListItem(listId, productId, 1);
            if (result) {
                console.log("Item added to list");
                // Update the list items
                setListItems([
                    ...listItems,
                    { ...result }
                ]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h3>Available Products</h3>
            <ul className="list-group">
                {products.map((product) => (
                    <li key={product.id} className="list-group-item">
                        <button onClick={() => handleAddListItem(selectedList, product.id)}>Add</button>
                        <span>{product.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default AvailableProducts;