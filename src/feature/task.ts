import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Task} from '../models';


const token = process.env.REACT_APP_API_KEY;

export const tasksApi = createApi({
    reducerPath: 'tasks',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.todoist.com/rest/v1",
        prepareHeaders: (headers, {getState}) => {
            headers.set('authorization', `Bearer ${token}`);
            return headers
        },
    }),
    tagTypes: ['Task', 'CompletedTask'],

    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => 'tasks',
            providesTags: ['Task'],
        }),

        getCompletedTasks: builder.query({
            query: () => 'https://api.todoist.com/sync/v8/completed/get_all',
            providesTags: ['CompletedTask'],
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

        closeTask: builder.mutation<void, number>({
            query: (id) => ({
                url: `tasks/${id}/close`,
                method: 'POST',
            }),
            invalidatesTags: ['Task'],
        }),

        reopenTask: builder.mutation<void, number>({
            query: (id) => ({
                url: `tasks/${id}/reopen`,
                method: 'POST',
            }),
            invalidatesTags: ['CompletedTask'],
        }),

        deleteTask: builder.mutation<void, number>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),
    }),
})

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useCloseTaskMutation,
    useReopenTaskMutation,
    useDeleteTaskMutation,
    useGetCompletedTasksQuery,
} = tasksApi;