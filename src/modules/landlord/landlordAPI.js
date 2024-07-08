import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import config from "../../utils/config";
import LandlordReducer from "./landlordReducer";
import queryString from "query-string";




const keys = (getData = {}) =>{
    let data = {
        slug: null,
        query: {}
    }
    if(getData){
        data = getData
    }
    return{
        getUserTransactions: `${config.api_url}/api/user/get-user-transactions/${data.slug}`,
    }
}




const api = createApi({
    reducerPath: "landlordAPI",
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
        getLandlords: builder.query({
            query: () => "api/landlord",
        }),
    }),
});



export default {
    apiMiddleware: api.middleware,
    apiReducer: api.reducer,
    endpoints: {

    },
    hooks: {
        useLandlords: api.useGetLandlordsQuery,
        //useGetStatistic: api.useGetStatisticQuery,
        //useEditProfile: api.useEditProfileMutation,
    },
    api: api,
    keys: keys
}


