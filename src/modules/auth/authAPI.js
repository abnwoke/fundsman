import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import config from "../../utils/config";

import AuthReducer from "./authReducer";
import User from "../user";


const isVerifiedAccount = (data) =>{
    const account_type = data?.account_type;
    const license_type = data?.license_type;
    const types = ['LocationManager', 'Agent', 'Landlord'];
    if(types.includes(account_type) && types.includes(license_type)){
        return true
    }
    return  false
}


const api = createApi({
    reducerPath: "authAPI",
    tagTypes: ['Auth'],
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

        login: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/auth/login`,
                method: 'POST',
                body: patch,
                /*headers: {
                    'content-type': 'text/plain',
                },*/
                validateStatus: (response, result) =>   true
            }),
            //transformResponse: (response, meta, arg) => response,
            //transformErrorResponse: (response, meta, arg) => response.status,
            async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
                try {
                    const body = patch;
                    const res_query = await queryFulfilled;
                    const res = res_query?.data;
                    if (res.success) {
                        const payload = {
                            token: res.token,
                            ...res.data
                        }
                        dispatch(AuthReducer.actions.login(payload))
                        dispatch(User.actions.login(payload))
                    }
                } catch(e) {
                }
            },
        }),

        register: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/auth/register`,
                method: 'POST',
                body: patch,
            }),
            async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
                try {
                    const body = patch;
                    const res_query = await queryFulfilled;
                    const res = res_query?.data;

                    if (res.success) {
                        const payload = {
                            token: res.token,
                            ...res.data
                        }
                        setCredentials(payload)
                        dispatch(AuthReducer.actions.login(payload))
                        dispatch(User.actions.login(payload))
                    }
                } catch {

                }
            },
        }),


        checkAccount: builder.mutation({
            query: ({slug, ...patch}) => ({
                url: `api/auth/check-account/${slug}`,
                method: 'POST',
                body: patch,
            })
        }),

        sendTemporaryPassword: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/auth/send-temporary-password`,
                method: 'POST',
                body: patch,
            })
        }),

        verifyEmail: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/auth/confirm-email`,
                method: 'POST',
                body: patch,
            }),
            async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
                try {
                    const body = patch;
                    const res_query = await queryFulfilled;
                    const res = res_query?.data;
                    if (res.success) {
                        const payload = {
                            token: res.token,
                            ...res.data
                        }
                        dispatch(AuthReducer.actions.login(payload))
                        dispatch(User.actions.login(payload))
                    }
                } catch {

                }
            },
        }),


        sendVerificationEmail: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/auth/send-verification-email`,
                method: 'POST',
                body: patch,
            }),
        }),



        changePassword: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/auth/change-password`,
                method: 'POST',
                body: patch,
            }),
        }),



        sendPasswordRestCodeEmail: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/auth/send-reset-password-email`,
                method: 'POST',
                body: patch,
            }),
        }),


       verifyPasswordResetCode: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/auth/verify-password-reset-code`,
                method: 'POST',
                body: patch,
            }),
        }),


        resetPassword: builder.mutation({
            query: ({id, ...patch}) => ({
                url: `api/auth/reset-password`,
                method: 'POST',
                body: patch,
            }),
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
    utils: {
        isVerifiedAccount,
    },
    hooks: {
        useLogin: api.useLoginMutation,
        useRegister: api.useRegisterMutation,
        useCheckAccount: api.useCheckAccountMutation,
        useSendTemporaryPassword: api.useSendTemporaryPasswordMutation,
        useChangePassword: api.useChangePasswordMutation,
        useSendVerificationEmail: api.useSendVerificationEmailMutation,
        useVerifyEmail: api.useVerifyEmailMutation,
        useResetPassword: api.useResetPasswordMutation,
        useVerifyPasswordResetCode: api.useVerifyPasswordResetCodeMutation,
        useSendPasswordRestCodeEmail: api.useSendPasswordRestCodeEmailMutation,
    },
    api: api
}


