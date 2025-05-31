'use server';

import { deleteCookie } from './cookies';

export async function logout() {
  try {
    await deleteCookie('auth');
    await deleteCookie('phone_data');
  } catch (err) {
    console.error('[logout.js] Failed to delete cookies:', err);
    throw new Error('Logout failed while clearing cookies.');
  }
}
