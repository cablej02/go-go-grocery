const login = async (userInfo) => {
  try {
    // Send a POST request to '/auth/login'
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // Throw error if response status is not OK (200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    // Parse the response body as JSON
    const data = await response.json();

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
}

const createUser = async (userInfo) => {
    try {
        const response = await fetch(`/auth/register`, {
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

export { login, createUser };
