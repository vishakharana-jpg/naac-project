import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-blue-500 ">
  <div className="max-w-6xl mx-auto px-6 py-0 flex items-center justify-between">

   

        {/* Auth Button */}
        <div className="ml-auto pr-10 mb-5">
          {localStorage.getItem("token") ? (
            <button
              onClick={logout}
              className="text-lg font-semibold text-white bg-red-600 hover:bg-red-700 px-5 py-1 rounded-lg tracking-wide transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-1 rounded-lg tracking-wide transition-colors duration-200"
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