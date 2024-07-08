import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import config from "../../utils/config";
import PropertyReducer from "./propertyReducer";
import queryString from "query-string";


const api = createApi({
    reducerPath: "propertyAPI",
    tagTypes: [],
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.api_url}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
           // console.log(token)

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        getProperty: builder.query({
            query: (slug) => {
                return `api/property/${slug}`
            },
        }),
        getProperties: builder.query({
            query: (data) => {
                const query = queryString.stringify(data);
                return `${config.api_url}/api/properties?${query}`
            },
        }),
    }),
});



export default {
    apiMiddleware: api.middleware,
    apiReducer: api.reducer,
    endpoints: {

    },
    hooks: {
        useGetProperty: api.useGetPropertyQuery,
        useGetProperties: api.useGetPropertiesQuery,
        //useEditProfile: api.useEditProfileMutation,
    },
    api: api,
    //keys: keys
}


