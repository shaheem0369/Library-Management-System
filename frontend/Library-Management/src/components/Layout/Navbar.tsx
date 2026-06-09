import React from 'react';
import { MenuIcon } from 'lucide-react';
interface NavbarProps {
  openSidebar: () => void;
}
const Navbar: React.FC<NavbarProps> = ({
  openSidebar
}) => {
  return <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <button onClick={openSidebar} className="p-1 rounded-md lg:hidden hover:bg-gray-100">
          <MenuIcon size={24} />
        </button>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="text-sm font-medium text-gray-700">
              Admin User
            </span>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;