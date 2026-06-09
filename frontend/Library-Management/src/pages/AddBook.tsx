import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createBook } from '../services/api';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { toast } from 'sonner';

interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}

const AddBook: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<BookFormData>({
    defaultValues: {
      title: '',
      author: '',
      isbn: '',
      available: true
    }
  });

  const onSubmit = async (data: BookFormData) => {
    try {
      setLoading(true);

      // Ensure JSON matches backend entity mapping
      const payload = {
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        available: data.available
      };

      await createBook(payload);
      toast.success('Book added successfully');
      navigate('/books');
    } catch (error) {
      toast.error('Failed to add book');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Book</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            error={errors.title?.message}
          />
          <Input
            label="Author"
            type="text"
            {...register('author', { required: 'Author is required' })}
            error={errors.author?.message}
          />
          <Input
            label="ISBN"
            type="text"
            {...register('isbn', {
              required: 'ISBN is required',
              minLength: {
                value: 4,
                message: 'ISBN must be at least 4 characters'
              }
            })}
            error={errors.isbn?.message}
          />

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                {...register('available')}
              />
              <span className="ml-2 text-sm text-gray-700">
                Available for borrowing
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/books')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Book'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
