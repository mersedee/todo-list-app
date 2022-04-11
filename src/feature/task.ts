import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Task} from '../models';


const token = process.env.REACT_APP_API_KEY;

export const tasksApi = createApi({
    reducerPath: 'tasks',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.todoist.com/rest/v1",
        prepareHeaders: (headers, { getState }) => {
            headers.set('authorization', `Bearer ${token}`);
            return headers
        },
    }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => 'tasks',
            providesTags: ['Task'],
        }),

        addTask: builder.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: `tasks`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: task
            }),
            invalidatesTags: ['Task'],
        }),
    }),
})

export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;