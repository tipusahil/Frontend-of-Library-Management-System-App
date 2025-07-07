import App from "@/App";

import BookTable from "@/assets/Components/books/BookTable";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowBook from "@/pages/BorrowBook";
import BorrowSummary from "@/pages/BorrowSummary";

import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";

import { createBrowserRouter } from "react-router";
// import BookList from "@/assets/Components/books/BookList"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "/", Component: Books },
      { path: "/books", Component: Books },
      { path: "/create-book", Component: CreateBook },
      { path: "/borrowsummary", element: <BorrowSummary/> },
      { path: "/books/:id", Component: BookDetails },
      { path: "/edit-book/:id", element: <EditBook /> },
      { path: "/borrow/:id", element: <BorrowBook /> },

      { 
        path: "/booktable", 
        element: <BookTable books={[]} /> //  Replace [] with actual books data source
      },
    ],
  },
]);
