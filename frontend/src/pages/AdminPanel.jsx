import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SECTIONS = ["faculty", "sports", "library", "dic"];

export default function AdminPanel() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  // Auth check
  useEffect(() => {
    if (localStorage.getItem("adminAuth") !== "true") {
      navigate("/admin-login");
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const url = section
      ? `http://localhost:8000/api/department/all?section=${section}`
      : `http://localhost:8000/api/department/all`;
    const res = await fetch(url);
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [section]);

  const downloadExcel = () => {
    window.open(
      "http://localhost:8000/api/department/download-excel",
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700"
          >
            Excel Download
          </button>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setSection("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${section === "" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"}`}
          >
            All
          </button>
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border capitalize ${section === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-400">Koi data nahi mila.</p>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Section</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Files</th>
                  <th className="px-4 py-3 text-left">Details</th>
                  <th className="px-4 py-3 text-left">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 capitalize font-semibold text-indigo-600">
                      {row.section}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {row.department || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(row.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      {row.files && row.files.length > 0
                        ? row.files.map((f, fi) => (
                            <a
                              key={fi}
                              href={`http://localhost:8000/uploads/${f.filename}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-500 underline text-xs block"
                            >
                              Metric {f.metricId} file
                            </a>
                          ))
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(row)}
                        className="text-indigo-600 text-xs font-semibold hover:underline"
                      >
                        View Data
                      </button>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelected(row)}
                          className="text-indigo-600 text-xs font-semibold hover:underline"
                        >
                          View Data
                        </button>
                      </td>

                      {/* YE NAYA TD ADD KARO */}
                      <td className="px-4 py-3">
                        <button
                          onClick={async () => {
                            await fetch(
                              `http://localhost:8000/api/department/delete/${row._id}`,
                              {
                                method: "DELETE",
                              },
                            );
                            fetchData();
                          }}
                          className="text-red-500 text-xs font-semibold hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selected && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold capitalize">
                  {selected.section} — {selected.department}
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(selected.formData || {}).map(([key, val]) =>
                  val ? (
                    <div key={key} className="flex gap-3 text-sm">
                      <span className="text-gray-400 min-w-[140px] text-xs">
                        {key}
                      </span>
                      <span className="text-gray-700 font-medium">
                        {typeof val === "boolean"
                          ? val
                            ? "Yes"
                            : "No"
                          : String(val)}
                      </span>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
