import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createMember } from '../services/api';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { toast } from 'sonner';
interface MemberFormData {
  name: string;
  email: string;
  membershipDate: string;
}
const AddMember: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<MemberFormData>({
    defaultValues: {
      membershipDate: new Date().toISOString().split('T')[0]
    }
  });
  const onSubmit = async (data: MemberFormData) => {
    try {
      setLoading(true);
      await createMember(data);
      toast.success('Member added successfully');
      navigate('/members');
    } catch (error) {
      toast.error('Failed to add member');
      console.error(error);
      setLoading(false);
    }
  };
  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Member</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" type="text" {...register('name', {
          required: 'Name is required'
        })} error={errors.name?.message} />
          <Input label="Email" type="email" {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })} error={errors.email?.message} />
          <Input label="Membership Date" type="date" {...register('membershipDate', {
          required: 'Membership date is required'
        })} error={errors.membershipDate?.message} />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={() => navigate('/members')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Member'}
            </Button>
          </div>
        </form>
      </div>
    </div>;
};
export default AddMember;