import { toast } from "react-toastify";

// Show success toast
export const showToastSuccess = (message) => {
  message && toast.success(message);
};

// Show error toast
export const showToastError = (message) => {
  message && toast.error(message);
};
