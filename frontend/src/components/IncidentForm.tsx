import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </label>
      <label>
        Category:
        <input name="category" value={form.category} onChange={handleChange} />
      </label>
      <label>
        Priority:
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </label>
      <label>
        Date:
        <input type="date" name="date" value={form.date} onChange={handleChange} />
      </label>
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default IncidentForm;
