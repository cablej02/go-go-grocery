import { useState } from 'react';
import { createGroceryListItem } from '../api/groceryListAPI.jsx';

import '../styles/availableProductsStyles.css';

const AvailableProducts = ({ products, selectedList, listItems, setListItems }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearchChange = (e) => {
        // TODO: add delay if needed
        setSearchInput(e.target.value.toLowerCase());
    }

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchInput);
    });

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
        <div className="d-flex flex-column justify-content-center mx-auto">
            <h3>Available Products</h3>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search Products..."
                value={searchInput}
                onChange={handleSearchChange}
                className="search-input form-control mb-3 bg-light mx-auto"
                style={{ width: '300px' }}
            />
            {/* List of Available Products */}
            <ul className="list-group mx-auto">
                {filteredProducts .map((product) => (
                    <li key={product.id} className="list-group-item gap-5">
                        <button onClick={() => handleAddListItem(selectedList, product.id)}>Add</button>
                        <span>{product.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default AvailableProducts;