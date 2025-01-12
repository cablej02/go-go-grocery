import fetchWithAuth from './fetchWithAuth';

const retrieveAllCategories = async () => {
    return await fetchWithAuth('/api/categories');
};

export { retrieveAllCategories };