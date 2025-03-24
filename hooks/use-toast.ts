import { toast } from "react-toastify";

export const useToast = () => {
  const successMessage = (message: string) => {
    return toast.success(message);
  };

  const errorMessage = (message: string) => {
    return toast.error(message);
  };
  return { successMessage, errorMessage };
};
