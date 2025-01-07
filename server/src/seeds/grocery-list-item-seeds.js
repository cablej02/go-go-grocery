import { GroceryListItem } from "../models/index.js";

export const seedGroceryListItems = async () => {
    await GroceryListItem.bulkCreate([
        { product_id: 1, quantity: 3, list_id: 1 },
        { product_id: 2, quantity: 1, list_id: 1 },
        { product_id: 3, quantity: 2, list_id: 1 },
        { product_id: 4, quantity: 3, list_id: 1 },
        { product_id: 5, quantity: 2, list_id: 1 },
        { product_id: 6, quantity: 1, list_id: 1 },
        { product_id: 7, quantity: 2, list_id: 1 },
        { product_id: 12, quantity: 1, list_id: 1 },
        { product_id: 13, quantity: 1, list_id: 1 },
        { product_id: 15, quantity: 2, list_id: 1 },
        { product_id: 18, quantity: 1, list_id: 1 },
        { product_id: 22, quantity: 1, list_id: 1 },
        { product_id: 25, quantity: 1, list_id: 1 },
        { product_id: 26, quantity: 1, list_id: 1 },
        { product_id: 27, quantity: 1, list_id: 1 },
        { product_id: 3, quantity: 1, list_id: 2 },
        { product_id: 4, quantity: 2, list_id: 2 },
        { product_id: 5, quantity: 1, list_id: 2 },
        { product_id: 6, quantity: 1, list_id: 2 },
        { product_id: 7, quantity: 1, list_id: 2 },
        { product_id: 8, quantity: 1, list_id: 2 },
        { product_id: 9, quantity: 1, list_id: 2 },
        { product_id: 10, quantity: 1, list_id: 2 },
        { product_id: 11, quantity: 1, list_id: 2 },
        { product_id: 26, quantity: 2, list_id: 2 },
        { product_id: 34, quantity: 1, list_id: 2 },
        { product_id: 36, quantity: 2, list_id: 2 },
    ]);
};