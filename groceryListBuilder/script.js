// Place holder until code written for "suggested items"
const suggestedProducts = ["Milk", "Eggs", "Bread", "Bananas", "Chicken"];


document.addEventListener("DOMContentLoaded", () => {
    const suggestedList = document.getElementById("suggested-products");
    const groceryList = document.getElementById("grocery-list");


    suggestedProducts.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.textContent = product;

        listItem.addEventListener("click", () => {
            addProductToList(product);
        });

        suggestedList.appendChild(listItem);
    });

    const addGroceryBtn = document.getElementById("add-grocery-btn");
    const input = document.getElementById("add-grocery-item");

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

    function addProductToList(product) {
        const listItem = document.createElement("li");
        listItem.textContent = product;

        listItem.addEventListener("click", () => {
            groceryList.removeChild(listItem);
        });

        groceryList.appendChild(listItem);
    }
});
