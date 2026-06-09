import React, { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { fetchBorrowRecords } from '../services/api';
import Table from '../components/UI/Table';
import Button from '../components/UI/Button';
import { toast } from 'sonner';
interface BorrowRecord {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: string;
  returnDate: string | null;
}
const BorrowRecords: React.FC = () => {
  const [records, setRecords] = useState<BorrowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const loadRecords = async () => {
    try {
      setLoading(true);
      const data = await fetchBorrowRecords();
      setRecords(data);
    } catch (error) {
      toast.error('Failed to load borrow records');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadRecords();
  }, []);
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not returned';
    return new Date(dateString).toLocaleDateString();
  };
  const columns = [{
    header: 'ID',
    accessor: 'id'
  }, {
    header: 'Book ID',
    accessor: 'bookId'
  }, {
    header: 'Member ID',
    accessor: 'memberId'
  }, {
    header: 'Borrow Date',
    accessor: 'borrowDate',
    render: (row: BorrowRecord) => formatDate(row.borrowDate)
  }, {
    header: 'Return Date',
    accessor: 'returnDate',
    render: (row: BorrowRecord) => formatDate(row.returnDate)
  }];
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Borrow Records</h1>
        <Button to="/borrow-records/add" className="flex items-center">
          <PlusIcon size={18} className="mr-1" />
          Add Record
        </Button>
      </div>
      <Table columns={columns} data={records} isLoading={loading} emptyMessage="No borrow records found. Add a new record to get started." />
    </div>;
};
export default BorrowRecords;