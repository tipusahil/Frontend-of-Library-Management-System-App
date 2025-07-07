
export type Tbook ={
  _id: string,
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  image:string,
  description?: string;
  copies: number;
  available: boolean;
  updateBookAvailability():void;
}

export type bookResponseType = {
  success: boolean;
  message: string;
  data: Tbook;
};