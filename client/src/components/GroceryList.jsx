import React, { useState } from "react";

const GroceryList = ({ lists }) => {
    const [selectedList, setSelectedList] = useState(null);

    const handleChange = (e) => {
        setSelectedList(e.target.value);
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
        </div>
        
    )
}
export default GroceryList;