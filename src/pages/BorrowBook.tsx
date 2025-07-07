import { BorrowFormModal } from "@/assets/Components/borrow/BorrowFormModal";
import { LiquidButton } from "@/components/animate-ui/buttons/liquid";

import SpotlightCard from "@/reactsBitsComponents/ComponentsBits/SpotlightCard/SpotlightCard";
import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import type { Tbook } from "@/types/bookTypes";
import { ArrowLeft } from "lucide-react";

import { useNavigate, useParams } from "react-router";


const BorrowBook = () => {
 
   const { id } = useParams();
   const navigate = useNavigate();
 
   type BookResponseType = {
       success: boolean;
       message: string;
       data: Tbook ;
   };
 
   const { data, isLoading, error } = useGetBookByIdQuery(id ?? "") as {
     data: BookResponseType | undefined;
     isLoading: boolean;
     error: unknown;
   };
 
   if (isLoading) {
     return <div>bookDetails is loading...</div>;
   }
   if (error) {
     return <div>book details not loading, please try again</div>;
   }
   if (!data) {
     return <div>book details not found!</div>;
   }
 
   const book: Tbook = data.data;
   console.log("bookta holo= ", book);
 
   return( 
   <div className="    w-full flex justify-center items-center  h-full border border-red-300 ">
     <SpotlightCard className="custom-spotlight-card bg-glassy" spotlightColor="rgba(10, 229, 255, 0.5)">
 
 <div className="card bg-base-100 w-96 shadow-sm bg-glassy">
 
   <figure className="px-10 pt-10 shadow-2xl rounded-2xl pb-2">
     <img
       src={book.image}
       alt="Book"
       className="rounded-xl" />
   </figure>
   <div className="card-body items-center text-center space-y-3 ">
     <h2 className="card-title">{book.title}</h2>
     <p> {book.description} </p>
     <div className="card-actions flex justify-center">
       <LiquidButton  onClick={()=> navigate("/books")} > <ArrowLeft/> Back </LiquidButton>
      <BorrowFormModal /> 
     
       {/* <Button > <Link to={`/borrow/${book._id}`}>borrow this book</Link> </Button> */}
 
     </div>
   </div>
 </div>
 
 </SpotlightCard>
   </div>
   );
 };
 
export default BorrowBook;
