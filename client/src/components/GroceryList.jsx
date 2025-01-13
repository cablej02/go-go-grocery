import { useState, useEffect } from "react";
import { retrieveGroceryListItems, createGroceryList } from "../api/groceryListAPI.jsx";
import { retrieveAllProducts } from "../api/productsAPI.jsx";
import GroceryListSelector from "./GroceryListSelector.jsx";
import GroceryItems from "./GroceryItems.jsx";
import ProductSearch from "./ProductSearch.jsx";

const GroceryList = ({ lists, setLists }) => {
    const [selectedList, setSelectedList] = useState(null);
    const [listItems, setListItems] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect (() => {
        // fetch all prodcuts on mount
        fetchAllProducts()
    },[])

    useEffect(() => {
        console.log("Selected List:", selectedList);
    }, [selectedList]);

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

    const handleSelectedListChange = (selectedListId) => {
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

    const onCreateList = async (listName) => {
        try{
            console.log("Creating list:", listName);
            const data = await createGroceryList(listName);
            setLists([...lists, data]);
            handleSelectedListChange(data.id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="d-flex flex-column gap-5">
            <div className="d-flex justify-content-between gap-3">
                {/* Grocery List Selector - Dropdown */}
                <div className="list-selector">
                    <GroceryListSelector
                        lists={lists}
                        selectedList={selectedList}
                        onChangeList={(e) => handleSelectedListChange(e.target.value)}
                        onCreateList={onCreateList}
                    />
                </div>

                
                {/* Product Search */}
                <div className="available-products">
                    <ProductSearch
                        availableProducts={availableProducts}
                        setAvailableProducts={setProducts}
                        selectedList={selectedList}
                        listItems={listItems}
                        setListItems={setListItems}
                    />
                </div>
            </div>

            {/* Grocery List Items */}
            <div className="grocery-items flex-grow-1">
                    <GroceryItems
                        listItems={listItems}
                        setListItems={setListItems} />
                </div>
        </div>
    )
}
export default GroceryList;