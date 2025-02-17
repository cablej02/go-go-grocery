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
        <div className="row">
            {/* Loop over all key:value pairs in groupedItems */}
            {Object.entries(groupedItems).map(([category, catItems]) => (
                <div key={category} className="col-4 mb-3">
                    <div
                        className="rounded p-1"
                        style={{ backgroundColor: '#394353' }}
                    >
                        <h4
                            className="p-1 text-light"
                            style={
                                {
                                    // fontFamily:'cursive',
                                    fontSize:'1.8em'
                                }
                            }
                        >
                            {category}
                        </h4>
                        <ul className="list-group">
                            {catItems.map((item) => (
                                <li key={item.id} className="list-group-item bg-secondary text-dark">
                                    <span
                                        style={{fontFamily:'cursive', fontSize:'1.4em'}}
                                        className="fw-bold"
                                    >{item.name}</span>
                                    <div className="ms-auto d-flex align-items-center">
                                        <button 
                                            className="btn border-0 text-dark fw-bold d-flex align-items-center justify-content-center"
                                            style={{ height: '2em', width: '2em' }}
                                            onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="form-control text-center bg-light text-dark fw-bold d-inline-block ms-2"
                                            value={item.quantity}
                                            min="1"
                                            max="999"
                                            onChange={(e) => handleChangeQuantity(item.id, parseInt(e.target.value) || 0)}
                                            style={{ width: '55px' }}
                                        />
                                        <button
                                            className="btn border-0 text-dark fw-bold d-flex align-items-center justify-content-center"
                                            style={{ height: '2em', width: '2em' }}
                                            onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroceryItems;