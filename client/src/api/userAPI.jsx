import Auth from '../utils/auth';

const retrieveUser = async (id) => {
    try {
        const response = await fetch(`/api/users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
        });
        const data = await response.json();
    
        if(!response.ok) {
            throw new Error('Invalid user API response, check network tab!');
        }
    
        return data;
    
    } catch (err) { 
        console.log('Error from data retrieval:', err);
        return [];
    }
}

const retrieveUserByEmail = async (email) => {
    try {
        const response = await fetch(`/api/users/email/${email}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
        });
        const data = await response.json();
    
        if(!response.ok) {
            throw new Error('Invalid user API response, check network tab!');
        }
    
        return data;
    
    } catch (err) { 
        console.log('Error from data retrieval:', err);
        return [];
    }
}

const createUser = async (userInfo) => {
    try {
        const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(userInfo)
        });
    
        const data = await response.json();
    
        if(!response.ok) {
            throw new Error('Invalid user API response, check network tab!');
        }
    
        return data;
    
    } catch (err) { 
        console.log('Error from data retrieval:', err);
        return [];
    }
}

const updateUser = async (id, userInfo) => {
    try {
        const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(userInfo)
        });
    
        const data = await response.json();
    
        if(!response.ok) {
            throw new Error('Invalid user API response, check network tab!');
        }
    
        return data;
    
    } catch (err) { 
        console.log('Error from data retrieval:', err);
        return [];
    }
}

export { retrieveUser, retrieveUserByEmail, createUser, updateUser };
