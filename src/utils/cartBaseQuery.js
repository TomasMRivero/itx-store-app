import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const BASE_URL = import.meta.env.VITE_ITX_BASE_URL;

export const cartBaseQuery =
    (baseUrl = BASE_URL) => async ({ url, method = 'POST', body }, api, extraOptions) => {
        const baseQuery = fetchBaseQuery({ baseUrl });
        const key = `cartApiCache_counter`;

        try {
            const result = await baseQuery({ url, method, body }, api, extraOptions);

            if (result.data) {
                localStorage.setItem(key, JSON.stringify(result.data))
            }

            return result;
        } catch (err) {

            const cached = localStorage.getItem(key);
            if (cached) return { data: JSON.parse(cached) };

            return { error: err };
        }

    }