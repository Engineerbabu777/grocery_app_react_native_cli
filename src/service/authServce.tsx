import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from './authStore';

export const customerLogin = async (phone: string) => {
  try {
    const response: any = axios.post(`${BASE_URL}/customer/login`, {
      phone,
    });

    const {accessToken, refreshToken, customer} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);

    const {setUser} = useAuthStore.getState();

    setUser(customer);
  } catch (error) {
    console.log('Login Error', error);
  }
};
