import Navbar from "./Navbar";
import Logo from "../assets/Images/logo.png";

const Header = () => {
  return (
    <div className="bg-blue-500 text-white ">
      {/* Top Section */}
    <div className="flex items-center px-6" style={{ height: '95px' }}>
        {/* Left - Logo */}
        <img
          src={Logo}
          alt="University Logo"
          style={{ width: "110px", height: "110px" }}
          className="object-contain rounded-full mt-10"
        />

        {/* Center - University Info */}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold">KUMAUN UNIVERSITY </h1>
          <h3 className="text-sm">Accredited Grade "B" by NAAC</h3>
        </div>
      </div>

      {/* Navbar - HOME ABOUT CONTACT left, Login right */}
      <Navbar />
    </div>
  );
};

export default Header;
