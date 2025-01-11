import React, { useState, useEffect } from "react";

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

const GroceryItems = ({ items }) => {
    // groupedItems are organized by category
    const [groupedItems, setGroupedItems] = useState(groupByCategory(items));

    useEffect(() => {
        console.log("Items:", items);
        setGroupedItems(groupByCategory(items));
    }, [items]);

    return (
        <div>
            <h3>Grocery List Items</h3>
            {/* Loop over all key:value pairs in groupedItems */}
            {Object.entries(groupedItems).map(([category, catItems]) => (
                <div key={category}>
                    <h4>{category}</h4>
                    <ul className="list-group">
                        {catItems.map((item) => (
                            <li key={item.id} className="list-group-item">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GroceryItems;