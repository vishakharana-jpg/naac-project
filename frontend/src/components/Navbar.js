import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-blue-500 border-b border-gray-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Nav Links */}
        <div className="flex mx-auto gap-12">
          <Link
            to="/"
            className="text-gray-300 text-lg font-medium tracking-widest hover:text-white hover:border-b-2 hover:border-indigo-400 pb-1 transition-all duration-200"
          >
            HOME
          </Link>
          <Link
            to="/about"
            className="text-gray-300 text-lg font-medium tracking-widest hover:text-white hover:border-b-2 hover:border-indigo-400 pb-1 transition-all duration-200"
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 text-lg font-medium tracking-widest hover:text-white hover:border-b-2 hover:border-indigo-400 pb-1 transition-all duration-200"
          >
            CONTACT
          </Link>
          
        </div>

        {/* Auth Button */}
        <div className="ml-auto pr-10">
          {localStorage.getItem("token") ? (
            <button
              onClick={logout}
              className="text-lg font-semibold text-white bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg tracking-wide transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg tracking-wide transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;