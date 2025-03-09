import axios from 'axios';
import {BASE_URL} from './config';

export const customerLogin = async (phone: string) => {
  try {
    const response: any = axios.post(`${BASE_URL}/customer/login`, {
      phone,
    });

    const {accessToken, refreshToken, customer} = response.data;
  } catch (error) {
    console.log('Login Error', error);
  }
};
