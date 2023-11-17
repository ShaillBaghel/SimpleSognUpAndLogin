const axios = require('axios');

// Function to fetch all users with custom headers
exports.getAllUsersWithHeaders = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/user/users', {
      headers: {
        'orgId': 'Header-Value-1',
        'userId': 'Header-Value-2',
        'roleId': 'Header-Value-2'
      }
    });

    // Handle the response data here
    console.log(response.data);
  } catch (error) {
    // Handle errors
    console.error(error);
  }
};


