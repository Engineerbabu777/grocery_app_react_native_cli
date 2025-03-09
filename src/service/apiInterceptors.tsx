import {tokenStorage} from '@state/storage';
import {refreshAccessToken} from './authServce';
import {BASE_URL} from './config';
import axios from 'axios';

/*
axios.create({}) creates a reusable instance of Axios, which allows us to define a base URL for all API requests.
BASE_URL is the main endpoint of the backend API.
This helps avoid repetition when making API calls, as all requests will automatically use this base URL.
*/
export const api = axios.create({
  baseURL: BASE_URL,
});

/*
🟢 What This Does:
Before every request is sent, this interceptor checks if there's a stored access token (accessToken).
If a token exists, it automatically attaches it to the request in the Authorization header.
This ensures that authenticated requests don't require manual token handling.
If there's an error in modifying the request, it rejects the request and throws an error.
*/
api.interceptors.request.use(
  async config => {
    const accessToken = tokenStorage.getString('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/*
// 🟡 What This Does:
// Every API response is first checked for errors.
// If the server responds with 401 Unauthorized, it means the token has expired.
// Instead of logging out the user immediately, it automatically tries to refresh the token by calling:
// Response interceptor to handle token expiration
*/
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      console.warn('⚠️ Token expired, attempting refresh...');
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api.request(error.config);
      }
    }
    return Promise.reject(error);
  },
);



/*
5 Real-Life Stories to Explain This
📖 Story 1: Automatic Authentication for Requests
🔹 Scenario:
Sarah, a delivery agent, logs into the app. Every time she views her deliveries, the app needs to fetch the latest data. Instead of manually attaching her access token every time, the Axios request interceptor automatically adds it, making her experience smooth.

🔹 How It Works in Code:

Sarah logs in and receives an accessToken.
Every API request (e.g., /orders) automatically includes:
json
Copy
Edit
"Authorization": "Bearer abc123"
She never has to worry about tokens manually!
📖 Story 2: Token Expired? No Problem!
🔹 Scenario:
James, a customer, has been using the app for hours. Suddenly, he tries to place an order, but his session expires! Instead of logging him out, the app silently refreshes his token in the background.

🔹 How It Works in Code:

James tries to place an order (POST /order).
The API responds:
json
Copy
Edit
{
  "status": 401,
  "message": "Token expired"
}
The response interceptor detects the error and triggers:
typescript
Copy
Edit
const newAccessToken = await refreshAccessToken();
A new token is fetched and the request is retried automatically.
📖 Story 3: Reducing Repetitive Code
🔹 Scenario:
Before, every developer had to manually write:

typescript
Copy
Edit
const token = tokenStorage.get('accessToken');
axios.get('/user', { headers: { Authorization: `Bearer ${token}` } });
With interceptors, this is now automated:

typescript
Copy
Edit
api.get('/user');
No need to manually attach headers anymore!

📖 Story 4: Handling Edge Cases
🔹 Scenario:
Emma logs into the app, but somehow her refreshToken is also invalid (e.g., she hasn't used the app in months). The interceptor tries to refresh, but since it fails, the user is logged out.

🔹 How It Works in Code:

API request fails with 401.
The refresh token call also fails.
The app detects the issue and logs Emma out.
She sees a message:
"Session expired. Please log in again."
📖 Story 5: Security & Performance
🔹 Scenario:
A hacker tries to steal John’s access token. Normally, the token would be valid forever, but thanks to automatic expiration and refreshing, the token:

Expires quickly (e.g., 1 hour).
Is replaced with a new one (only if the refresh token is valid).
Ensures minimal risk of session hijacking.
🌟 Summary
✔ Automatically adds the token to requests.
✔ Handles token expiration & refreshes it when needed.
✔ Retries failed requests after refreshing tokens.
✔ Enhances security by expiring tokens.
✔ Eliminates repetitive code, making API calls simpler.

This makes authentication seamless while improving security and user experience. 🚀








*/