import React, { useState, useEffect } from "react";
import { retrieveGroceryListItems } from "../api/groceryListAPI.jsx";
import { retrieveAllProducts } from "../api/productsAPI.jsx";

const GroceryList = ({ lists }) => {
    const [selectedList, setSelectedList] = useState(null);
    const [listItems, setListItems] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);

    let products = [];

    useEffect (()=> {
        fetchAllProducts ()
    },[])
     

    const handleChange = (e) => {
        setSelectedList(e.target.value);
        fetchListItems(e.target.value);
        calcAvailableProducts();
    }
    const calcAvailableProducts =() => {
        const availableProducts = [...products];
        for (let i = 0;i<listItems.length; i++){
            const index = availableProducts.findIndex(() => {
                return availableProducts.id === listItems[i].product_id
            })
            availableProducts.splice(index, 1);
        }
        setAvailableProducts(availableProducts);
    }
    const fetchListItems = async (listId) => {
        try {
            const data = await retrieveGroceryListItems(listId);
            setListItems(data);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchAllProducts = async () => {
        try {
            products = await retrieveAllProducts();
        } catch (error) {
            console.error(error);
        }
    }

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
            <select
                id= "product-select"
                >
                <option value="" disabled>
                    Select a Product
                </option>
                {availableProducts.map((product, index) => (
                    <option key={index} value={product.id}>
                        {product.name}
                    </option>
                ))}
            </select>
        </div>
        
    )
}
export default GroceryList;