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

interface Risk {
  id: string;
  title: string;
  description: string;
}

const RiskRegister: React.FC = () => {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('/api/risks')
      .then(res => res.json())
      .then(data => setRisks(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/risks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    if (response.ok) {
      const newRisk = await response.json();
      setRisks([...risks, newRisk]);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Box>
      <Heading mb={4}>Risk Register</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} maxW="600px">
          <FormControl isRequired>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
          </FormControl>
          <Button colorScheme="brand" type="submit">Add Risk</Button>
        </Stack>
      </form>
      <List mt={8} spacing={4}>
        {risks.map(risk => (
          <ListItem key={risk.id} borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="sm" mb={2}>{risk.title}</Heading>
            <Text>{risk.description}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RiskRegister;
