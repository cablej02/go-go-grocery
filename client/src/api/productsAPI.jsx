import fetchWithAuth from './fetchWithAuth';

const retrieveAllProducts = async () => {
    return await fetchWithAuth(`/api/products`);
}

export { retrieveAllProducts };