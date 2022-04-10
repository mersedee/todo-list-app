import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


const token = process.env.REACT_APP_API_KEY;

export const tasksApi = createApi({
    reducerPath: 'tasks',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.todoist.com/rest/v1",
        prepareHeaders: (headers, { getState }) => {
            headers.set('content-type', `application/json`);
            headers.set('authorization', `Bearer ${token}`);
            return headers
        },
    }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => 'tasks',
        }),
    }),
})

export const { useGetTasksQuery } = tasksApi;