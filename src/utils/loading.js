import {
  Toast
} from 'antd-mobile';

export function showToast(message = "hello", duration = 2) {
  Toast.info(message, duration);
}

export function successToast(message = "Load success !!!", duration = 2) {
  Toast.success(message, duration);
}

export function failToast(message = "Load failed!!!", duration = 2) {
  Toast.fail(message, duration);
}

export function offline(message = "'Network connection failed !!!'", duration = 2) {
  Toast.offline(message, duration);
}

export function loadingToast(message = 'Loading...', duration = 0, callback = () => {}) {
  Toast.loading(message, duration, () => {
    callback()
  });
}

export function hideToast() {
  Toast.hide();
}