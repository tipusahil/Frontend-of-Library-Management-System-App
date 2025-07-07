
import { booksApi } from "@/redux/api/booksApi";
import { borrowApi } from "@/redux/api/borrowApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
reducer:{
    [booksApi.reducerPath] : booksApi.reducer,
    [borrowApi.reducerPath] : borrowApi.reducer,
},
middleware: ( getDefaultMiddleware ) =>
getDefaultMiddleware().concat(booksApi.middleware , borrowApi.middleware),
});

setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;