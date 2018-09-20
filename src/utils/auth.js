import Cookies from 'js-cookie'

const TokenKey = 'GFE_SID';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function isAuth() {
  console.log(typeof getToken() !== "undefined");
  return typeof getToken() !== "undefined";
}