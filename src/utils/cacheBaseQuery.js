import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const EXPIRES_AFTER = 6000;

export const cacheBaseQuery = 
    baseUrl => async({ url, method = 'GET', body, params}, api, extraOptions) => {
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