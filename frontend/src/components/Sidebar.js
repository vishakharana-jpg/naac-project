import React, { useState } from 'react'
import DepartmentCard from '../pages/FaculityPage.js'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    "Finance",
    "Faculity",
    "Journal",
    "Research",
    "HRDC",
    "Library",
    "NCC/NSS/UVA/ICC",
    "Sports",
    "Placement Cell",
    "DIC/IQC",
  ];

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className={`bg-red-200 transition-all duration-300 overflow-hidden ${isOpen ? "w-56 p-4" : "w-0 p-0"}`}>
        <ul className="text-lg space-y-2 whitespace-nowrap">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setSelectedItem(item)}
              className={`cursor-pointer hover:bg-red-300 px-2 py-1 rounded ${selectedItem === item ? "bg-red-400 font-semibold" : ""}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">

        {/* Navbar with Toggle Button */}
        <div className="flex items-center gap-3 p-3 bg-white">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white border border-gray-300 text-black px-3 py-1 rounded text-xl"
          >
            ☰
          </button>
        </div>


      </div>
    </div>
  );
};

export default Sidebar;