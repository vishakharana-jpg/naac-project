import { useState } from "react";
import { useNavigate } from "react-router-dom";

const faculties = [
  {
    id: "arts",
    name: "Faculty of Arts",
    icon: "🎨",
    color: { active: "#7C3AED", light: "#EDE9FE", border: "#DDD6FE", text: "#5B21B6" },
    departments: 13,
    tagline: "Economics, English, Hindi, History, Music & more",
  },
  {
    id: "science",
    name: "Faculty of Science",
    icon: "🔬",
    color: { active: "#0891B2", light: "#CFFAFE", border: "#A5F3FC", text: "#0E7490" },
    departments: 11,
    tagline:"Bio-Technology, Botany, Chemistry, Computer Science & more",
  },
  {
    id: "commerce",
    name: "Faculty of Commerce",
    icon: "📊",
    color: { active: "#059669", light: "#D1FAE5", border: "#A7F3D0", text: "#065F46" },
    departments: 0,
    tagline: "Coming soon...",
  },
  {
    id: "management",
    name: "Faculty of Management",
    icon: "💼",
    color: { active: "#D97706", light: "#FEF3C7", border: "#FDE68A", text: "#92400E" },
    departments:3,
    tagline: "Management Studies, IPSDR, Tourism & Hospitality",
  },
  {
    id: "education",
    name: "Faculty of Education",
    icon: "📚",
    color: { active: "#DC2626", light: "#FEE2E2", border: "#FECACA", text: "#991B1B" },
    departments: 0,
    tagline: "Coming soon...",
  },
  {
    id: "technology",
    name: "Faculty of Technology",
    icon: "💻",
    color: { active: "#4F46E5", light: "#E0E7FF", border: "#C7D2FE", text: "#3730A3" },
    departments: 1,
    tagline: "Pharmaceutical Science...",
  },
  {
    id: "visualart",
    name: "Faculty of Visual Art",
    icon: "🖼️",
    color: { active: "#DB2777", light: "#FCE7F3", border: "#FBCFE8", text: "#9D174D" },
    departments: 0,
    tagline: "Coming soon...",
  },
  {
    id: "law",
    name: "Faculty of Law",
    icon: "⚖️",
    color: { active: "#374151", light: "#F3F4F6", border: "#E5E7EB", text: "#1F2937" },
    departments: 0,
    tagline: "Coming soon...",
  },
  {
    id: "agriculture",
    name: "Faculty of Agriculture",
    icon: "🌾",
    color: { active: "#16A34A", light: "#DCFCE7", border: "#BBF7D0", text: "#15803D" },
    departments: 0,
    tagline: "Coming soon...",
  },
  {
    id: "biomedical",
    name: "Faculty of Biomedical Science",
    icon: "🧬",
    color: { active: "#0284C7", light: "#E0F2FE", border: "#BAE6FD", text: "#075985" },
    departments: 3,
    tagline: "M. sc in Biomedical & Forensic Science..",
  },
];

function FacultyCard({ faculty, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(faculty)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hovered ? faculty.color.active : faculty.color.border}`,
        borderRadius: 20,
        padding: "1.5rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: hovered ? `0 12px 32px rgba(0,0,0,0.12)` : "0 2px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Icon + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: faculty.color.light,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, flexShrink: 0,
        }}>
          {faculty.icon}
        </div>
        <div>
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#111827" }}>
            {faculty.name}
          </div>
          <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
            {faculty.tagline}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: faculty.color.border }} />

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontSize: 12, fontWeight: 500,
          background: faculty.color.light,
          color: faculty.color.text,
          padding: "3px 10px", borderRadius: 20,
        }}>
          {faculty.departments > 0 ? `${faculty.departments} Departments` : "Coming Soon"}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: faculty.color.active }}>
          {faculty.departments > 0 ? "Open →" : "—"}
        </span>
      </div>
    </div>
  );
}

export default function FacultyPage() {
  const navigate = useNavigate();

  const handleClick = (faculty) => {
    if (faculty.id === "arts") {
      navigate("/faculty/arts");
    }
      if (faculty.id === "science") navigate("/faculty/science");
      if (faculty.id==="management") navigate("/faculty/management");
      if (faculty.id==="technology") navigate("/faculty/technology");
       if (faculty.id==="biomedical") navigate("/faculty/biomedical");
    // Baaki faculties bad mein add hongi
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      
      {/* Header */}
      <div style={{ background: "#1E1B4B", color: "#fff", padding: "1.5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#A5B4FC", textTransform: "uppercase", marginBottom: 4 }}>
            NAAC Accredited Institution
          </div>
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 24, fontWeight: 700 }}>
            Kumaun University
          </div>
          <div style={{ fontSize: 13, color: "#C7D2FE", marginTop: 2 }}>
            Select a Faculty to view its Departments
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#111827" }}>
            All Faculties
          </div>
          <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>
            Click on a faculty card to view its departments
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
          {faculties.map(faculty => (
            <FacultyCard key={faculty.id} faculty={faculty} onClick={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
}