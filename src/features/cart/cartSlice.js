import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    updatedAt: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.count = action.payload;
            state.updatedAt = Date.now();
        },
        clearCart: (state) => {
            state.count = 0;
            state.updatedAt = Date.now();
        },
    }
});

export const {setCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;