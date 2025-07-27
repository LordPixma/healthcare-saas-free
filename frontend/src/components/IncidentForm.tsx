import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { createIncident, fetchIncident, updateIncident } from '../api/incidentApi';

const IncidentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    date: '',
  });

  useEffect(() => {
    if (id) {
      fetchIncident(id).then(setForm).catch(console.error);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateIncident(id, form);
      } else {
        await createIncident(form);
      }
      navigate('/incidents');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box maxW="600px" mx="auto">
      <Heading mb={4}>{id ? 'Edit Incident' : 'New Incident'}</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input id="title" name="title" value={form.title} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea id="description" name="description" value={form.description} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Input id="category" name="category" value={form.category} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="priority">Priority</FormLabel>
            <Select id="priority" name="priority" value={form.priority} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input id="date" type="date" name="date" value={form.date} onChange={handleChange} />
          </FormControl>
          <Button colorScheme="brand" type="submit">
            {id ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default IncidentForm;
