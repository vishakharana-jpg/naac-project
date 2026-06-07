import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Contact Us
          </h1>

          <p className="text-gray-600">
            Feel free to contact us regarding university services,
            NAAC portal support, or academic information.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">

          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Address
            </h2>

            <p className="text-gray-600 leading-7">
              Kumaun University <br />
              Nainital, Uttarakhand <br />
              India
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Contact Details
            </h2>

            <p className="text-gray-600 mb-2">
              Email: info@kunainital.ac.in
            </p>

            <p className="text-gray-600">
              Phone: +91 9876543210
            </p>
          </div>

        </div>

        {/* Form */}
        <form className="space-y-5">

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <textarea
            rows="5"
            placeholder="Enter your message"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>

          <button className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition">
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
};

export default Contact;