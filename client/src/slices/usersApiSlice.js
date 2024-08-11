import { apiSlice } from "./apiSlice";

const USERS_URL = '/api'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                body: data,
            }),
        }),
        clockin: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/clock/clockin`,
                method: 'POST',
                body: data,
            }),
        }),
        clockout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/clock/clockout`,
                method: 'POST',
                body: data,
            }),
        }),
        manual: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/clock/manual-clock`,
                method: 'POST',
                body: data,
            }),
        }),
        editUser: builder.mutation({
            query: ({id, ...data}) => ({
                url: `${USERS_URL}/update/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        history: builder.query({
            query: () => ({
                url: `${USERS_URL}/clock/history`,
                method: 'GET',
                params: {
                    limit: 10
                }
            }),
        }),
        getEntry: builder.query({
            query: (userId, entryId) => ({
                url: `${USERS_URL}/clock/entry-user/${userId}/hours-user/${entryId}`,
                method: 'GET',
            }),
        }),
        historyAll: builder.query({
            query: () => ({
                url: `${USERS_URL}/clock/history`,
                method: 'GET',
            }),
        }),
        role: builder.query({
            query: () => ({
                url: `${USERS_URL}/role`,
                method: 'GET',
            }),
        }),
        getAll: builder.query({
            query: () => ({
                url: `${USERS_URL}/all-users`,
                method: 'GET',
            }),
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/user/${id}`,
                method: 'GET',
            }),
        }),
        deleteUser: builder.mutation({
            mutation: (id) => ({
                url: `${USERS_URL}/delete/${id}`,
                method: 'DELETE',
            }),
        }),
    })
})

export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation, 
    useClockinMutation, 
    useClockoutMutation,
    useManualMutation,
    useEditUserMutation,
    useHistoryQuery,
    useRoleQuery,
    useGetAllQuery,
    useGetUserQuery,
    useHistoryAllQuery,
    useDeleteUserMutation,
    useGetEntryQuery,

 } = userApiSlice;