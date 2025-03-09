import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from './authStore';
import { api } from './apiInterceptors';

// Helper function to handle errors
const handleError = (error: any, context: string) => {
  if (axios.isAxiosError(error)) {
    console.error(
      `❌ ${context} - Axios Error:`,
      error.response?.data || error.message,
    );
    return (
      error.response?.data?.message || 'Something went wrong. Please try again.'
    );
  } else {
    console.error(`❌ ${context} - Unexpected Error:`, error);
    return 'An unexpected error occurred.';
  }
};

// Generic login function
const login = async (
  endpoint: string,
  credentials: object,
  userType: 'customer' | 'deliveryPartner',
) => {
  try {
    const response = await api.post(`${BASE_URL}/${endpoint}`, credentials);

    if (!response?.data) {
      console.error(`❌ ${userType} Login - Invalid response from server.`);
      return;
    }

    const {
      accessToken,
      refreshToken,
      [userType]: user,
    } = response.data.response || response.data;

    if (!accessToken || !refreshToken || !user) {
      console.error(
        `❌ ${userType} Login - Missing authentication data from response.`,
      );
      return;
    }

    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);

    const {setUser} = useAuthStore.getState();
    setUser(user);

    console.log(`✅ ${userType} login successful:`, user);
  } catch (error) {
    handleError(error, `${userType} Login`);
  }
};

// Exported login functions
export const customerLogin = async (phone: string) => {
  if (!phone) {
    console.error('❌ Customer Login - Phone number is required.');
    return;
  }
  await login('customer/login', {phone}, 'customer');
};

export const deliveryLogin = async (email: string, password: string) => {
  if (!email || !password) {
    console.error('❌ Delivery Login - Email and password are required.');
    return;
  }
  await login('delivery/login', {email, password}, 'deliveryPartner');
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');

    if (!refreshToken) {
      console.error('❌ Refresh Token - No refresh token found.');
      return;
    }

    const response = await api.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    if (!response?.data?.accessToken) {
      console.error('❌ Refresh Token - Invalid response from server.');
      return;
    }

    tokenStorage.set('accessToken', response.data.accessToken);
    tokenStorage.set('refreshToken', response.data.refreshToken);

    console.log('✅ Access token refreshed successfully.');

    return response.data.refreshToken;
  } catch (error) {
    handleError(error, 'Refresh Token');
  }
};
