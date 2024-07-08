import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//import cookie from "js-cookie";
import config from "../../utils/config";



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
        getCountries: `${config.api_url}/api/app/countries`,
    }
}



const api = createApi({
    reducerPath: "appAPI",
    //tagTypes: ['Countries'],
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.api_url}/`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: () => "api/app/countries",
        }),
        getLocalities: builder.query({
            query: () => "api/app/localities",
        }),
        getAmenities: builder.query({
            query: () => "api/property-amenities",
            //cacheTime: 0,
        }),


        /*getUsers: builder.query({
            query: () => "users",
            providesTags: (result, error, id) => [{type: 'User', id}],
        }),
        getUserById: builder.query({
            query: ({id}) => `users/${id}`,
            providesTags: (result, error, id) => [{type: 'User', id}],
        }),
        addTodo: builder.mutation({
            query: (newTodo) => ({
                url: 'todos',
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: [{type: 'User', id: 'LIST'}],
        }),
        removeTodo: builder.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE',
            }),
        }),*/
        /*deletePost: builder.mutation({
            query(id) {
                return {
                    url: `posts/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{type: 'Post', id}],
        }),*/
        /*updatePost: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    api.util.updateQueryData('getPost', id, (draft) => {
                        Object.assign(draft, patch)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: (result, error, {id}) => [{type: 'Post', id}],
        }),*/
    }),
});

//export const {useGetUsersQuery, useGetUserByIdQuery, endpoints} = userApi;
//useAddTodoMutation

export default {
    apiMiddleware: api.middleware,
    apiReducer: api.reducer,
    endpoints: {},
    hooks: {
        useCountries: api.useGetCountriesQuery,
        useLocalities: api.useGetLocalitiesQuery,
        useAmenities: api.useGetAmenitiesQuery,
    },
    api: api,
    keys:keys
}


