import { useState, useEffect } from "react";
import { retrieveGroceryListItems } from "../api/groceryListAPI.jsx";
import { retrieveAllProducts } from "../api/productsAPI.jsx";
import GroceryListSelector from "./GroceryListSelector.jsx";
import GroceryItems from "./GroceryItems.jsx";
import AvailableProducts from "./AvailableProducts.jsx";

const GroceryList = ({ lists }) => {
    const [selectedList, setSelectedList] = useState(null);
    const [listItems, setListItems] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect (() => {
        // fetch all prodcuts on mount
        fetchAllProducts ()
    },[])

    useEffect(() => {
        console.log("Selected List:", selectedList);
    }, [selectedList]);

    useEffect(() => {
        console.log("List Items:", listItems);
    }, [listItems]);

    useEffect (() => {
        // if no list is selected, reset list items and available products
        if(!selectedList || selectedList === "") {
            if(listItems.length || availableProducts.length) {
                setListItems([]);
                setAvailableProducts([]);
            }
        }else if (products.length) {
            // if a list is selected, calc available products
            calcAvailableProducts()
        }
    },[listItems, products, selectedList])

    const handleSelectedListChange = (e) => {
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
        <div className="d-flex mt-5 gap-5">
            
            {/* Grocery List Selector - Dropdown */}
            <div className="list-selector">
                <GroceryListSelector
                    lists={lists}
                    selectedList={selectedList}
                    onChangeList={handleSelectedListChange}
                />
            </div>
            
            {/* Grocery List Items */}
            <div className="grocery-items flex-grow-1">
                <GroceryItems
                    listItems={listItems}
                    setListItems={setListItems} />
            </div>

            {/* Available Products */}
            <div className="available-products flex-grow-1">
                <AvailableProducts
                    products={availableProducts}
                    selectedList={selectedList}
                    listItems={listItems}
                    setListItems={setListItems}
                />
            </div>
        </div>
    )
}
export default GroceryList;