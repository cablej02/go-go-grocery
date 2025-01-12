import fetchWithAuth from './fetchWithAuth';

const retrieveAllProducts = async () => {
    return await fetchWithAuth(`/api/products`);
}

const createProduct = async ({name, category_id}) => {
    return await fetchWithAuth(`/api/products`, 
        {
            method: "POST",
            body: JSON.stringify({name, category_id})
        }
    );
}

export { retrieveAllProducts, createProduct};