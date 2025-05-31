'use server';

import { redirect } from 'next/navigation';
import { getCookie, getJsonCookie } from './cookies';

export async function requireAuth() {
  const auth = await getCookie("auth");
  const phoneData = await getJsonCookie("phone_data");

  if (!auth || auth !== "true" || !phoneData) {
    redirect("/login");
  }

  return phoneData;
}
