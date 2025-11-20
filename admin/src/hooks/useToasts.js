import { toast } from 'react-toastify';

export const useToasts = () => {
    const addToast = (message, options = {}) => {
        const { appearance = 'info', autoDismiss = true } = options;
        
        const toastOptions = {
            autoClose: autoDismiss ? 3000 : false,
        };

        switch (appearance) {
            case 'success':
                toast.success(message, toastOptions);
                break;
            case 'error':
                toast.error(message, toastOptions);
                break;
            case 'warning':
                toast.warning(message, toastOptions);
                break;
            case 'info':
            default:
                toast.info(message, toastOptions);
                break;
        }
    };

    return { addToast };
};
