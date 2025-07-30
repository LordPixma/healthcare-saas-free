import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IncidentsPage from './pages/IncidentsPage';
import IncidentFormPage from './pages/IncidentFormPage';
import RiskRegister from './pages/RiskRegister';
import RiskFormPage from './pages/RiskFormPage';
import AuditsPage from './pages/AuditsPage';
import AuditFormPage from './pages/AuditFormPage';
import { LoginButton, LogoutButton, AuthStatus, RoleProtected } from './auth';

const App: React.FC = () => (
  <Router>
    <nav>
      <Link to="/incidents">Incidents</Link> |{' '}
      <Link to="/risks">Risks</Link> |{' '}
      <Link to="/audits">Audits</Link> | <AuthStatus /> <LoginButton /> <LogoutButton />
    </nav>
    <Routes>
      <Route path="/incidents" element={<IncidentsPage />} />
      <Route path="/incidents/new" element={<IncidentFormPage />} />
      <Route path="/incidents/:id" element={<IncidentFormPage />} />
      <Route path="/risks" element={<RoleProtected role={['staff','admin']}><RiskRegister /></RoleProtected>} />
      <Route path="/risks/new" element={<RoleProtected role="admin"><RiskFormPage /></RoleProtected>} />
      <Route path="/risks/:id" element={<RoleProtected role="admin"><RiskFormPage /></RoleProtected>} />
      <Route path="/audits" element={<RoleProtected role="admin"><AuditsPage /></RoleProtected>} />
      <Route path="/audits/new" element={<RoleProtected role="admin"><AuditFormPage /></RoleProtected>} />
      <Route path="/audits/:id" element={<RoleProtected role="admin"><AuditFormPage /></RoleProtected>} />
      <Route path="*" element={<IncidentsPage />} />
    </Routes>
  </Router>
);

export default App;
