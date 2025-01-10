import React, { useState, useEffect } from "react";
import { retrieveGroceryListItems } from "../api/groceryListAPI.jsx";
import { retrieveAllProducts } from "../api/productsAPI.jsx";
import { use } from "react";

const GroceryList = ({ lists }) => {
    const [selectedList, setSelectedList] = useState(null);
    const [listItems, setListItems] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect (() => {
        // fetch all prodcuts on mount
        fetchAllProducts ()
    },[])

    useEffect (() => {
        // if a list is selected, calc available products
        if(selectedList) {
            if(products.length) {
                calcAvailableProducts()
            }
        }else{
            // if no list is selected, reset list items and available products
            setListItems([]);
            setAvailableProducts([]);
        }
    },[listItems, products, selectedList])

    const handleChange = (e) => {
        const selectedListId = e.target.value;
        setSelectedList(selectedListId);
        fetchListItems(selectedListId);
    }

    const calcAvailableProducts =() => {
        const remainingProducts = products.filter(
            // filter out products that are already in the list
            (product) => !listItems.some((item) => item.product_id === product.id)
        );
        setAvailableProducts(remainingProducts);
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
            const data = await retrieveAllProducts();
            setProducts(data);
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
                {lists.map((list) => (
                    <option key={list.id} value={list.id}>
                        {list.name}
                    </option>
                ))}
            </select>
            <h2>Grocery List Items</h2>
            <ul>
                {listItems.map((item) => (
                    <li key={item.id} value={item.id}>{item.name}</li>
                ))}
            </ul>

            <h2>Available Products</h2>
            <ul>
                {availableProducts.map((product) => (
                    <li key={product.id} value={product.id}>
                        {product.name}
                    </li>
                ))}
            </ul>
        </div>
        
    )
}
export default GroceryList;