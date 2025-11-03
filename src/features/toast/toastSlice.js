import { createSlice } from "@reduxjs/toolkit";

export const TOAST_ERROR = 'error';
export const TOAST_WARNING = 'warning';
export const TOAST_INFO = "info";
export const TOAST_SUCCESS = 'success';

const initialState = {
    message: null,
    type: error,
    open: false,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action) => {
            const { message, type = TOAST_ERROR } = action.payload;
            state.message = message;
            state.type = type;
            state.open = true;
        },
        clearToast: state => {
            state.message = null;
            state.open = false;
        },
    },
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;