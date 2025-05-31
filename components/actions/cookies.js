import { cookies } from "next/headers";

/** Get a raw cookie value */
export async function getCookie(name) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value || null;
}

/** Get a JSON-parsed cookie */
export async function getJsonCookie(name) {
  const raw = await getCookie(name);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Invalid JSON cookie '${name}':`, err);
    return null;
  }
}

/** Set a raw cookie and expiration options */
export async function setCookie(name, value, options = {}) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    path: '/',
    httpOnly: true,           // Prevents JS access (XSS protection)
    secure: true,             // Only send cookie over HTTPS
    sameSite: 'strict',       // Protect against CSRF
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    ...options,               // Allow overrides
  });
}

/** Set a cookie with a JSON object */
export async function setJsonCookie(name, json, options = {}) {
  try {
    const value = JSON.stringify(json);
    await setCookie(name, value, options);
  } catch (err) {
    console.error(`❌ Failed to stringify cookie '${name}':`, err);
    throw err;
  }
}

/** delete a raw cookie */
export async function deleteCookie(name) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
