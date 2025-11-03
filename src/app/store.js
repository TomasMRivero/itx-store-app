import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../features/product/productApi";
import { cartApi } from "../features/cart/cartApi";
import { toastSlice } from "../features/toast/toastSlice";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [toastSlice.reducerPath]: toastSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                productApi.middleware,
                cartApi.middleware
            ),
});