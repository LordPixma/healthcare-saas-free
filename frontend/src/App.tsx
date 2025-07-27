import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IncidentsPage from './pages/IncidentsPage';
import IncidentFormPage from './pages/IncidentFormPage';
import RiskRegister from './pages/RiskRegister';
import RiskFormPage from './pages/RiskFormPage';
import AuditsPage from './pages/AuditsPage';
import AuditFormPage from './pages/AuditFormPage';

const App: React.FC = () => (
  <Router>
    <nav>
      <Link to="/incidents">Incidents</Link> |{' '}
      <Link to="/risks">Risks</Link> |{' '}
      <Link to="/audits">Audits</Link>
    </nav>
    <Routes>
      <Route path="/incidents" element={<IncidentsPage />} />
      <Route path="/incidents/new" element={<IncidentFormPage />} />
      <Route path="/incidents/:id" element={<IncidentFormPage />} />
      <Route path="/risks" element={<RiskRegister />} />
      <Route path="/risks/new" element={<RiskFormPage />} />
      <Route path="/risks/:id" element={<RiskFormPage />} />
      <Route path="/audits" element={<AuditsPage />} />
      <Route path="/audits/new" element={<AuditFormPage />} />
      <Route path="/audits/:id" element={<AuditFormPage />} />
      <Route path="*" element={<IncidentsPage />} />
    </Routes>
  </Router>
);

export default App;
