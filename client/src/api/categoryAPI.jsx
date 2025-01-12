import fetchWithAuth from './fetchWithAut';

export const retrieveAllCategories = async () => {
    return await fetchWithAuth('/api/categories');
};

export { retrieveAllCategories };