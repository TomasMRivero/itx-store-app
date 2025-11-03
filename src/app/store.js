import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productApi } from "../features/product/productApi";
import { cartApi } from "../features/cart/cartApi";
import { toastSlice } from "../features/toast/toastSlice";
import { cartSlice } from "../features/cart/cartSlice";
import storage from "redux-persist/es/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const rootReducer = combineReducers({
    [productApi.reducerPath]: productApi.reducer,
    [cartSlice.reducerPath]: cartSlice.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [toastSlice.reducerPath]: toastSlice.reducer,
})


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
        .concat(
            productApi.middleware,
            cartApi.middleware
        ),
});

export const persistor = persistStore(store);