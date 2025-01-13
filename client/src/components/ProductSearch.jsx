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

    const filteredProducts = availableProducts.filter((product) => {
        return product.name.toLowerCase().includes(searchInput);
    });

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
        <div className="d-flex flex-column justify-content-center mx-auto">
            {selectedList && (
            <div className="d-flex justify-content-center mx-auto gap-2">
                <div className="position-relative" style={{ width: '300px' }}>
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search Products..."
                        value={searchInput}
                        onChange={handleSearchChange}
                        className="form-control search-input mb-0 bg-light"
                    />

                    {/* Search Results Dropdown */}
                    {searchInput && (
                        <ul className="list-group position-absolute bg-light shadow rounded w-100">
                            {filteredProducts.slice(0, 5).map((product) => (
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
                    className="btn btn-success mb-3"
                    style={{ height: 'calc(2.3rem)' }}
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