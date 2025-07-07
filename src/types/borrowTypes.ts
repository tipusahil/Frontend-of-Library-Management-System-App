// book, quantity, dueDate
// import {Types} from "mongoose";


export type TBorrow = {
  quantity: number;
  dueDate: string;
  image?:string;
  author?:string;

 
}

export interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
    author?:string;
    image?:string;
  };
  totalQuantity: number;
};


export type BorrowResponseType = {
  success: boolean;
  message: string;
  data: TBorrow;
};