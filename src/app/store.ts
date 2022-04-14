import {configureStore} from "@reduxjs/toolkit";

import {tasksApi} from "../services/task";


export const store = configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddiware) => getDefaultMiddiware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;