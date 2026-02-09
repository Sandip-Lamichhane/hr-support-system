import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/auth/authApi';

export default configureStore({
    reducer: {
        // auth reducer (use reducerPath as the key so state.authApi exists)
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});