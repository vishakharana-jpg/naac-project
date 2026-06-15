import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Body from './components/Body.jsx';
import Footer from './components/Footer.jsx';
import FacultyPage from './pages/FaculityPage.jsx';
import ArtsFaculty from './pages/ArtsFaculity.jsx';
import ScienceFaculity from './pages/ScienceFaculity.jsx'
import ManagementFaculty from './pages/ManagementFaculty.jsx';
import TechnologyFaculty from './pages/TechnologyFaculty.jsx'
import BiomedicalFaculty from './pages/BiomedicalFaculty.jsx';
import DepartmentForm from './pages/DepartmentForm.jsx';
import Navbar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import AdminPanel from './pages/AdminPanel.jsx';
import AdminLogin from './pages/AdminLogin.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/faculty/arts" element={<ArtsFaculty />} />
        <Route path="/faculty/science" element={<ScienceFaculity />} />
        <Route path="/faculty/management" element={<ManagementFaculty/>}/>
        <Route path="/faculty/technology" element={<TechnologyFaculty/>}/>
        <Route path="/faculty/biomedical" element={<BiomedicalFaculty/>}/>
        <Route path="/faculty/:facultyId/:deptId/form" element={<DepartmentForm />} />
       <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;