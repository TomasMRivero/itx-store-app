import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCart } from "./cartSlice";
import labels from '../../i18n/es.json';
import { setToast, TOAST_SUCCESS } from "../toast/toastSlice";

const BASE_URL = import.meta.env.VITE_ITX_BASE_URL;

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Cart"],
    endpoints: builder => ({
        addToCart: builder.mutation({
            query: (item) => ({
                url: '/cart',
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ["Cart"],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try{
                    const {data} = await queryFulfilled;
                    console.log(data)
                    dispatch(setCart(data.count));
                    dispatch(setToast({ message: labels.cart.addToCart.success, type: TOAST_SUCCESS}));
                } catch {
                    dispatch(setToast({ message: labels.cart.addToCart.error }));
                }
            }
        }),
    }),
});

export const { useAddToCartMutation, useGetCartQuery } = cartApi;