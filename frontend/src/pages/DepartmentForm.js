import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const metrics = [



  {
    id: 12, // ← heading number (jo form mein dikhega)
    heading: "Indian Knowledge System", // ← badi heading (bold)
    subheading:
      "The promotion of Indian Knowledge System (IKS) is done through:",
    //            ↑ chhoti line heading ke neeche
    type: "checkbox", // ← checkbox = tick options wala
    options: [
      "Guest lectures on IKS",
      "Workshops/seminars on IKS",
      "Components of IKS in core curriculum",
      "None of the above",
    ],
  },
  
  {
    id: 18,
    heading: "IT infrastructure",
    subheading: "infrastructure facilities available in the university",
    type: "subfields",
    fields: [
      {
        label:
          "a. Number of desktops/laptops (Enter the latest completed academic year value)",
        key: "desktops_laptops",
      },
      {
        label:
          "b. Total Internet bandwidth in (Mbps) (Enter the latest completed academic year value)",
        key: "internet_bandwidth",
      },
    ],
  },
  {
    id: 28,
    heading: "Community Engagement Activities",
    subheading: "University has established community-related clubs:",
    type: "subfields",
    fields: [
      {
        label: "a. Number of Social/Community Clubs ",
        key: "social_clubs",
      },
      {
        label:
          "b. Number of community activities conducted by NSS/NCC and/or others in collaboration with industry/NGOs/ professional bodies (3 Years)",
        key: "community_activities",
      },
      {
        label: "c. Number of Students Participated in community activities ",
        key: "students_participated",
      },
    ],
  },
  {
    id: 37,
    heading: "National Level Academic/Research Colleboration",
    subheading: "University establishedactive national colleboration support",

    type: "checkbox",
    options: [
      "Student Exchange",
      "Faculty Exchange",
      "Joint Research",
      "Resource Sharing",
    ],
  },
  {
    id: 38,
    heading: "Industry Colleboration",
    subheading:
      "University promotes industry / Community-academic colleboration activities through",

    type: "checkbox",
    options: [
      "Lecture from industry expert",
      "Colleboration workshop/seminar/conference/webinars with industry and other",
      "Field/industry visit",
      "joint/sponsored project",
    ],
  },
  {
    id:46,
    heading:"Total number of sanctioned seats in the first year of various program year wise, during the last year",
    type: "number",
    fields: [
      { label: "2025-26", key: "y1" },
      { label: "2024-245", key: "y2" },
    ],
  },
  {
    id: 50,
    heading: "Student Awards/Prizes/Recognitions",
    subheading: "Details of student awards and recognitions:",
    type: "subfields",
    fields: [
      {
        label:
          "i. Total Number of students receiving awards for Academic excellence at University Level/State level/National Level (consolidated of 2024-25, 2023-24, 2022-23)",
        key: "academic_awards",
      },
      {
        label:
          "ii. Total Number of students receiving awards for extended curricular activities at University Level/State level/National Level (consolidated of 2024-25, 2023-24, 2022-23)",
        key: "curricular_awards",
      },
      {
        label:
          "iii. Total Number of alumni who received national level recognition. (SS Bhatnagar award, Padma award, Jyanpeeth award, cleared all stages of UPSC/state Public Services, got into a leadership position at national/state level)",
        key: "alumni_recognition",
      },
    ],
  },
  {
    id: 55,
    heading: "Research Fellowships",
    subheading:
      "Number of JRFs and SRFs among the enrolled PhD scholars in the University (consolidated of 2025-26 2024-25 )",
    type: "subfields",
    fields: [
      {
        label:
          "Number of JRFs and SRFs among the enrolled PhD scholars in the University",
        key: "jrf_srf",
      },
      {
        label:
          "Total Number of PhD scholars enrolled in the University (consolidated of 2025-26 2024-25)",
        key: "phd_scholars",
      },
    ],
  },

  {
    id: 56,
    heading: "Open Educational Resources (OER)",
    subheading:
      "Number of Open Educational Resources (OER) contributed by the University.",
    type: "number",
    fields: [
      { label: "2025-26", key: "y1" },
      { label: "2024-245", key: "y2" },
    ],
  },

  {
    id: 51,
    heading: "Research Publications",
    subheading: "Details of research publications by University teachers:",
    type: "subfields",
    fields: [
      {
        label:
          "i. Total Number of publications by the University's Teachers in peer-reviewed journals listed in Scopus/WoS, journals identified by the university as per UGC guidelines and in indexed conference proceedings. (consolidated of 2024-25, 2023-24, 2022-23)",
        key: "peer_reviewed",
      },
      {
        label:
          "ii. Total Number of books published by the University's Teachers including Op-Ed articles, Research Reports / Policy documents / book chapters and/or translated in Bhartiya Bhashas. (consolidated of 2024-25, 2023-24, 2022-23)",
        key: "books_published",
      },
      {
        label: "iii. Research Quality — a) h-indices Scopus",
        key: "h_index_scopus",
      },
      {
        label: "iii. b) h-indices WoS",
        key: "h_index_wos",
      },
      {
        label: "iii. c) Citation indices-WoS",
        key: "h_index_wos",
      },
    ],
  },

  {
    id: 57,
    heading: "Community Awareness Outcomes",
    subheading:
      "The university conducts following community sustainability Awareness/Campaigns",

    type: "checkbox",
    options: [
      "Improve literacy levels",
      "School reach-out programmers",
      "Improved gender ratio through mission like beti bachao beti padhao, Sukanya Samriddhi Yojana, Single girl child Plicy",
      "Improved GER (spreading awareness through online learning plateform like-SWAYAM, DTH, etc)",
      "Clean village -Swachh Bharat Mission-Grameen(SBM-G)",
      "Constitutional awareness-Electrol literacy",
      "Empowered women communities",
      "Energy literacy awareness",
      "Health Awareness-Disease-free village",
      "Awareness on finiteness of resources",
      "Eco-friendly communities/villages",
    ],
  },
  {
    id: 58,
    heading: "Active community outcomes",
    type: "subfields",
    fields: [
      {
        label: "Medical camps",
        key: "medical_camps",
      },
      {
        label: "Blood donation camps",
        key: "blood_donation",
      },
      {
        label: "Promoting village sports",
        key: "Education rural student related to health and hygiene",
      },
    ],
  },
  {
    id: 60,
    heading: "Water conservation and waste managements",
    subheading: "Rain water harvesting and water recycling",
    type: "checkbox",
    options: [
      "Biogas plant",
      "Paper waste recycling ",
      "Segregation of solid waste at source",
      "water water recycling and management",
      "Bio waster managements",
      "e-waste management",
      "Bio-Medical Waste managements",
    ],
  },
];

// ─── SINGLE METRIC CARD ───────────────────────────────────────────
function MetricCard({ metric, formData, onChange, onFileChange, fileNames }) {
  const [open, setOpen] = useState(false);
  const fileRef = useRef();

  const isComplete = () => {
    if (metric.type === "number")
      return metric.fields.every((f) => formData[`${metric.id}_${f.key}`]);
    if (metric.type === "checkbox")
      return metric.options.some((o) => formData[`${metric.id}_${o}`]);
    return false;
  };

  const complete = isComplete();

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden
      ${open ? "border-indigo-300 shadow-md" : "border-gray-200 shadow-sm hover:border-indigo-200 hover:shadow"}`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white text-left gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
            ${complete ? "bg-green-100 text-green-700" : "bg-indigo-50 text-indigo-600"}`}
          >
            {complete ? "✓" : metric.id}
          </span>
          <div className="min-w-0">
            <div className="font-semibold text-gray-800 text-sm">
              {metric.heading}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              {metric.subheading}
            </div>
          </div>
        </div>
        <span
          className={`shrink-0 text-gray-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {/* Expanded Body */}
      {open && (
        <div className="px-5 pb-5 pt-4 bg-gray-50 border-t border-gray-100 space-y-4">
          {/* Number inputs */}
          {metric.type === "number" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {metric.fields.map((f) => (
                <div key={f.key}>
                  <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    {f.label}
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData[`${metric.id}_${f.key}`] || ""}
                    onChange={(e) =>
                      onChange(`${metric.id}_${f.key}`, e.target.value)
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Checkboxes */}
          {metric.type === "checkbox" && (
            <div className="space-y-2">
              {metric.options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={!!formData[`${metric.id}_${opt}`]}
                    onChange={(e) =>
                      onChange(`${metric.id}_${opt}`, e.target.checked)
                    }
                    className="w-4 h-4 rounded accent-indigo-600"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-indigo-700 transition-colors">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* ── SIRF EK Description Box (relevance hata diya) ── */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
              Description of the Metric
            </label>
            <textarea
              rows={3}
              placeholder="Description of the metric..."
              value={formData[`${metric.id}_description`] || ""}
              onChange={(e) =>
                onChange(`${metric.id}_description`, e.target.value)
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
              Supporting Document / Proof
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => fileRef.current.click()}
                className="flex items-center gap-2 bg-white border border-dashed border-indigo-300 text-indigo-600 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                📎 Attach File
              </button>
              <span className="text-xs text-gray-400 truncate max-w-[200px]">
                {fileNames[metric.id] || "No file chosen"}
              </span>
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.png,.xlsx"
                onChange={(e) => onFileChange(metric.id, e.target.files[0])}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function DepartmentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [fileNames, setFileNames] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

 const handleFileChange = (metricId, file) => {
    if (!file) return;
    setFileNames((prev) => ({ ...prev, [metricId]: file })); 
  };
  const handleSubmit = async () => {
    for (const metric of metrics) {
      const formDataToSend = new FormData();
      formDataToSend.append("section", String(metric.id));
      formDataToSend.append("heading", metric.heading);
      formDataToSend.append("description", formData[`${metric.id}_description`] || "");
      
      const file = fileNames[metric.id];
      if (file) formDataToSend.append("pdf", file);

      await fetch("http://localhost:8000/api/department/submit", {
        method: "POST",
        body: formDataToSend,
      });
    }
    setSubmitted(true);
  };

  const exportToExcel = () => {
    const rows = [
      [
        "Metric No.",
        "Heading",
        "Field / Option",
        "Value",
        "Description",
        "Proof File",
      ],
    ];
    metrics.forEach((m) => {
      if (m.type === "number") {
        m.fields.forEach((f) =>
          rows.push([
            m.id,
            m.heading,
            f.label,
            formData[`${m.id}_${f.key}`] || "",
            formData[`${m.id}_description`] || "",
            fileNames[m.id] || "",
          ]),
        );
      } else {
        m.options.forEach((opt) =>
          rows.push([
            m.id,
            m.heading,
            opt,
            formData[`${m.id}_${opt}`] ? "Yes" : "No",
            formData[`${m.id}_description`] || "",
            fileNames[m.id] || "",
          ]),
        );
      }
    });
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NAAC_Survey_Data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
const completedCount = metrics.filter((m) => {
  if (m.type === "number") return m.fields.some((f) => formData[`${m.id}_${f.key}`]);
  if (m.type === "checkbox") return m.options.some((o) => formData[`${m.id}_${o}`]);
  if (m.type === "subfields") return m.fields.some((f) => formData[`${m.id}_${f.key}`]);
  return false;
}).length;
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Form Submitted!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            NAAC survey form successfully save ho gaya.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={exportToExcel}
              className="bg-green-600 text-white font-semibold px-5 py-2 rounded-xl text-sm hover:bg-green-700 transition-colors cursor-pointer"
            >
              📊 Excel Download
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Sticky Header */}
      <div className="bg-[#1E1B4B] text-white px-6 py-4 sticky top-0 z-30 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/10 border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
            >
              ← Back
            </button>
            <div>
              <div className="text-[10px] tracking-widest text-indigo-300 uppercase">
                NAAC Survey
              </div>
              <div
                className="text-base font-bold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Department Data Entry
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-indigo-300">
                {completedCount}/{metrics.length} completed
              </span>
              <div className="w-28 h-1.5 bg-white/20 rounded-full mt-1">
                <div
                  className="h-1.5 bg-green-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${metrics.length ? (completedCount / metrics.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <button
              onClick={exportToExcel}
              className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              📊 Excel
            </button>
            <button
              onClick={() => setSubmitted(true)}
              className="bg-white text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
            >
              Submit →
            </button>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-3">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-indigo-700">
            Har metric ko click karke expand karein, data fill karein aur proof
            attach karein.
          </p>
          <span className="text-xs font-bold text-indigo-600 bg-white px-3 py-1 rounded-full border border-indigo-200">
            {metrics.length} Metrics
          </span>
        </div>

        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            formData={formData}
            onChange={handleChange}
            onFileChange={handleFileChange}
            fileNames={fileNames}
          />
        ))}

        <div className="flex gap-3 pt-4 pb-8">
          <button
            onClick={exportToExcel}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            
            📊 Export to Excel / CSV
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#1E1B4B] hover:bg-indigo-900 text-white font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            ✅ Submit Form
          </button>
        </div>
      </div>
    </div>
  );
}
