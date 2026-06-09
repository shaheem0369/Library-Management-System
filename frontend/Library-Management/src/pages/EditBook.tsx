import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchBook, updateBook } from '../services/api';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { toast } from 'sonner';
interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}
const EditBook: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm<BookFormData>();
  useEffect(() => {
    const loadBook = async () => {
      try {
        setFetchLoading(true);
        const book = await fetchBook(id as string);
        reset(book);
      } catch (error) {
        toast.error('Failed to load book details');
        console.error(error);
        navigate('/books');
      } finally {
        setFetchLoading(false);
      }
    };
    loadBook();
  }, [id, navigate, reset]);
  const onSubmit = async (data: BookFormData) => {
    try {
      setLoading(true);
      await updateBook(id as string, data);
      toast.success('Book updated successfully');
      navigate('/books');
    } catch (error) {
      toast.error('Failed to update book');
      console.error(error);
      setLoading(false);
    }
  };
  if (fetchLoading) {
    return <div className="w-full text-center py-10">
        <p className="text-gray-500">Loading book details...</p>
      </div>;
  }
  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Book</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Title" type="text" {...register('title', {
          required: 'Title is required'
        })} error={errors.title?.message} />
          <Input label="Author" type="text" {...register('author', {
          required: 'Author is required'
        })} error={errors.author?.message} />
          <Input label="ISBN" type="text" {...register('isbn', {
          required: 'ISBN is required',
          pattern: {
            value: /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
            message: 'Please enter a valid ISBN'
          }
        })} error={errors.isbn?.message} />
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" {...register('available')} />
              <span className="ml-2 text-sm text-gray-700">
                Available for borrowing
              </span>
            </label>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={() => navigate('/books')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Book'}
            </Button>
          </div>
        </form>
      </div>
    </div>;
};
export default EditBook;