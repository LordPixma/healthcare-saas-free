import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createIncident, fetchIncident, updateIncident } from '../api/incidentApi';
import Field from './Field';

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
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    try {
      if (id) {
        await updateIncident(id, form);
      } else {
        await createIncident(form);
      }
      navigate('/incidents');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    {
      id: 'title',
      label: 'Title',
      element: (
        <input id="title" name="title" value={form.title} onChange={handleChange} required />
      )
    },
    {
      id: 'description',
      label: 'Description',
      element: (
        <textarea id="description" name="description" value={form.description} onChange={handleChange} required />
      )
    },
    {
      id: 'category',
      label: 'Category',
      element: (
        <input id="category" name="category" value={form.category} onChange={handleChange} />
      )
    },
    {
      id: 'priority',
      label: 'Priority',
      element: (
        <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      )
    },
    {
      id: 'date',
      label: 'Date',
      element: (
        <input id="date" type="date" name="date" value={form.date} onChange={handleChange} />
      )
    }
  ];

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(f => (
        <Field key={f.id} id={f.id} label={f.label}>
          {f.element}
        </Field>
      ))}
      <button type="submit" disabled={submitting}>{id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default IncidentForm;
