import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IncidentsPage from './pages/IncidentsPage';
import IncidentFormPage from './pages/IncidentFormPage';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/incidents" element={<IncidentsPage />} />
      <Route path="/incidents/new" element={<IncidentFormPage />} />
      <Route path="/incidents/:id" element={<IncidentFormPage />} />
      <Route path="*" element={<IncidentsPage />} />
    </Routes>
  </Router>
);

export default App;
