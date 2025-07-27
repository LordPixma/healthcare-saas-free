import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import IncidentsPage from './pages/IncidentsPage';
import IncidentFormPage from './pages/IncidentFormPage';
import RiskRegister from './pages/RiskRegister';
import AuditForm from './pages/AuditForm';
import NavBar from './components/NavBar';

const App: React.FC = () => (
  <Router>
    <NavBar />
    <Box p={4} maxW="1200px" mx="auto">
      <Routes>
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/incidents/new" element={<IncidentFormPage />} />
        <Route path="/incidents/:id" element={<IncidentFormPage />} />
        <Route path="/risks" element={<RiskRegister />} />
        <Route path="/audits" element={<AuditForm />} />
        <Route path="*" element={<IncidentsPage />} />
      </Routes>
    </Box>
  </Router>
);

export default App;
