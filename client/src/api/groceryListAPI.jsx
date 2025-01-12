import fetchWithAuth from './fetchWithAuth';

const retrieveGroceryLists = async () => {
    return await fetchWithAuth(`/api/lists`);
}

const retrieveGroceryListItems = async (listId) => {
    return await fetchWithAuth(`/api/list-items?list_id=${listId}`);
}

const createGroceryList = async (name) => {
    return await fetchWithAuth(`/api/lists`, 
        {
            method: "POST",
            body: JSON.stringify({name})
        }
    );
}

const createGroceryListItem = async (listId, productId, quantity) => {
    return await fetchWithAuth(`/api/list-items`, 
        {
            method: "POST",
            body: JSON.stringify({list_id: listId, product_id: productId, quantity})
        }
    );
}

const deleteGroceryListItem = async (listItemId) => {
    return await fetchWithAuth(`/api/list-items/${listItemId}`, 
        {
            method: "DELETE"
        }
    );
}

const updateGroceryListItemQuantity = async (listItemId, quantity) => {
    return await fetchWithAuth(`/api/list-items/${listItemId}`, 
        {
            method: "PATCH",
            body: JSON.stringify({quantity})
        }
    );
}

export { retrieveGroceryLists, retrieveGroceryListItems, createGroceryList, createGroceryListItem, deleteGroceryListItem, updateGroceryListItemQuantity};