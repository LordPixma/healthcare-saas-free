import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

interface Audit {
  id: string;
  name: string;
  findings: string;
}

const AuditForm: React.FC = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [name, setName] = useState('');
  const [findings, setFindings] = useState('');

  useEffect(() => {
    fetch('/api/audits')
      .then(res => res.json())
      .then(data => setAudits(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/audits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, findings })
    });
    if (response.ok) {
      const newAudit = await response.json();
      setAudits([...audits, newAudit]);
      setName('');
      setFindings('');
    }
  };

  return (
    <Box>
      <Heading mb={4}>Audits</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} maxW="600px">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Audit Name</FormLabel>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="findings">Findings</FormLabel>
            <Textarea id="findings" value={findings} onChange={e => setFindings(e.target.value)} />
          </FormControl>
          <Button colorScheme="brand" type="submit">Add Audit</Button>
        </Stack>
      </form>
      <List mt={8} spacing={4}>
        {audits.map(audit => (
          <ListItem key={audit.id} borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>{audit.name}</Heading>
            <Text>{audit.findings}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AuditForm;
