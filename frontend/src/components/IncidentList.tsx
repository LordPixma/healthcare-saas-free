import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
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
      <ChakraLink as={RouterLink} to="/incidents/new">Create New Incident</ChakraLink>
      {incidents.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <ul>
          {incidents.map(inc => (
            <li key={inc.id}>
              <ChakraLink as={RouterLink} to={`/incidents/${inc.id}`}>{inc.title}</ChakraLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentList;
