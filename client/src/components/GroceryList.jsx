import React, { useState, useEffect } from "react";
import { retrieveGroceryListItems } from "../api/groceryListAPI.jsx";
import { retrieveAllProducts } from "../api/productsAPI.jsx";
import GroceryListSelector from "./GroceryListSelector.jsx";
import GroceryItems from "./GroceryItems.jsx";

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
        if(selectedList || selectedList === "") {
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
        <div className="grocery-list-container d-flex pt-5">
            
            {/* Grocery List Selector - Dropdown */}
            <div className="list-selector">
                <GroceryListSelector
                    lists={lists}
                    selectedList={selectedList}
                    onChangeList={handleChange}
                />
            </div>
            
            {/* Grocery List Items */}
            <div className="grocery-items flex-grow-1">
                <GroceryItems items={listItems} />
            </div>

            {/* Available Products */}
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