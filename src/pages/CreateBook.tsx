import { useCreateBookMutation } from "@/redux/api/booksApi";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateBook = () => {
  
  const [formData, setFormData]  = useState({
    title: "",
    author:'',
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
    available: false,
  });

  const [createBook]  = useCreateBookMutation();
  const navigate = useNavigate();

// ---------handlesubmit start here-----------------
  const handleSubmit = async (event : React.FormEvent ) =>{
event.preventDefault();

try {
    await createBook(formData).unwrap();
    toast.success(" book successfully created.✅");
    navigate("/books")
} catch  {
    toast.error(" Failed t create book!🤔")
}

  }

  // ---------handlesubmit end here-----------------

  return (
     <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Genre</label>
          <select
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Genre</option>
            <option value="FICTION">Fiction</option>
            <option value="NON_FICTION">Non-Fiction</option>
            <option value="SCIENCE">Science</option>
            <option value="HISTORY">History</option>
            <option value="BIOGRAPHY">Biography</option>
            <option value="FANTASY">Fantasy</option>
          </select>
        </div>
        <div>
          <label className="block">ISBN</label>
          <input
            type="text"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block">Copies</label>
          <input
            type="number"
            value={formData.copies}
            onChange={(e) => setFormData({ ...formData, copies: Number(e.target.value) })}
            className="w-full border p-2 rounded"
            required
            min="0"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
