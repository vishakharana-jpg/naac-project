import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <div className="bg-blue-500 py-1 text-white p-4 ">
        <div>
          <h1 className="font-size-lge text-whit  "> Kumaun University</h1>
          <h3>Accredited Grade "A" by NAAC</h3>
        </div>
        
          <Navbar />
        
      </div>
    </>
  );
};

export default Header;
