import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import config from "../../utils/config";
import AuthReducer from "../auth/authReducer";
import UserReducer from "./userReducer";
import queryString from "query-string";





const setCredentials = (data) =>{
    cookie.remove(authConstants.TOKEN_NAME);
    cookie.set(authConstants.TOKEN_NAME, data.token, {
        //path: '/',
        //domain : process.env.NODE_ENV === 'production'? config.host : 'localhost',
        ///httpOnly: true,
        //secure : process.env.NODE_ENV === 'production',
        expires: config.cookie_expiring_date
    });
}



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



const getAccountStatistics = async (slug, token) => {
    try {
        const response = await fetch(`${config.api_url}/api/user/get-account-statistics/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            method: 'GET',
            cache: 'no-store', // force-cache | no-store
            next: {
                //revalidate: 3600 //Time-based Revalidation
            }
        });
        const res = await response.json();
        if(res.success){
            return res.data
        } else {
            return null
        }
    } catch (e) {
        console.log(e)
        return null
    }
}




const api = createApi({
    reducerPath: "userAPI",
    tagTypes: ['User',],
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
        getUsers: builder.query({
            //query: () => "users",
            query: ({id, ...patch}) => ({
                url: `users`,
                validateStatus: (response, result) =>   true
            }),
        }),
        getUser: builder.query({
            query: (slug) => `api/user/${slug}`,
            async onQueryStarted(props) {
                try {
                    //{ ...patch}, {dispatch, queryFulfilled}
                    //console.log(props)
                    /*const res_query = await queryFulfilled;
                    const res = res_query?.data;
                    if (res.success) {
                        //console.log(res)
                        const payload = {`
                            ...res.data
                        }
                        dispatch(UserReducer.actions.updateProfile(payload))
                    }*/

                } catch {

                }
            },
            onQueryFailed: (error, { dispatch }) => {
                // Handle error here
                console.error("Error occurred while fetching user:", error);
                // Dispatch an action to handle the error state in Redux store if needed
            },
        }),
        getStatistic: builder.query({
            query: (slug) => `api/wallet/${slug}`,
        }),


        editProfile: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/user`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
                try {
                    const body = patch;
                    const res_query = await queryFulfilled;
                    const res = res_query?.data;

                    if (res.success) {
                        const payload = {
                            ...res.data
                        }
                        dispatch(UserReducer.actions.editProfile(payload))
                    }
                } catch {

                }
            },
        }),

    }),
});

//export const {useGetUsersQuery, useGetUserByIdQuery, endpoints} = userApi;

//useAddTodoMutation

export default {
    apiMiddleware: api.middleware,
    apiReducer: api.reducer,
    endpoints: {
        //getAccountStatistics
    },
    hooks: {
        useGetUsers: api.useGetUsersQuery,
        useGetUser: api.useGetUserQuery,
        useGetStatistic: api.useGetStatisticQuery,
        useEditProfile: api.useEditProfileMutation,
    },
    api: api,
    keys: keys
}


