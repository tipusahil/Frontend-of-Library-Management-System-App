import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IBorrowSummary, TBorrow } from '@/types/borrowTypes';



export const borrowApi = createApi({
    reducerPath:"borrowApi",
      baseQuery: fetchBaseQuery({ baseUrl :  process.env.REACT_APP_API_URL || 'http://localhost:5000/api' }),// ekane backend deploy kora live project api variable jeta .env file e raka se seta use korte hobe, nahoi vite er localhost, test er ketre shudo vite er localhost e joteshto,kintu backend ersate deploy korte er baseUrl er value hisbse .env file REACT_APP_API_URL ei variable ta use korte hobe. 
    tagTypes:["borrowX","booksX"],
    endpoints:(builder) => ({
        // -----1. create borrowBook
    createBorrowBook : builder.mutation<TBorrow, Partial<TBorrow>>({
            query: (borrow) => ({
                url: "/borrow",
                method: "POST",
                body: borrow
            }),
            invalidatesTags: ['borrowX','booksX'],
        }),
        // ----2. get borrow summary 
        getBorrowSummary: builder.query<IBorrowSummary[], void>({
            query:() => `/borrow/summary`,
           providesTags: ['borrowX']
        }),
        // ----3. delete borrowBook
        deleteBorrowBook : builder.mutation<void, string>({
            query: (borrowId)=> ({
                url:`/borrow/${borrowId}`,
                method: "DELETE"
            }),
            invalidatesTags:['borrowX','booksX'],

        })

    }),
});

export const { 
    useCreateBorrowBookMutation ,
     useGetBorrowSummaryQuery ,
     useDeleteBorrowBookMutation
    } = borrowApi;

