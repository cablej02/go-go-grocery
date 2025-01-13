import { useState, useLayoutEffect } from 'react';
import { createGroceryListItem } from '../api/groceryListAPI.jsx';
import { retrieveAllCategories } from '../api/categoryAPI.jsx';
import { createProduct } from '../api/productsAPI.jsx';

import '../styles/productSearchStyles.css';

const ProductSearch = ({ availableProducts, setAvailableProducts, selectedList, listItems, setListItems }) => {
    const [searchInput, setSearchInput] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', category_id: null });
    const [categories, setCategories] = useState([]);

    useLayoutEffect(() => {
        fetchAllCategories();
    }, []);

    const handleSearchChange = (e) => {
        // TODO: add delay if needed
        setSearchInput(e.target.value.toLowerCase());
    }

    const getFilteredProducts = (products, searchInput, limit) => {
        const result = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.toLowerCase().includes(searchInput)) {
                result.push(products[i]);
            }
            if (result.length >= limit) {
                break;
            }
        }
        return result;
    }
    
    const filteredProducts = searchInput ? 
        getFilteredProducts(availableProducts, searchInput, 5) 
        : [];

    const handleAddListItem = async (listId, productId) => {
        try {
            const result = await createGroceryListItem(listId, productId, 1);
            if (result) {
                console.log("Item added to list");
                // Update the list items
                setListItems([
                    ...listItems,
                    { ...result }
                ]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async () => {
        if (newProduct.name && newProduct.category_id) {
            console.log("Adding New Product:", newProduct);
            setShowModal(false);
            const data = await createProduct(newProduct);
            console.log(availableProducts, data)
            setAvailableProducts([...availableProducts, data]);
            setNewProduct({ name: '', category_id: null });
        }
    }

    const fetchAllCategories = async () => {
        try {
            const data = await retrieveAllCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="d-flex flex-column mx-auto">
            {selectedList && (
            <div className="d-flex mx-auto gap-2">
                <div className="position-relative">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search Products..."
                        value={searchInput}
                        onChange={handleSearchChange}
                        className="form-control search-input bg-light"
                        style={{ width: '15rem' }}
                    />

                    {/* Search Results Dropdown */}
                    {searchInput && (
                        <ul
                            className="list-group position-absolute bg-light shadow rounded w-100"
                            style={{ zIndex: 100 }}
                        >
                            {filteredProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="list-group-item d-flex justify-content-between align-items-center bg-light text-dark"
                                >
                                    <span>{product.name}</span>
                                    <button
                                        onClick={() => handleAddListItem(selectedList, product.id)}
                                        className="btn btn-sm btn-success"
                                    >
                                        Add
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Add New Product Button */}
                <button
                    className="btn btn-success border-0"
                    style={{ height: 'calc(2.2rem)', backgroundColor: `var(--bs-primary)`, marginTop: '0.1rem' }}   
                    onClick={() => setShowModal(true)}
                >
                    +
                </button>
            </div>
            )}

            {/* new product modal */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content bg-body-bg">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Product</h5>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter product name"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <select
                                        id="category-select"
                                        value={newProduct.category_id || ""}
                                        onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                                        className="form-select"
                                    >
                                        <option value="" disabled className='fst-italic'>
                                            Select a Category
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="my-3 d-flex justify-content-end gap-3">
                                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                            Cancel
                                        </button>
                                        <button className="btn btn-success" onClick={handleSubmit}>
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
};

export default ProductSearch;