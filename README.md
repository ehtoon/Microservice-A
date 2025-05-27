Step 1: Register a New User (POST /register)
You send a request to create a new user with a username and password.

Request Type: POST

URL: http://localhost:3000/register

Step 2: Login to Get JWT Token (POST /login)
You send the username and password again, and if valid, the server gives you a JWT token.

Request Type: POST

URL: http://localhost:3000/login

Step 3: Access Protected Data (GET /me)
You send a GET request with the token in the Authorization header. The server checks the token and returns your user info.

Request Type: GET

Required packages:
npm init -y
npm install express bcrypt jsonwebtoken body-parser

Example Call:

    <h2>Register</h2>
    <input id="reg-user" placeholder="Username">
    <input id="reg-pass" type="password" placeholder="Password">
    <button onclick="register()">Register</button>
    <p id="reg-msg"></p>

Step 1: Make an HTTP request (with axios .get()).

Step 2: The microservice processes your request and sends back JSON data.

Step 3: You access that data with response.data.

Example Call:

    const axios = require('axios');

    async function getUserInfo(token) {
      try {
        // Send GET request with Authorization header
        const response = await axios.get('http://localhost:3000/me', {
          headers: {
            Authorization: `Bearer ${token}`
      }
        });

    // Receive and handle response data here
    console.log('Received data:', response.data);  // This is the data from microservice

    return response.data;  // Return it for further use
      } catch (error) {
    console.error('Error receiving data:', error.response?.data || error.message);
      }
    }

    // Example usage:
    const myToken = 'your_jwt_token_here';
    getUserInfo(myToken);

UML sequence diagram showing how requesting and receiving data works. Make it detailed enough that your teammate (and your grader) will understand.

![image](https://github.com/user-attachments/assets/7314a292-7dff-4893-a63a-f3a9213bc795)
