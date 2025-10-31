import { createApi } from "@reduxjs/toolkit/query/react";
import { cartBaseQuery } from "../../utils/cartBaseQuery";


export const cartApi = createApi({
    reducerPath: 'cart',
    baseQuery: cartBaseQuery(),
    tagTypes: ["Cart"],
    endpoints: builder => ({
        addToCart: builder.mutation({
            query: (item) => ({
                url: '/cart',
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ["Cart"],
        }),
        getCart: builder.query({
            queryFn: () => {
                const cached = localStorage.getItem('cartApiCache_counter');
                return cached ? { data: JSON.parse(cached) } : { data: null }
            },
            providesTags: ["Cart"],
        }),
    }),
});

export const { useAddToCartMutation, useGetCartQuery } = cartApi;