import * as Cookies from 'js-cookie';
import { string } from 'prop-types';

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

export function setCustomCookie(key:string,value:string) {
  return Cookies.set(key, value);
}

export function getCustomCookie(key:string | any) {
  return Cookies.get(key);
}

export function removeCustomCookie(key: string) {
  return Cookies.remove(key);
}