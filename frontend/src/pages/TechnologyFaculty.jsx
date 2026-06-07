import { useState } from "react";
import { useNavigate } from "react-router-dom";

const departments = [
   {
    id: "tourism",
    name: "Tourism & Hospitality",
    icon: "✈️",
    color: {
      active: "border-cyan-500",
      light: "bg-cyan-50",
      border: "border-cyan-200",
      text: "text-cyan-800",
      badge: "bg-cyan-50 text-cyan-600",
    },
  },
];

function DeptCard({ dept, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(dept)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-2xl border-[1.5px] p-5 cursor-pointer flex items-center justify-between gap-3 transition-all duration-200
        ${hovered ? `${dept.color.active} shadow-lg -translate-y-1` : `${dept.color.border} shadow-sm`}
      `}
    >
      {/* Left: Icon + Name */}
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl ${dept.color.light} flex items-center justify-center text-xl shrink-0`}>
          {dept.icon}
        </div>
        <div>
          <div className="font-bold text-gray-900 text-[15px] leading-snug" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
            {dept.name}
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">Click to view department</div>
        </div>
      </div>

      {/* Right: Badge */}
      <div className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${dept.color.badge}`}>
        Open →
      </div>
    </div>
  );
}

export default function ManagementFaculty() {
  const navigate = useNavigate();

  const handleDeptClick = (dept) => {
    navigate(`/faculty/management/${dept.id}/form`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── HEADER ── */}
      <div className="bg-[#1E1B4B] text-white px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 border border-white/20 text-white text-xs px-4 py-1.5 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
          >
            ← Back
          </button>
          <div>
            <div className="text-[11px] tracking-widest text-indigo-300 uppercase">Kumaun University</div>
            <div className="text-xl font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              Faculty of Management
            </div>
            <div className="text-xs text-indigo-200 mt-0.5">Select a department to proceed</div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Section Title */}
        <div className="mb-6">
          <div className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
            Departments — Faculty of Management
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Click on a department to login and access the data entry portal
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {departments.map((dept) => (
            <DeptCard key={dept.id} dept={dept} onClick={handleDeptClick} />
          ))}
        </div>

      </div>
    </div>
  );
}