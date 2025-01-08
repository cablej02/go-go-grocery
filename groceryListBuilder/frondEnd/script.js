const productCategories = {
    Dairy: [
        "Milk", "Cheese", "Yogurt", "Butter", "Cream", "Cottage Cheese", 
        "Sour Cream", "Whipping Cream", "Half and Half", "Ice Cream", "Evaporated Milk", "Eggs"
    ],
    Fruits: [
        "Bananas", "Apples", "Oranges", "Grapes", "Pineapples", "Mangoes", 
        "Peaches", "Pears", "Plums", "Cherries", "Blueberries", "Raspberries", 
        "Strawberries", "Watermelon", "Cantaloupe", "Papaya"
    ],
    Vegetables: [
        "Carrots", "Broccoli", "Spinach", "Lettuce", "Cucumber", "Tomatoes", 
        "Onions", "Garlic", "Peppers", "Zucchini", "Cauliflower", "Potatoes", 
        "Sweet Potatoes", "Celery", "Mushrooms", "Asparagus"
    ],
    Bakery: [
        "Bread", "Bagels", "Croissants", "Rolls", "Muffins", "Donuts", 
        "Pita Bread", "Tortillas", "Sourdough", "Brioche", 
        "Cornbread", "Cupcakes", "Cinnamon Rolls"
    ],
    Meat: [
        "Chicken", "Beef", "Pork", "Turkey", "Lamb", "Fish", 
        "Shrimp", "Crab", "Lobster", "Sausages", "Bacon", "Ham", 
        "Salmon", "Tuna"
    ],
    Snacks: [
        "Chips", "Pretzels", "Popcorn", "Cookies", "Brownies", "Granola Bars", 
        "Candy", "Chocolate", "Trail Mix", "Fruit Snacks", "Jerky", "Crackers", 
        "Nuts", "Rice Cakes", "Pudding Cups", "Cheese Sticks"
    ],
    Beverages: [
        "Water", "Juice", "Soda", "Tea", "Coffee", "Milk", 
        "Energy Drinks", "Smoothies", "Sports Drinks", "Wine", "Beer", 
        "Cocktail Mixers", "Iced Tea", "Hot Chocolate", "Sparkling Water"
    ],
    Frozen: [
        "Frozen Pizza", "Frozen Vegetables", "Frozen Fruit", "Ice Cream", 
        "Frozen Chicken Nuggets", "Frozen Fish Fillets", 
        "Frozen Waffles", "Frozen Burritos", 
        "Frozen Shrimp", "Frozen Meatballs", "Frozen French Fries"
    ],
    Pantry: [
        "Pasta", "Rice", "Beans", "Canned Vegetables", "Canned Fruit", "Soup", 
        "Tomato Sauce", "Peanut Butter", "Jelly", "Flour", "Sugar", "Salt", 
        "Pepper", "Spices", "Olive Oil", "Vinegar", "Honey", "Cereal", "Granola"
    ]
};

function findCategoryForItem(inputValue) {
    for (const [category, products] of Object.entries(productCategories)) {
        if (products.map(product => product.toLowerCase()).includes(inputValue.toLowerCase())) {
            return category;
        }
    }
    return null;
}

function displaySuggestedItems(inputValue) {
    const suggestedList = document.getElementById("suggested-products");
    suggestedList.innerHTML = "";

    const category = findCategoryForItem(inputValue);

    if (category) {
        const items = productCategories[category];
        
        items.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = item;

            listItem.addEventListener("click", () => {
                addProductToList(item);
            });

            suggestedList.appendChild(listItem);
        });
    } else {
        const noMatch = document.createElement("li");
        noMatch.textContent = "No matching items found";
        suggestedList.appendChild(noMatch);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const groceryList = document.getElementById("grocery-list");
    const input = document.getElementById("add-grocery-item");
    const addGroceryBtn = document.getElementById("add-grocery-btn");

    addGroceryBtn.addEventListener("click", () => {
        const product = input.value.trim();
        if (product) {
            addProductToList(product);
            input.value = ""; 
        }
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const product = input.value.trim();
            if (product) {
                addProductToList(product);
                input.value = ""; 
            }
        }
    });

    input.addEventListener("input", () => {
        displaySuggestedItems(input.value);
    });

    function addProductToList(product) {
        const listItem = document.createElement("li");
        listItem.textContent = product;

        listItem.addEventListener("click", () => {
            groceryList.removeChild(listItem);
        });

        groceryList.appendChild(listItem);
    }
});
