import { useState } from "react";
import { useNavigate } from "react-router-dom";

const departments = [
  {
    id: "forensic-science",
    name: "M.Sc in Forensic Science",
    icon: "🔍",
    color: {
      active: "border-violet-500",
      light: "bg-violet-50",
      border: "border-violet-200",
      badge: "bg-violet-50 text-violet-600",
    },
  },
  {
    id: "biomedical-science",
    name: "M.Sc in Biomedical Science",
    icon: "🧬",
    color: {
      active: "border-teal-500",
      light: "bg-teal-50",
      border: "border-teal-200",
      badge: "bg-teal-50 text-teal-600",
    },
  },
  {
    id: "medicinal-plants-nano",
    name: "Centre for Excellence in Medicinal Plants & Nanotechnology",
    icon: "🌿",
    color: {
      active: "border-green-500",
      light: "bg-green-50",
      border: "border-green-200",
      badge: "bg-green-50 text-green-600",
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

export default function BiomedicalFaculty() {
  const navigate = useNavigate();

  const handleDeptClick = (dept) => {
    navigate(`/faculty/science/biomedical/${dept.id}`/form);
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
            <div className="text-[11px] tracking-widest text-indigo-300 uppercase">Faculty of Science</div>
            <div className="text-xl font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              Biomedical & Life Sciences
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
            Departments — Biomedical & Life Sciences
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Click on a department to view details
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