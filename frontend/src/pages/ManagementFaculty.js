import { useState } from "react";
import { useNavigate } from "react-router-dom";

const departments = [
  { id: "mgmtstudies", name: "Department of Management Studies",                      icon: "💼", color: { active: "#D97706", light: "#FEF3C7", border: "#FDE68A", text: "#92400E" } },
  { id: "ipsdr",       name: "Institute of Professional Studies & Development Research (IPSDR)", icon: "🏛️", color: { active: "#4F46E5", light: "#E0E7FF", border: "#C7D2FE", text: "#3730A3" } },
  { id: "tourism",     name: "Tourism & Hospitality",                                 icon: "✈️", color: { active: "#0891B2", light: "#CFFAFE", border: "#A5F3FC", text: "#0E7490" } },
];

function DeptCard({ dept, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(dept)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hovered ? dept.color.active : dept.color.border}`,
        borderRadius: 18,
        padding: "1.25rem 1.5rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "0 10px 28px rgba(0,0,0,0.10)" : "0 2px 6px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: dept.color.light,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
        }}>
          {dept.icon}
        </div>
        <div>
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#111827" }}>
            {dept.name}
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
            Click to view department
          </div>
        </div>
      </div>

      <div style={{
        fontSize: 13, fontWeight: 600,
        color: dept.color.active,
        background: dept.color.light,
        padding: "4px 12px", borderRadius: 20,
        whiteSpace: "nowrap",
      }}>
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
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#1E1B4B", color: "#fff", padding: "1.25rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer" }}
          >
            ← Back
          </button>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#A5B4FC", textTransform: "uppercase" }}>
              Kumaun University
            </div>
            <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 22, fontWeight: 700 }}>
              Faculty of Management
            </div>
            <div style={{ fontSize: 12, color: "#C7D2FE", marginTop: 2 }}>
              Select a department to proceed
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#111827" }}>
            Departments — Faculty of Management
          </div>
          <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>
            Click on a department to login and access the data entry portal
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
          {departments.map(dept => (
            <DeptCard key={dept.id} dept={dept} onClick={handleDeptClick} />
          ))}
        </div>
      </div>
    </div>
  );
}