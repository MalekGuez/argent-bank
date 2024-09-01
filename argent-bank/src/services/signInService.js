const API_URL = "http://localhost:3001/api/v1";

const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      return response;
  } catch (error) {
      console.log(error);
  }
};


const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      return response;
    } catch (error) {
        console.log(error);
    }
};

const updateUserName = async (token, firstName, lastName) => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    return response;   
  } catch (error) {
    console.log(error);
  }
};


export {
  login,
  fetchUserProfile,
  updateUserName
}
  