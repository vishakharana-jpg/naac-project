import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import FacultyPage from './pages/FaculityPage.js';
import ArtsFaculty from './pages/ArtsFaculity.js';
import ScienceFaculity from './pages/ScienceFaculity.js'
import ManagementFaculty from './pages/ManagementFaculty.js';
import TechnologyFaculty from './pages/TechnologyFaculty.js'
import BiomedicalFaculty from './pages/BiomedicalFaculty.js';
import DepartmentForm from './pages/DepartmentForm';

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;