import { Product } from '../models/index.js';

export const seedProducts = async () => {
    await Product.bulkCreate([
        { name: 'Apple', category_id: 1 },
        { name: 'Banana', category_id: 1 },
        { name: 'Orange', category_id: 1 },
        { name: 'Carrot', category_id: 2 },
        { name: 'Broccoli', category_id: 2 },
        { name: 'Chicken', category_id: 3 },
        { name: 'Beef', category_id: 3 },
        { name: 'Salmon', category_id: 4 },
        { name: 'Shrimp', category_id: 4 },
        { name: 'Milk', category_id: 5 },
        { name: 'Shredded Cheese', category_id: 5 },
        { name: 'Bread', category_id: 6 },
        { name: 'Baguette', category_id: 6 },
        { name: 'Water', category_id: 7 },
        { name: 'Soda', category_id: 7 },
        { name: 'Chips', category_id: 8 },
        { name: 'Cookies', category_id: 8 },
        { name: 'Ice Cream', category_id: 9 },
        { name: 'Frozen Pizza', category_id: 9 },
        { name: 'Canned Soup', category_id: 10 },
        { name: 'Canned Beans', category_id: 10 },
        { name: 'Ketchup', category_id: 11 },
        { name: 'Mustard', category_id: 11 },
        { name: 'Salt', category_id: 12 },
        { name: 'Pepper', category_id: 12 },
        { name: 'Toothpaste', category_id: 13 },
        { name: 'Shampoo', category_id: 13 },
        { name: 'Paper Towels', category_id: 14 },
        { name: 'Toilet Paper', category_id: 14 },
        { name: 'Trash Bags', category_id: 14 },
        { name: 'Light Bulbs', category_id: 14 },
        { name: 'Band-Aids', category_id: 15 },
        { name: 'Pain Reliever', category_id: 15 },
        { name: 'Diapers', category_id: 16 },
        { name: 'Baby Wipes', category_id: 16 },
        { name: 'Dog Food', category_id: 17 },
        { name: 'Cat Food', category_id: 17 },
    ])
}