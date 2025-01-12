import { useState, useEffect } from "react";
import { deleteGroceryListItem } from '../api/groceryListAPI.jsx';

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

    const handleRemoveListItem = async (event) => {
        try {
            // parse the event target value to an integer
            const listItemId = parseInt(event.target.value);
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
                                <span>{item.quantity}</span>
                                <button
                                    className="btn btn-danger"
                                    value={item.id}
                                    onClick={handleRemoveListItem}
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