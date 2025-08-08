import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './clientSlice';

export const store = configureStore({
    reducer: {
        clients: clientReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
