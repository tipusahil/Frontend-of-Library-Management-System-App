
import BookTable from '@/assets/Components/books/BookTable';
import { Button } from '@/components/ui/button';
import { useGetBooksQuery } from '@/redux/api/booksApi';

import { Link } from 'react-router-dom';

function Books() {
  const {data,isLoading,error} = useGetBooksQuery( {}, {
// pollingInterval:30000,
refetchOnFocus:true,
refetchOnMountOrArgChange:true,
refetchOnReconnect:true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books: {JSON.stringify(error)}</div>;

  const books = data || []; // books e ekta arrray asce kina dekte hobe, nahoi error dibe. jodi booktable e pataite cai
  // console.log('API Response:', data); 
  console.log('Books api response:', books); 

  return (
    <div>
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-2xl font-bold gradient-text">All Books</h2>
        <Link to="/create-book" className="">
        <Button> Add New Book</Button>
         
        </Link>
      </div>
      <BookTable books={books} />
    </div>
  );
}

export default Books;
