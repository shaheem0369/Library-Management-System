import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookIcon, UsersIcon, CalendarIcon, HomeIcon, XIcon } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  closeSidebar
}) => {
  return <>
      {/* Mobile sidebar backdrop */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={closeSidebar}></div>}
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Library System</h1>
          <button onClick={closeSidebar} className="p-1 rounded-md lg:hidden hover:bg-gray-100">
            <XIcon size={24} />
          </button>
        </div>
        <nav className="mt-5 px-4">
          <NavLink to="/" className={({
          isActive
        }) => `flex items-center px-4 py-3 mb-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`} end>
            <HomeIcon className="mr-3" size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/books" className={({
          isActive
        }) => `flex items-center px-4 py-3 mb-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <BookIcon className="mr-3" size={20} />
            <span>Books</span>
          </NavLink>
          <NavLink to="/members" className={({
          isActive
        }) => `flex items-center px-4 py-3 mb-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <UsersIcon className="mr-3" size={20} />
            <span>Members</span>
          </NavLink>
          <NavLink to="/borrow-records" className={({
          isActive
        }) => `flex items-center px-4 py-3 mb-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <CalendarIcon className="mr-3" size={20} />
            <span>Borrow Records</span>
          </NavLink>
        </nav>
      </div>
    </>;
};
export default Sidebar;