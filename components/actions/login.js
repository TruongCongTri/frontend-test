'use server';

import { setCookie, setJsonCookie } from './cookies';

export async function login(phoneData) {
  try {
    await setCookie('auth', 'true');
    await setJsonCookie('phone_data', phoneData);
  } catch (error) {
    console.error('[login.js] Failed to set cookies:', error);
    throw new Error('Login failed while setting cookies.');
  }
}
