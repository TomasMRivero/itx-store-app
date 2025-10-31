import { createApi } from "@reduxjs/toolkit/query/react";
import { cacheBaseQuery } from "../../utils/cacheBaseQuery";

export const productApi = createApi({
    reducerPath: 'product',
    baseQuery: cacheBaseQuery(),
    endpoints: builder => ({
        getProductList: builder.query({
            query: () => ({ url: '/product' }),
        }),
        getProductById: builder.query({
            query: (id) => ({ url: `/product/${id}` }),
        }),
    }),
});

export const {
    useGetProductListQuery,
    useGetProductByIdQuery
} = productApi;