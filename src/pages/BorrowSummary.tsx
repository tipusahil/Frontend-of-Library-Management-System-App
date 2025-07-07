



import { useDeleteBorrowBookMutation, useGetBorrowSummaryQuery } from "@/redux/api/borrowApi";
import type { IBorrowSummary } from "@/types/borrowTypes";


interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: IBorrowSummary[];
}

const BorrowSummary = () => {
  // -------------delete brrowBook--------------
// const [deleteBorrowBook,{isLoading: deleteLoading}] = useDeleteBorrowBookMutation();
// if(deleteLoading){return <div>deleting....</div>}

  // -----------1..summary fetching-----
  const { data, isLoading, error } = useGetBorrowSummaryQuery() as {
    data: BorrowSummaryResponse[] | undefined;
    isLoading: boolean;
    error: unknown;
  };;

  if (isLoading) {
    return <div>Loading Borrow Summary...</div>;
  }
  if (error) {
    console.log(error);
    return <div> Loading Failed borrow Loading Summary!🤔</div>;
  }

if (!data || !data.data || data.data.length === 0) {
    return <div>Borrow summary not found!</div>;
  }

  const summary: IBorrowSummary[] = data.data;

  console.log(summary);

  return ( <header>
    <div >
  
    
    <div >total Borrowed Books: {data.data.length}</div>

      <div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Book Title</th>
        <th>Isbn</th>
        <th>Total borrowed Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
{summary.map((sum1, index) => (
      <tbody>
      {/* row 1 */}
     
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={sum1.book?.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{sum1.book.title}</div>
              <div className="text-sm opacity-50">author : {sum1.book?.author ? sum1.book?.author : "Unknown" }</div>
            </div>
          </div>
        </td>
        <td>
          {sum1.book?.isbn}
          <br />
          {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
        </td>
        <td className="text-center">{sum1.totalQuantity}</td>
        <th>
          <button  className="btn btn-ghost btn-xs">Delete</button>
        </th>
      </tr>
      

    </tbody>
      ))}
  
    {/* foot */}
  
  </table>
</div>
      </div>

    </div>
  </header>);
};

export default BorrowSummary;
