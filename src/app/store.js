import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../features/product/productApi";

export const store = configureStore({
    reducer: {
      // RTK Query slices
      [productApi.reducerPath]: productApi.reducer,
      // Aquí puedes agregar otros reducers normales o APIs
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });