import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
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
    <Box>
      <Heading size="lg" mb={4}>
        Incidents
      </Heading>
      <Button as={Link} to="/incidents/new" colorScheme="brand" mb={4}>
        Create New Incident
      </Button>
      {incidents.length === 0 ? (
        <Text>No incidents found.</Text>
      ) : (
        <List spacing={2}>
          {incidents.map(inc => (
            <ListItem key={inc.id}>
              <Button as={Link} variant="link" colorScheme="brand" to={`/incidents/${inc.id}`}>{inc.title}</Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default IncidentList;
