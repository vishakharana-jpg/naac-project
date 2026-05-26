import React, { useState, useRef } from 'react'
import * as XLSX from 'xlsx'

const Metrics = [
  {
    id: 2,
    heading: "Number of students on roll year-wise during the last two years",
    type: "yearwise",
    values: { "2025-26": "5118", "2024-25": "5850" },
  },
  {
    id: 13,
    heading: "Number of full-time teachers with Ph.D. serving the university",
    type: "yearwise",
    values: { "2026-25": "261", "2025-24": "259" },
  },
  {
    id: 40,
    heading: "Employee Welfare",
    subheading: "The university has effective welfare measures for software which include the following",
    type: "checkbox",
    options: [
      "Subsidized interest/interest fee loans for employees",
      "Medical insurance benefits",
      "Subsidized fees for their wards"
    ]
  }
]

const GenralForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [metrics, setMetrics] = useState(
    Metrics.map((m) => ({
      ...m,
      description: "",
      pdfFile: null,
      selectedOptions: [],
    }))
  )
  const fileRefs = useRef({})

  const updateValue = (id, year, val) => {
    setMetrics((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, values: { ...(m.values || {}), [year]: val } } : m
      )
    )
  }

  const updateDescription = (id, val) => {
    setMetrics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, description: val } : m))
    )
  }

  const toggleOption = (id, option) => {
    setMetrics((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m
        const already = m.selectedOptions.includes(option)
        return {
          ...m,
          selectedOptions: already
            ? m.selectedOptions.filter((o) => o !== option)
            : [...m.selectedOptions, option],
        }
      })
    )
  }

  const handlePDF = (id, file) => {
    setMetrics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, pdfFile: file } : m))
    )
  }

  const removePDF = (id) => {
    setMetrics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, pdfFile: null } : m))
    )
    if (fileRefs.current[id]) fileRefs.current[id].value = ""
  }

  const exportExcel = () => {
    const rows = [
      ["Metric", "Year 1", "Value 1", "Year 2", "Value 2", "Selected Options", "Description", "PDF Attached"],
      ...metrics.map((m) => {
        const yearKeys = m.values ? Object.keys(m.values) : []
        return [
          m.heading,
          yearKeys[0] || "",
          m.values?.[yearKeys[0]] || "",
          yearKeys[1] || "",
          m.values?.[yearKeys[1]] || "",
          m.selectedOptions?.join(", ") || "",
          m.description,
          m.pdfFile ? m.pdfFile.name : "No",
        ]
      }),
    ]
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(rows)
    ws["!cols"] = [
      { wch: 40 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 40 }, { wch: 40 }, { wch: 20 },
    ]
    XLSX.utils.book_append_sheet(wb, ws, "Metrics")
    XLSX.writeFile(wb, "school_metrics.xlsx")
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    const metricsData = metrics.map((m) => ({
      metricId: m.id,
      heading: m.heading,
      type: m.type,
      values: m.values || {},
      selectedOptions: m.selectedOptions || [],
      description: m.description,
      pdfFile: null,
    }))
    formData.append('metrics', JSON.stringify(metricsData))
    metrics.forEach((m) => {
      if (m.pdfFile) {
        formData.append(String(m.id), m.pdfFile)
      }
    })
    const res = await fetch('http://localhost:8000/api/general-form', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    console.log(data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        gap: "1rem",
      }}>
        <div style={{ fontSize: "60px" }}>✅</div>
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#16a34a" }}>
          Form Submitted Successfully!
        </h2>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Aapka data save ho gaya hai.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            padding: "10px 20px",
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          🔄 Fill Again
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "1rem" }}>

      {metrics.map((metric, idx) => (
        <div
          key={idx}
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.25rem",
          }}
        >
          <h3 style={{ fontSize: "15px", fontWeight: 500, marginBottom: "4px" }}>
            {idx + 1}. {metric.heading}
          </h3>

          {metric.subheading && (
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "1rem" }}>
              {metric.subheading}
            </p>
          )}

          {metric.type === "yearwise" && metric.values && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px", marginBottom: "1rem" }}>
              {Object.keys(metric.values).map((year) => (
                <div key={year}>
                  <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px" }}>{year}</div>
                  <input
                    type="text"
                    value={metric.values?.[year] ?? ""}
                    onChange={(e) => updateValue(metric.id, year, e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {metric.type === "checkbox" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1rem" }}>
              {metric.options.map((option, i) => (
                <label key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={metric.selectedOptions.includes(option)}
                    onChange={() => toggleOption(metric.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          <div
            style={{
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Please provide feedback, if any on the above metric:
            </div>

            <textarea
              rows={3}
              placeholder="Description of the metric"
              value={metric.description}
              onChange={(e) => updateDescription(metric.id, e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "13px",
                resize: "vertical",
                background: "#fff",
              }}
            />

            <div style={{ fontSize: "11px", color: "#6b7280" }}>Attach proof (PDF)</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#374151",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                📎 Attach PDF
                <input
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                  ref={(el) => (fileRefs.current[metric.id] = el)}
                  onChange={(e) => handlePDF(metric.id, e.target.files[0] || null)}
                />
              </label>

              {metric.pdfFile && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 10px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#374151",
                    background: "#fff",
                  }}
                >
                  📄 {metric.pdfFile.name}
                  <span
                    onClick={() => removePDF(metric.id)}
                    style={{ cursor: "pointer", color: "#9ca3af", fontWeight: 500 }}
                  >
                    ×
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={exportExcel}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 20px",
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          📊 Open in Excel
        </button>

        <button
          onClick={handleSubmit}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 20px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          ✅ Submit Form
        </button>
      </div>

    </div>
  )
}

export default GenralForm