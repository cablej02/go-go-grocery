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
    
    // const [quantity, setQuantity] = useState({});

    const handleChangeQuantity = async (listItemId, quantity) => {
        try {
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
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                console.log("Unauthorized. Please log in.");
            }
        }
    }

    const handleDecreaseQuantity = (listItemId, quantity) => {
        try{
            const newQuantity = quantity - 1;
            if (newQuantity < 1 ) {
                handleRemoveListItem(listItemId);
            }else {
                handleChangeQuantity(listItemId, newQuantity);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleRemoveListItem = async (listItemId) => {
        try {
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
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setGroupedItems(groupByCategory(listItems));
    }, [listItems]);

    return (
        <div>
            {/* Loop over all key:value pairs in groupedItems */}
            {Object.entries(groupedItems).map(([category, catItems]) => (
                <div key={category}>
                    <h4 className="mt-3">{category}</h4>
                    <ul className="list-group">
                        {catItems.map((item) => (
                            <li key={item.id} className="list-group-item">
                                <span>{item.name}</span>
                                <button 
                                    onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>-</button>
                                <span>{item.quantity}</span>
                                <button 
                                    onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}>+</button>
                                <button
                                    className="btn btn-danger"
                                    value={item.id}
                                    onClick={(e) => handleRemoveListItem(parseInt(e.target.value))}
                                >
                                    Remove
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