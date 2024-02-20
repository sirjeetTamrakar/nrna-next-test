import { toast } from 'react-toastify';

// custom success toast
export const successToast = (message = 'Succeded') => toast.success(message, { theme: 'colored' });

// custom error toast
export const failureToast = (message = 'Failed') => toast.error(message, { theme: 'colored' });

// custom warning toast
export const warningToast = (message = 'Warned') => toast.warning(message, { theme: 'colored' });

// custom info toast
export const infoToast = (message = 'Information') => toast.info(message, { theme: 'colored' });

export const errorToast = (error = {}) =>
  toast.error(error.response.data.message, { theme: 'colored' });

export const customToaster = ({ type, message }) =>
  toast[type?.toLowerCase() === 'danger' ? 'error' : type?.toLowerCase()](message || 'Success', {
    theme: 'colored'
  });
