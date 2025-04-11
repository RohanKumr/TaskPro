// src/utils/toastUtils.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const toastError = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const toastInfo = (message) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};
