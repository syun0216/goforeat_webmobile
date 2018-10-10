import * as Cookies from 'js-cookie';

const tokenKey: string = 'GFE_SID';

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token: string) {
  return Cookies.set(tokenKey, token)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}

export function isAuth() {
  return typeof getToken() !== "undefined";
}