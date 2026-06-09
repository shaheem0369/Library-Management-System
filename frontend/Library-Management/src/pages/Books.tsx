import React, { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { fetchBooks, deleteBook } from '../services/api';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import { toast } from 'sonner';
interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  isAvailable: boolean;
}
const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      toast.error('Failed to load books');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadBooks();
  }, []);
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
        toast.success('Book deleted successfully');
      } catch (error) {
        toast.error('Failed to delete book');
        console.error(error);
      }
    }
  };
  const columns = [{
    header: 'ID',
    accessor: 'id'
  }, {
    header: 'Title',
    accessor: 'title'
  }, {
    header: 'Author',
    accessor: 'author'
  }, {
    header: 'ISBN',
    accessor: 'isbn'
  }, {
    header: 'Availability',
    accessor: 'isAvailable',
    render: (row: Book) => <span className={`px-2 py-1 text-xs rounded-full ${row.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {row.isAvailable ? 'Available' : 'Borrowed'}
        </span>
  }, {
    header: 'Actions',
    accessor: 'actions',
    render: (row: Book) => <div className="flex space-x-2">
          <Button to={`/books/edit/${row.id}`} variant="secondary" className="p-1">
            <PencilIcon size={16} />
          </Button>
          <Button variant="danger" className="p-1" onClick={() => handleDelete(row.id)}>
            <TrashIcon size={16} />
          </Button>
        </div>
  }];
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Books</h1>
        <Button to="/books/add" className="flex items-center">
          <PlusIcon size={18} className="mr-1" />
          Add Book
        </Button>
      </div>
      <Table columns={columns} data={books} isLoading={loading} emptyMessage="No books found. Add a new book to get started." />
    </div>;
};
export default Books;