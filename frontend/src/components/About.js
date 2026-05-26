import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            About Kumaun University
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto">
            Kumaun University is committed to academic excellence,
            innovation, research, and quality education through
            modern learning systems and NAAC accreditation standards.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              Our Vision
            </h2>

            <p className="text-gray-600 leading-7">
              To become a center of excellence in higher education,
              research, and innovation while empowering students
              with knowledge and values.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-7">
              To provide quality education, encourage research
              activities, and develop socially responsible citizens
              for the nation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              NAAC Portal
            </h2>

            <p className="text-gray-600 leading-7">
              This portal helps departments maintain records,
              accreditation reports, faculty data, and academic
              quality documents efficiently.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default About;