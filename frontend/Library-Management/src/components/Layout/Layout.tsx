import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar openSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>;
};
export default Layout;