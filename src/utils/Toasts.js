import { toast } from "react-toastify";

export const errorToast = (errorMessage, theme) => {
    return toast.error(errorMessage, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
    });

}

export const infoToast = (infoMessage, theme) => {
    return toast.info(infoMessage, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
    });
}

export const successToast = (successMessage, theme) => {
    return toast.success(successMessage, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
    });
}