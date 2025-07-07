import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import  type { bookResponseType, Tbook } from '@/types/bookTypes'// ekane type import korsi tai (type) keyword likte hobe.


export const booksApi = createApi({
    reducerPath:"booksApi",
    baseQuery: fetchBaseQuery({baseUrl : process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}),
   
        // ekane backend deploy kora live project api variable jeta .env file e raka se seta use korte hobe, nahoi vite er localhost, test er ketre shudo vite er localhost e joteshto,kintu backend ersate deploy korte er baseUrl er value hisbse .env file REACT_APP_API_URL ei variable ta use korte hobe. 
    tagTypes:['booksX'],
    endpoints:(builder) => ({
        // ---------getAllBooks by query or normal:
        getBooks : builder.query<Tbook[], {filter?: string;  sortBy?: string; sort?: string; limit?: number }>({
            query: ({ filter, sortBy, sort, limit }) => ({
                url: "/books",
                params: {filter, sortBy, sort, limit },
            }),
            providesTags: ['booksX'],
            transformResponse: (response: {data : Tbook[] }) => response.data || [],
        }),
        // ------2. get single book by bookId:
        getBookById: builder.query<bookResponseType,string> ({
            query:(bookId) => `/books/${bookId}`,
            providesTags: ['booksX'],

        }),
        // -----3.create book method-post: 
        createBook: builder.mutation< Tbook, Partial<Tbook> >({
            query: (book)=> ({
                url: "/books",
                method : "POST",
                body: book,
            }),
            invalidatesTags:['booksX'],
        }),
        // ------4. update book by bookId: 
        updateBook : builder.mutation<Tbook, {id: string;  newSomeDataforUpdateBook :  Partial<Tbook> }>({
            // Partial<T> TypeScript-এর built-in utility type, যা T নামে যেকোনো object টাইপের সব properties কে optional বানিয়ে ফেলে।
            // Partial<Tbook> ei partial keyword er karone Tbook type er sob properties k optional hisebe newa hocce, mane client/user caile Ibook er jekuno property ditew parbe abar naw dite parbe,mane optional kora hoise. but jodi partial<X> evabe na lika hoto thle Tbook er sob property update korar smy required kora hoto,but update to pura book korbona, book er jekuno 1/2 ta property value update korbo,so tai partial kora hoyece jate sob propertty optional hoi
            query: ({id , newSomeDataforUpdateBook}) => ({
                url: `/books/${id}`,
                method: 'PATCH',
                body : newSomeDataforUpdateBook,
            }),
            invalidatesTags: ['booksX'],
        }),
        // ------5. replaced book by bookId:
        replaceBook : builder.mutation< Tbook, {id:string, AllNewDataForOldBookReplace: Tbook }>({
            query: ({id,AllNewDataForOldBookReplace}) => ({
                url : `books/${id}`,
                method: "PUT",
                body : AllNewDataForOldBookReplace,
            }),
            invalidatesTags: ['booksX'],
        }),
        // -------6. deletebook by bookId: 
        deleteBook : builder.mutation< void, string >({
           query: (bookId)=>({
             url : `books/${bookId}`,
             method: "DELETE",
           }),
           invalidatesTags: ['booksX'],
        }),
    }),
});

export const { 

    useGetBooksQuery ,
    useGetBookByIdQuery,
     useCreateBookMutation,
     useUpdateBookMutation,
     useReplaceBookMutation,
     useDeleteBookMutation,
    } = booksApi;

