import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchIncidents } from '../api/incidentApi';

interface Incident {
  id: string;
  title: string;
  category: string;
  priority: string;
  date: string;
}

const IncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetchIncidents().then(setIncidents).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Incidents</h2>
      <Link to="/incidents/new">Create New Incident</Link>
      <ul>
        {incidents.map(inc => (
          <li key={inc.id}>
            <Link to={`/incidents/${inc.id}`}>{inc.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentList;
