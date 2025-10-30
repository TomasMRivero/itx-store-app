import { createApi } from "@reduxjs/toolkit/query/react";
import { cartBaseQuery } from "../../utils/cartBaseQuery";


export const cartApi = createApi({
    reducerPath: 'cart',
    baseQuery: cartBaseQuery(),
    endpoints: builder => ({
        addToCart: builder.mutation({
            query: (item) => ({
                url: '/cart',
                method: 'POST',
                body: item,
            }),
        }),
        getCart: builder.query({
            queryFn: () => {
                const cached = localStorage.getItem('cartApiCache_counter');
                return cached ? {data: JSON.parse(cached)} : null
            },
        }),
    }),
});

export const { useAddToCartMutation, useGetCartQuery } = cartApi;