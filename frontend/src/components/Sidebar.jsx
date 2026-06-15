import React, { useState } from "react";
import DepartmentCard from "../pages/FaculityPage.jsx";
import FacultyPage from "../pages/FaculityPage.jsx";
import DicPage from "../pages/DicPage.jsx";
import GenralPage from "../pages/GenralPage.jsx";
import Banner from "../assets/Images/Banner.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    "Finance",
    "Faculty",
    "Genral section",
    "Research",
    "HRDC",
    "Library",
    "NCC/NSS/UVA/ICC",
    "Sports",
    "Placement Cell",
    "DIC/IQAC",
    "MMTTC",
    "DEVELOPMENT AND PLANNING",
  ];

  return (
    <div className="flex h-full w-full overflow-x-hidden bg-blue-950">
      {/* Sidebar */}
      <div
        className={`bg-red-100 transition-all duration-300 overflow-hidden shrink-0 ${isOpen ? "w-56 p-4" : "w-0 p-0"}`}
      >
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
      <div className="flex flex-col flex-1 min-w-0">
        {/* Navbar with Toggle Button */}
        <div className="flex items-center gap-3 p-2 bg-blue-950 relative z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-950 border border-gray-300 text-white px-3 py-1 rounded text-xl"
          >
            ☰
          </button>
        </div>
        {/* Body Content */}

        <div className="flex-1 w-full min-w-0 overflow-x-hidden">
          {/* Default image jab kuch select na ho */}
       {!selectedItem && (
  <div className="block">
    <div className="flex justify-center ">
      <img 
        src={Banner} 
        alt="banner" 
        style={{ width: '1200px', height: '500px' }}
        className="object-cover"
      />
    </div>
   
  </div>
)}

          {selectedItem === "Faculty" && <FacultyPage />}
          {selectedItem === "DIC/IQAC" && <DicPage />}
          {selectedItem === "Genral section" && <GenralPage />}
        </div>
        
      </div>
      
    </div>
  );
};

export default Sidebar;
