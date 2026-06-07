import React, { useState, useRef } from 'react'

const metrics = [
  {
    id: 9,
    heading: "Curriculum Flexibility",
    subheading: "Curriculum flexibility is facilitated through the following",
    type: "checkbox",
    options: [
      "Choice Based Credit System (CBCS)",
      "Major/Minor option",
      "Multiple Entry and Multiple Exit (MEME)",
      "Credit Transfer to Online Course",
      "Use Bharatiya Bhashas in Learning and Teaching"
    ],
  },
  {
    id: 12,
    heading: "Indian Knowledge System",
    subheading: "The promotion of Indian Knowledge System (IKS) is done through:",
    type: "checkbox",
    options: [
      "Guest lectures on IKS",
      "Workshops/seminars on IKS",
      "Components of IKS in core curriculum",
      "None of the above"
    ],
  },
  {
    id: 41,
    heading: "Grievance Handling",
    subheading: "Better conflict resolution: Mechanisms available. Appropriate weightage for availability of an effective Grievance Redressal Mechanism and resolution of complaints.",
    type: "checkbox",
    options: [
      "Complaints Committee",
      "Anti-Ragging Cell",
      "Ombudsperson",
      "Access to e-Samadhan Portal",
      "Equal Opportunity like SC/ST/OBC/Minority cells, etc."
    ],
  },
  {
    id: 42,
    heading: "e-Governance",
    subheading: "The university has implemented the policy on Digital India and its e-governance activities are reflected through",
    type: "checkbox",
    options: [
      "NAD Implementation",
      "ABC Implementation",
      "Administration including complaint management and paperless office",
      "Finance and Accounts through digital system",
      "Student Admission and Support through e-governance platforms",
      "Digital service in augmenting examination section",
      "Use of Smart e-governance / Institutional MIS/ERP or similar platform",
      "Secured IT System",
      "APPAR Id"
    ],
  },
]

const initialRows = [
  { id: 1, programme: "B.Sc. (PCM)" },
  { id: 2, programme: "B.A. (Hons.)" },
]

const tableFields = ["appReceived", "admittedLSC", "sc", "st", "obc", "ews", "pwdMale", "pwdFemale", "pwdState"]
const tableFieldLabels = {
  appReceived: "Applications Received",
  admittedLSC: "Admitted LSC (Total)",
  sc: "SC", st: "ST", obc: "OBC", ews: "EWS",
  pwdMale: "PwD Male", pwdFemale: "PwD Female", pwdState: "PwD State/Other"
}

// ── Excel Export (no library needed — uses CSV + BOM trick) ──
const exportToExcel = (checked, descriptions, fileNames, tableData) => {
  const rows = []

  // Sheet title
  rows.push(["DIC Self-Assessment Form - NAAC"])
  rows.push(["Exported on", new Date().toLocaleString()])
  rows.push([])

  // Enrollment table
  rows.push(["STUDENT ENROLLMENT"])
  rows.push(["S.No", "Programme Name", ...Object.values(tableFieldLabels)])
  tableData.forEach(row => {
    rows.push([row.id, row.programme, ...tableFields.map(f => row[f] || "0")])
  })
  rows.push([])

  // Metrics
  metrics.forEach(metric => {
    rows.push([`METRIC ${metric.id}: ${metric.heading}`])
    rows.push(["Option", "Selected"])
    metric.options.forEach(opt => {
      const key = `${metric.id}-${opt}`
      rows.push([opt, checked[key] ? "✓ Yes" : "No"])
    })
    rows.push(["Description", descriptions[metric.id] || ""])
    rows.push(["Attached File", fileNames[metric.id] || "None"])
    rows.push([])
  })

  const csv = rows.map(r =>
    r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")
  ).join("\n")

  const BOM = "\uFEFF"
  const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "DIC_Assessment_Form.csv"
  a.click()
  URL.revokeObjectURL(url)
}

const DicForm = ({ onClose }) => {
  const [checked, setChecked]         = useState({})
  const [descriptions, setDescriptions] = useState({})   // { metricId: "text..." }
  const [fileNames, setFileNames]     = useState({})     // { metricId: "filename.pdf" }
  const [tableData, setTableData]     = useState(
    initialRows.map(row => ({
      ...row,
      appReceived: "", admittedLSC: "", sc: "", st: "",
      obc: "", ews: "", pwdMale: "", pwdFemale: "", pwdState: ""
    }))
  )
  const [submitted, setSubmitted] = useState(false)
  const fileRefs = useRef({})

  const toggle = (metricId, option) => {
    const key = `${metricId}-${option}`
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleTableChange = (rowId, field, value) => {
    setTableData(prev =>
      prev.map(row => row.id === rowId ? { ...row, [field]: value } : row)
    )
  }

  const handleDescription = (metricId, value) => {
    setDescriptions(prev => ({ ...prev, [metricId]: value }))
  }

  const handleFile = (metricId, e) => {
    const file = e.target.files[0]
    if (file) setFileNames(prev => ({ ...prev, [metricId]: file.name }))
  }
const handleSubmit = async () => {
    try {
      // Metrics ka data taiyaar karo
      const metricsData = metrics.map((metric) => ({
        metricId: metric.id,
        heading: metric.heading,
        checked: metric.options.filter(
          (opt) => checked[`${metric.id}-${opt}`]
        ),
        description: descriptions[metric.id] || "",
        fileName: fileNames[metric.id] || "",
      }))

      // FormData banao
      const fd = new FormData()
      fd.append(
        "formData",
        JSON.stringify({
          enrollmentData: tableData,
          metrics: metricsData,
        })
      )

      // Backend ko bhejo
      const res = await fetch("http://localhost:8000/api/assessment/submit", {
        method: "POST",
        body: fd,
      })

      const data = await res.json()

      if (data.success) {
        exportToExcel(checked, descriptions, fileNames, tableData) // CSV bhi download ho
        setSubmitted(true)
        alert("✅ Form submit ho gaya! Atlas mein save ho gaya.")
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        alert("❌ Error: " + data.message)
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("❌ Server se connect nahi ho pa raha!")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-100">

        {/* ── Header ── */}
        <div className="sticky top-0 bg-white z-10 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-0.5">NAAC Assessment</p>
            <h2 className="text-xl font-bold text-slate-800">DIC Self-Assessment Form</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors text-2xl font-light leading-none"
            aria-label="Close"
          >×</button>
        </div>

        {/* ── Form Body ── */}
        <div className="px-6 py-5 space-y-6">

          {/* 1. Student Enrollment Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-start gap-3">
              <span className="mt-0.5 min-w-[28px] h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">★</span>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Student Enrollment (DSB Campus / Bhimtal Campus)</h3>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Total number of students admitted in the first year of various programmes, year-wise, during the last two years.
                </p>
              </div>
            </div>
            <div className="overflow-x-auto px-3 py-4">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th rowSpan={2} className="border border-slate-200 bg-slate-50 px-2 py-2 text-slate-600 font-medium text-center w-8">S.No</th>
                    <th rowSpan={2} className="border border-slate-200 bg-slate-50 px-2 py-2 text-slate-600 font-medium text-left min-w-[130px]">Programme Name</th>
                    <th rowSpan={2} className="border border-slate-200 bg-slate-50 px-2 py-2 text-slate-600 font-medium text-center">Applications Received</th>
                    <th rowSpan={2} className="border border-slate-200 bg-slate-50 px-2 py-2 text-slate-600 font-medium text-center min-w-[80px]">Admitted LSC (Total)</th>
                    <th colSpan={4} className="border border-slate-200 bg-blue-50 px-2 py-2 text-blue-700 font-medium text-center">Category</th>
                    <th colSpan={3} className="border border-slate-200 bg-indigo-50 px-2 py-2 text-indigo-700 font-medium text-center">PwD</th>
                  </tr>
                  <tr>
                    {["SC","ST","OBC","EWS"].map(h => (
                      <th key={h} className="border border-slate-200 bg-blue-50 px-2 py-1.5 text-blue-600 font-medium text-center">{h}</th>
                    ))}
                    {["Male","Female","State / Other State"].map(h => (
                      <th key={h} className="border border-slate-200 bg-indigo-50 px-2 py-1.5 text-indigo-600 font-medium text-center">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="border border-slate-200 px-2 py-2 text-center text-slate-400">{row.id}</td>
                      <td className="border border-slate-200 px-2 py-2 text-slate-700 font-medium">{row.programme}</td>
                      {tableFields.map((field) => (
                        <td key={field} className="border border-slate-200 px-1 py-1">
                          <input
                            type="number" min="0"
                            value={row[field]}
                            onChange={(e) => handleTableChange(row.id, field, e.target.value)}
                            className="w-full min-w-[44px] text-center text-xs px-1 py-1.5 rounded border border-transparent focus:border-blue-300 focus:bg-blue-50 focus:outline-none bg-transparent"
                            placeholder="0"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Metrics with Description + File Upload */}
          {metrics.map((metric, idx) => (
            <div key={metric.id} className="rounded-xl border border-slate-200 overflow-hidden">

              {/* Metric Header */}
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-start gap-3">
                <span className="mt-0.5 min-w-[28px] h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">{metric.heading}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{metric.subheading}</p>
                </div>
              </div>

              <div className="px-5 py-4 space-y-4">

                {/* Checkboxes */}
                <div className="space-y-2.5">
                  {metric.options.map((option) => {
                    const key = `${metric.id}-${option}`
                    const isChecked = !!checked[key]
                    return (
                      <label
                        key={option}
                        className={`flex items-start gap-3 cursor-pointer rounded-lg px-3 py-2.5 transition-colors ${
                          isChecked ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(metric.id, option)}
                          className="mt-0.5 accent-blue-600 w-4 h-4 shrink-0"
                        />
                        <span className={`text-sm leading-snug ${isChecked ? 'text-blue-800 font-medium' : 'text-slate-600'}`}>
                          {option}
                        </span>
                      </label>
                    )
                  })}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Description Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    📝 Description of the Metric
                  </label>
                  <textarea
                    rows={3}
                    value={descriptions[metric.id] || ""}
                    onChange={(e) => handleDescription(metric.id, e.target.value)}
                    placeholder="Write a brief description or remarks for this metric..."
                    className="w-full text-sm text-slate-700 px-3 py-2.5 rounded-lg border border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-50 focus:outline-none resize-none placeholder:text-slate-300"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    📎 Supporting Document / Proof
                  </label>
                  <div
                    onClick={() => fileRefs.current[metric.id]?.click()}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
                      fileNames[metric.id]
                        ? 'border-green-300 bg-green-50'
                        : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-lg">{fileNames[metric.id] ? "✅" : "📂"}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium truncate ${fileNames[metric.id] ? 'text-green-700' : 'text-slate-500'}`}>
                        {fileNames[metric.id] || "Click to attach file"}
                      </p>
                      {!fileNames[metric.id] && (
                        <p className="text-xs text-slate-400">PDF, JPG, PNG, DOCX supported</p>
                      )}
                    </div>
                    {fileNames[metric.id] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setFileNames(prev => { const n = {...prev}; delete n[metric.id]; return n })
                          if (fileRefs.current[metric.id]) fileRefs.current[metric.id].value = ""
                        }}
                        className="text-xs text-red-400 hover:text-red-600 font-medium shrink-0"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={el => fileRefs.current[metric.id] = el}
                    onChange={(e) => handleFile(metric.id, e)}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {/* Export only button */}
            <button
              onClick={() => exportToExcel(checked, descriptions, fileNames, tableData)}
              className="px-4 py-2 text-sm font-medium text-green-700 border border-green-300 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>⬇</span> Export Excel
            </button>

            {/* Submit + Export */}
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              {submitted ? '✓ Submitted & Exported!' : 'Submit Form'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DicForm;