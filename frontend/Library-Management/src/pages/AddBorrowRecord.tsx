import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createBorrowRecord, fetchBooks, fetchMembers } from '../services/api';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { toast } from 'sonner';
interface BorrowRecordFormData {
  bookId: string;
  memberId: string;
  borrowDate: string;
  returnDate?: string;
}
interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
}
interface Member {
  id: string;
  name: string;
  email: string;
}
const AddBorrowRecord: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<BorrowRecordFormData>({
    defaultValues: {
      borrowDate: new Date().toISOString().split('T')[0]
    }
  });
  useEffect(() => {
    const loadData = async () => {
      try {
        setFetchLoading(true);
        const [booksData, membersData] = await Promise.all([fetchBooks(), fetchMembers()]);
        // Filter only available books
        setBooks(booksData.filter((book: Book) => book.available));
        setMembers(membersData);
      } catch (error) {
        toast.error('Failed to load required data');
        console.error(error);
      } finally {
        setFetchLoading(false);
      }
    };
    loadData();
  }, []);
  const onSubmit = async (data: BorrowRecordFormData) => {
    try {
      setLoading(true);
      const payload = {
        book: { id: data.bookId },
        member: { id: data.memberId },
        borrowDate: data.borrowDate,
        returnDate: data.returnDate || null,
      };
      await createBorrowRecord(payload);
      toast.success('Borrow record added successfully');
      navigate('/borrow-records');
    } catch (error) {
      toast.error('Failed to add borrow record');
      console.error(error);
      setLoading(false);
    }
  };
  if (fetchLoading) {
    return <div className="w-full text-center py-10">
        <p className="text-gray-500">Loading data...</p>
      </div>;
  }
  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Borrow Record</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {books.length === 0 && <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 rounded-md">
            No available books to borrow. Please add books or wait for returns.
          </div>}
        {members.length === 0 && <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 rounded-md">
            No members registered. Please add members first.
          </div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-1">
              Book
            </label>
            <select id="bookId" className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.bookId ? 'border-red-300' : ''}`} {...register('bookId', {
            required: 'Book is required'
          })} disabled={books.length === 0}>
              <option value="">Select a book</option>
              {books.map(book => <option key={book.id} value={book.id}>
                  {book.title} by {book.author}
                </option>)}
            </select>
            {errors.bookId && <p className="mt-1 text-sm text-red-600">
                {errors.bookId.message}
              </p>}
          </div>
          <div className="mb-4">
            <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1">
              Member
            </label>
            <select id="memberId" className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.memberId ? 'border-red-300' : ''}`} {...register('memberId', {
            required: 'Member is required'
          })} disabled={members.length === 0}>
              <option value="">Select a member</option>
              {members.map(member => <option key={member.id} value={member.id}>
                  {member.name} ({member.email})
                </option>)}
            </select>
            {errors.memberId && <p className="mt-1 text-sm text-red-600">
                {errors.memberId.message}
              </p>}
          </div>
          <Input label="Borrow Date" type="date" {...register('borrowDate', {
          required: 'Borrow date is required'
        })} error={errors.borrowDate?.message} />
          <Input label="Return Date (Optional)" type="date" {...register('returnDate')} error={errors.returnDate?.message} />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={() => navigate('/borrow-records')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || books.length === 0 || members.length === 0}>
              {loading ? 'Adding...' : 'Create Record'}
            </Button>
          </div>
        </form>
      </div>
    </div>;
};
export default AddBorrowRecord;