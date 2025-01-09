import React, { useState } from "react";
import { retrieveGroceryListItems } from "../api/groceryListAPI.jsx";

const GroceryList = ({ lists }) => {
    const [selectedList, setSelectedList] = useState(null);
    const [listItems, setListItems] = useState([]);

    const handleChange = (e) => {
        setSelectedList(e.target.value);
        fetchListItems(e.target.value);
    }

    const fetchListItems = async (listId) => {
        try {
            const data = await retrieveGroceryListItems(listId);
            setListItems(data);
            console.log(listItems);
        } catch (error) {
            console.error(error);
        }
    }

    console.log(lists)
    return (
        <div className="grocery-list pt-5">
            <select 
            id="list-select"
            value={selectedList || ""}
            onChange={handleChange}
            >
                <option value="" disabled>
                    Select a List
                </option>
                {lists.map((list, index) => (
                    <option key={index} value={list.id}>
                        {list.name}
                    </option>
                ))}
            </select>
            <ul>
                {listItems.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
        
    )
}
export default GroceryList;