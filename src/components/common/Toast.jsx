import { useDispatch, useSelector } from "react-redux"
import { clearToast } from "../../features/toast/toastSlice";
import { Alert, Snackbar } from "@mui/material";

const Toast = () => {
    const dispatch = useDispatch();
    const {message, type, open} = useSelector((state) => state.toast);

    const handleClose = (_, reason) => {
        if ('clickaway' === reason) return;
        dispatch(clearToast());
    }

    return(
        <Snackbar
            open = {open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
        >
            <Alert
                onClose={handleClose}
                severity = {type || 'error'}
                variant= "filled"
                sx = {{
                    width: '100%',
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast;