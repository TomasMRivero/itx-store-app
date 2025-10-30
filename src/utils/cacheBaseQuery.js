import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const EXPIRES_AFTER = (Number(import.meta.env.VITE_CACHE_EXPIRES_AFTER_SECONDS) || 3600) * 1000;
const BASE_URL = import.meta.env.VITE_ITX_BASE_URL;

export const cacheBaseQuery = 
    (baseUrl = BASE_URL) => async({ url, method = 'GET', body, params}, api, extraOptions) => {
        const baseQuery = fetchBaseQuery({ baseUrl });
        const key = `${method}_${url}`;

        try {
            const cached = localStorage.getItem(key);
            if(cached){
                const { timestamp, data } = JSON.parse(cached);
                if(!isExpired(timestamp)){
                    return { data, cached: true };
                } else {
                    localStorage.removeItem(key);
                }
            }
            
            const result = await baseQuery({ url, method, body, params }, api, extraOptions);

            if(result.data){
                localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data: result.data }))
            };
            return result;
        } catch (err) {
            return { err };
        }

    }

const isExpired = ts => Date.now() - ts > EXPIRES_AFTER;