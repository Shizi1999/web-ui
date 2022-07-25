import { toast } from 'react-toastify';

const successToastMessage = (message, ...passprops) => {
  return toast.success(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    ...passprops,
  });
};

const errorToastMessage = (message, ...passprops) => {
  return toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    ...passprops,
  });
};

const infoToastMessage = (message, ...passprops) => {
  return toast.info(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    ...passprops,
  });
};

const toastMessage = { successToastMessage, errorToastMessage, infoToastMessage };
export default toastMessage;
