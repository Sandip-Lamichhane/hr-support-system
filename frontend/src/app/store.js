import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/auth/authApi';

export default configureStore({
    reducer: {
        //auth reducer
        [authApi.reducer]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});