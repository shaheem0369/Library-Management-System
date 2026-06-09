import React, { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { fetchMembers, deleteMember } from '../services/api';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import { toast } from 'sonner';
interface Member {
  id: string;
  name: string;
  email: string;
  membershipDate: string;
}
const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = await fetchMembers();
      setMembers(data);
    } catch (error) {
      toast.error('Failed to load members');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMembers();
  }, []);
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteMember(id);
        setMembers(members.filter(member => member.id !== id));
        toast.success('Member deleted successfully');
      } catch (error) {
        toast.error('Failed to delete member');
        console.error(error);
      }
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  const columns = [{
    header: 'ID',
    accessor: 'id'
  }, {
    header: 'Name',
    accessor: 'name'
  }, {
    header: 'Email',
    accessor: 'email'
  }, {
    header: 'Membership Date',
    accessor: 'membershipDate',
    render: (row: Member) => formatDate(row.membershipDate)
  }, {
    header: 'Actions',
    accessor: 'actions',
    render: (row: Member) => <div className="flex space-x-2">
          <Button to={`/members/edit/${row.id}`} variant="secondary" className="p-1">
            <PencilIcon size={16} />
          </Button>
          <Button variant="danger" className="p-1" onClick={() => handleDelete(row.id)}>
            <TrashIcon size={16} />
          </Button>
        </div>
  }];
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Members</h1>
        <Button to="/members/add" className="flex items-center">
          <PlusIcon size={18} className="mr-1" />
          Add Member
        </Button>
      </div>
      <Table columns={columns} data={members} isLoading={loading} emptyMessage="No members found. Add a new member to get started." />
    </div>;
};
export default Members;