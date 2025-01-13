import { useState, useEffect } from "react";
import { deleteGroceryListItem, updateGroceryListItemQuantity } from '../api/groceryListAPI.jsx';


const groupByCategory = (items) => {
    const groupedCategories = {};
    items.forEach((item) => {
        const category = item.categoryName;

        // If the category doesn't exist in the object, create an empty array
        if (!groupedCategories[category]) {
            groupedCategories[category] = [];
        }
        groupedCategories[category].push(item);

    });
    return groupedCategories;
};

const GroceryItems = ({ listItems, setListItems }) => {
    // groupedItems are organized by category
    const [groupedItems, setGroupedItems] = useState(groupByCategory(listItems));

    const handleChangeQuantity = async (listItemId, quantity) => {
        try {
            if(quantity <= 0) {
                console.log(`Removing item with id: ${listItemId}`);
                const result = await deleteGroceryListItem(listItemId);
                if (result) {
                    console.log("Item removed from list");

                    // Filter out the item that was removed
                    console.log(listItemId)
                    const updatedListItems = listItems.filter((item) => item.id !== listItemId);

                    // Update the list items
                    setListItems(updatedListItems);
                }
            } else {
                const result = await updateGroceryListItemQuantity(listItemId, quantity);
                if (result) {
                    console.log("Item quantity updated");
                    // Update the list items
                    const updatedListItems = listItems.map((item) => {
                        if (item.id === listItemId) {
                            return { ...item, quantity };
                        }
                        return item;
                    });
                    setListItems(updatedListItems);
                }
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized. Please log in.");
            }
        }
    };

    useEffect(() => {
        setGroupedItems(groupByCategory(listItems));
    }, [listItems]);

    return (
        <div>
            {/* Loop over all key:value pairs in groupedItems */}
            {Object.entries(groupedItems).map(([category, catItems]) => (
                <div key={category} className="bg-dark rounded">
                    <h4 className="mt-3">{category}</h4>
                    <ul className="list-group">
                        {catItems.map((item) => (
                            <li key={item.id} className="list-group-item">
                                <span>{item.name}</span>
                                <button 
                                    onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="form-control d-inline-block mx-2"
                                    value={item.quantity}
                                    min="1"
                                    max="999"
                                    onChange={(e) => handleChangeQuantity(item.id, parseInt(e.target.value) || 0)}
                                    style={{ width: '60px' }}
                                />
                                <button 
                                    onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GroceryItems;