import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import config from "../../utils/config";
import AppointmentReducer from "./appointmentReducer";
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
    reducerPath: "appointmentAPI",
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
        getAppointmentKeyfacilitation: builder.query({
            query: ({type, slug}) => {
                if (type === "key_facilitation") {
                    return `api/key-facilitation/get-key-facilitation/${slug}`
                }

                if (type === "appointment") {
                    return `api/appointment/get-appointment/${slug}`
                }
            },
        }),
        getPropertyAppointmentsAcceptedDelegate: builder.query({
            query: ({limit=3, slug}) => {
                return `api/appointment/get-property-appointments-accepted-delegate/${slug}?limit=${limit}`
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
        useAppointmentKeyfacilitation: api.useGetAppointmentKeyfacilitationQuery,
        usePropertyAppointmentsAcceptedDelegate: api.useGetPropertyAppointmentsAcceptedDelegateQuery,
        //useEditProfile: api.useEditProfileMutation,
    },
    api: api,
    keys: keys
}


