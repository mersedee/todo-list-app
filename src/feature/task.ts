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

        getCompletedTasks: builder.query({
            query: () => 'https://api.todoist.com/sync/v8/completed/get_all',
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

        updateTask: builder.mutation<void, number>({
            query: (id) => ({
                url: `tasks/${id}/close`,
                method: 'POST',
            }),
            invalidatesTags: ['Task'],
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

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;