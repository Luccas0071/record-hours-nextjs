"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: key,
    value,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);
  return cookie?.value || null;
}

export async function removeCookie(key: string) {
  const cookieStore = await cookies();
  cookieStore.delete(key)
}