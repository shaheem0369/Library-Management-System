import React, { useEffect, useState } from 'react';
import { BookIcon, UsersIcon, CalendarIcon } from 'lucide-react';
import { fetchDashboardStats } from '../services/api';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { toast } from 'sonner';
interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
  borrowedBooks: number;
}
const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    totalMembers: 0,
    borrowedBooks: 0
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        toast.error('Failed to load dashboard statistics');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);
  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to the Library Management System
        </p>
      </div>
      {loading ? <div className="text-center py-10">
          <p className="text-gray-500">Loading statistics...</p>
        </div> : <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card title="Total Books" value={stats.totalBooks} icon={<BookIcon size={24} className="text-white" />} color="bg-blue-500" />
            <Card title="Total Members" value={stats.totalMembers} icon={<UsersIcon size={24} className="text-white" />} color="bg-green-500" />
            <Card title="Borrowed Books" value={stats.borrowedBooks} icon={<CalendarIcon size={24} className="text-white" />} color="bg-purple-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Books</h3>
              <div className="space-y-2">
                <Button to="/books" variant="secondary" className="w-full">
                  View All Books
                </Button>
                <Button to="/books/add" className="w-full">
                  Add New Book
                </Button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Members</h3>
              <div className="space-y-2">
                <Button to="/members" variant="secondary" className="w-full">
                  View All Members
                </Button>
                <Button to="/members/add" className="w-full">
                  Add New Member
                </Button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Borrow Records</h3>
              <div className="space-y-2">
                <Button to="/borrow-records" variant="secondary" className="w-full">
                  View All Records
                </Button>
                <Button to="/borrow-records/add" className="w-full">
                  Create New Record
                </Button>
              </div>
            </div>
          </div>
        </>}
    </div>;
};
export default Dashboard;