import { isAuth } from '../utils/auth';

export function CRI(route: any) {
  if(isAuth()) {
    route.location.pathname === '/login' ? route.replace('/') : console.log('isAuth');
  }
}