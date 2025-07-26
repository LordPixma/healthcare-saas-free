import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RiskRegister from './pages/RiskRegister';
import AuditForm from './pages/AuditForm';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/risks">Risk Register</Link>
        {' | '}
        <Link to="/audits">Audits</Link>
      </nav>
      <Routes>
        <Route path="/risks" element={<RiskRegister />} />
        <Route path="/audits" element={<AuditForm />} />
      </Routes>
    </div>
  );
};

export default App;
