import React, { useState } from 'react'
import DicForm from './DicForm'

const dicCards = [
  {
    id: 1,
    title: "DIC Self-Assessment",
    description: "Fill the NAAC self-assessment form covering Curriculum Flexibility, Grievance Handling, and e-Governance metrics.",
    icon: "📋",
    badge: "4 Sections",
    color: "blue",
  },
]

const colorMap = {
  blue: {
    badge: "bg-blue-100 text-blue-700",
    icon: "bg-blue-50",
    btn: "bg-blue-600 hover:bg-blue-700 text-white",
    border: "border-blue-100 hover:border-blue-300",
  },
}

const DicPage = () => {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">

 {/* Cards Section */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
          Available Forms
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dicCards.map((card) => {
            const c = colorMap[card.color]
            return (
              <div
                key={card.id}
                className={`bg-white rounded-2xl border ${c.border} shadow-sm transition-all duration-200 hover:shadow-md flex flex-col`}
              >
                {/* Card Top */}
                <div className="p-5 flex-1">
                  <div className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center text-2xl mb-4`}>
                    {card.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-base font-semibold text-slate-800">{card.title}</h4>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5">
                  <button
                    onClick={() => setFormOpen(true)}
                    className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-colors ${c.btn}`}
                  >
                    Open Form →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info Note */}
        <div className="mt-8 flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
          <span className="text-amber-500 text-lg shrink-0">ℹ️</span>
          <p className="text-sm text-amber-800 leading-relaxed">
            Please ensure all sections are filled before submitting. Incomplete submissions may affect your department's NAAC score.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Department Internal Committee · NAAC Self-Assessment Portal
        </div>
      </footer>

      {/* Modal */}
      {formOpen && <DicForm onClose={() => setFormOpen(false)} />}
    </div>
  )
}

export default DicPage;