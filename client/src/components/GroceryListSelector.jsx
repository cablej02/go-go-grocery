import { useState } from "react";

const ListSelector = ({ lists, selectedList, onChangeList, onCreateList }) => {
    const [showModal, setShowModal] = useState(false);
    const [listName, setListName] = useState("");

    const handleSubmit = () => {
        if (listName) {
            onCreateList(listName.trim());
            setListName("");
            setShowModal(false);
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <button className="btn btn-success" onClick={()=> setShowModal(true)}>+</button>
            <select
                id="list-select"
                value={selectedList || ""}
                onChange={onChangeList}
                className="form-select"
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

            {/* add new list modal */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content bg-body-bg">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Grocery List</h5>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter list name"
                                        value={listName}
                                        onChange={(e) => setListName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 d-flex justify-content-end gap-3">
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
            )}
        </div>
    );
};

export default ListSelector;