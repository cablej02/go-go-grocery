const ListSelector = ({ lists, selectedList, onChangeList }) => {
    return (
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
    );
};

export default ListSelector;