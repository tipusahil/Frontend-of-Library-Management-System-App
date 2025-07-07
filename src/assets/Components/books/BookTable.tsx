import { useDeleteBookMutation } from '@/redux/api/booksApi';
import type { Tbook } from '@/types/bookTypes';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type BookTableProps = {
  books: Tbook[];
}

function BookTable({ books }: BookTableProps) {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id).unwrap();
        toast.success('Book deleted successfully');
      } catch {
        toast.error('Failed to delete book');
      }
    }
  };


  if(!Array.isArray(books)){// books = jodi array na hoi tahole no books available show korbe
    return <div>No books Available</div>
  }



  return (
    <div className="overflow-x-auto">
      <table className="min-w-full  border">
        <thead className="bg-glassy">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Genre</th>
            <th className="px-4 py-2 border">ISBN</th>
            <th className="px-4 py-2 border">Copies</th>
            <th className="px-4 py-2 border">Availability</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="px-4 py-2 border">{book.title}</td>
              <td className="px-4 py-2 border">{book.author}</td>
              <td className="px-4 py-2 border">{book.genre}</td>
              <td className="px-4 py-2 border">{book.isbn}</td>
              <td className="px-4 py-2 border">{book.copies}</td>
              <td className="px-4 py-2 border">{book.available ? 'Available' : 'Unavailable'}</td>
              <td className="px-4 py-2 border space-x-2">
                <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline">View</Link>
                <Link to={`/edit-book/${book._id}`} className="text-green-500 hover:underline">Edit</Link>
                <Link to={`/borrow/${book._id}`}   className="text-yellow-500 hover:underline">Borrow</Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;
