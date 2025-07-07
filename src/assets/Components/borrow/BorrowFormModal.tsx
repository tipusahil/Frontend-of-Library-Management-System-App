import { FlipButton } from "@/components/animate-ui/buttons/flip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { useCreateBorrowBookMutation } from "@/redux/api/borrowApi";
import type { Tbook } from "@/types/bookTypes";
import type { BorrowResponseType } from "@/types/borrowTypes";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; 
import { toast } from "react-toastify";

export function BorrowFormModal() {

  

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  console.log(id);

// ------------------------------------------------------
  type BookResponseType = {
      success: boolean;
      message: string;
      data: Tbook ;
  };

  const { data, isLoading: bookLoading , error } = useGetBookByIdQuery(id ?? "") as {
    data: BookResponseType | undefined;
    isLoading: boolean;
    error: unknown;
  };

  if (bookLoading) {
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
// ------------------------------------------------------


// -------------
  const form = useForm({
  defaultValues: {
    Quantity: 1,
    dueDate: undefined, // ✅ camelCase
  },
});
// ----------------------
  // ------ 
  const [createBorrowBook, {isLoading}] = useCreateBorrowBookMutation();

  

  
  // ------

  const borrowBookHandler_onsubmit1 : SubmitHandler<FieldValues> = async (inputsValues) => {

 try {
      const setBorrowBookData = {
        quantity: Number(inputsValues.Quantity),
        dueDate: inputsValues.dueDate ? format(inputsValues.dueDate, "yyyy-MM-dd") : undefined,
        book: id,
        image:book.image,
        author:book.author
      };

      const setCreateBorrowBook: BorrowResponseType = await createBorrowBook(setBorrowBookData).unwrap();

      if (!setCreateBorrowBook.success) {
        toast.error(setCreateBorrowBook.message);
      } else {
        toast.success(setCreateBorrowBook.message);
        navigate('/books'); 
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to borrow book');
    }

    setOpenModal(false);
    form.reset();
  };
  //-----
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <FlipButton
          frontText="Borrow Book📔"
          backText="Borrow Book :)"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Please Fill This Form</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {/* -----------------form start here------------------ */}
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(borrowBookHandler_onsubmit1)}>


              {/* -------------field-1---Quanty field-start here-------------- */}
              <FormField
                control={form.control}
                name="Quantity"
                rules={{
                  required:"Quantity Is Required!",
                  min:{value:1, message:`Quantity must be at least 1`},
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="borrow quantity"   type="number" {...field}  value={field.value || ""}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
{/* -------------field-1---Quanty field- end here-------------- */}
{/* -------------field-2--due Date start here ------------ */}
           
        
<FormField
  control={form.control}
  name="dueDate"
rules={{
  required: `Due Date is required!`,
}}
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Due Date</FormLabel>
     <Popover>
  <PopoverTrigger asChild>
    <Button
      variant={"outline"}
    
      role="combobox"
      className={cn(
        "w-full pl-3 text-left font-normal",
        !field.value && "text-muted-foreground"
      )}
    >
      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
      <CalendarIcon className="ml-auto h-4 w-24  opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={  
        field.value  instanceof Date ? field.value : undefined 
      }
      onSelect={field.onChange}
      captionLayout="dropdown"
    disabled={(date) => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 1);

  return date < today || date > maxDate;
}}

    />
  </PopoverContent>
</Popover>

      <FormMessage />
    </FormItem>
  )}
/>

        {/* -------------field-2--due Date end here ------------ */}
              {/* -------------form footer-------- */}

              <DialogFooter className="py-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>{isLoading ? "Borrowing...":"Saved"}</Button>
              </DialogFooter>

              {/* ---- */}
            </form>
          </Form>
        </div>

        {/* -----------------form end here------------------ */}
      </DialogContent>
    </Dialog>
  );
}
